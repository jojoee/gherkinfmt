/**
 * gherkinfmt - Opinionated Gherkin Formatter
 *
 * Zero configuration, one way to format.
 * Similar to standard.js - no debates about formatting rules.
 *
 * @example
 * ```typescript
 * import { check, format } from 'gherkinfmt';
 *
 * // Check if Gherkin is formatted correctly
 * const isFormatted = check(gherkinString);
 *
 * // Format Gherkin string
 * const formatted = format(gherkinString);
 * ```
 */

import {
  Parser as GherkinParser,
  AstBuilder,
  GherkinClassicTokenMatcher
} from '@cucumber/gherkin'
import {
  IdGenerator,
  GherkinDocument,
  Feature,
  FeatureChild,
  Scenario,
  Background,
  Step,
  DataTable,
  TableRow,
  DocString,
  Examples,
  Tag,
  Rule,
  RuleChild,
  Comment
} from '@cucumber/messages'

// Fixed indentation - opinionated, non-configurable
const INDENT = '  '
const LANGUAGE_PATTERN = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/

/**
 * Comment context for tracking where comments should be placed
 */
interface CommentContext {
  comments: readonly Comment[]
  usedComments: Set<Comment>
}

/**
 * Parse Gherkin input into AST
 */
function parse (input: string): GherkinDocument {
  const uuidFn = IdGenerator.uuid()
  const builder = new AstBuilder(uuidFn)
  const matcher = new GherkinClassicTokenMatcher()
  const parser = new GherkinParser(builder, matcher)
  return parser.parse(input)
}

/**
 * Get comments that appear before a given line
 */
function getCommentsBefore (
  targetLine: number,
  ctx: CommentContext,
  afterLine: number = 0
): Comment[] {
  const result: Comment[] = []
  for (const comment of ctx.comments) {
    if (ctx.usedComments.has(comment)) continue
    const commentLine = comment.location.line
    if (commentLine > afterLine && commentLine < targetLine) {
      result.push(comment)
      ctx.usedComments.add(comment)
    }
  }
  return result.sort((a, b) => a.location.line - b.location.line)
}

/**
 * Get comments for a specific line range (e.g., within a data table)
 */
function getCommentsInRange (
  startLine: number,
  endLine: number,
  ctx: CommentContext
): Map<number, Comment[]> {
  const result = new Map<number, Comment[]>()
  for (const comment of ctx.comments) {
    if (ctx.usedComments.has(comment)) continue
    const commentLine = comment.location.line
    if (commentLine >= startLine && commentLine <= endLine) {
      const existing = result.get(commentLine) ?? []
      existing.push(comment)
      result.set(commentLine, existing)
      ctx.usedComments.add(comment)
    }
  }
  return result
}

/**
 * Get remaining unused comments (trailing comments)
 */
function getRemainingComments (ctx: CommentContext): Comment[] {
  const result: Comment[] = []
  for (const comment of ctx.comments) {
    if (!ctx.usedComments.has(comment)) {
      result.push(comment)
      ctx.usedComments.add(comment)
    }
  }
  return result.sort((a, b) => a.location.line - b.location.line)
}

/**
 * Calculate column widths for table alignment
 */
function calculateColumnWidths (rows: readonly TableRow[]): number[] {
  const widths: number[] = []
  for (const row of rows) {
    row.cells.forEach((cell, index) => {
      const cellValue = escapeTableCell(cell.value)
      if (widths[index] === undefined || cellValue.length > widths[index]) {
        widths[index] = cellValue.length
      }
    })
  }
  return widths
}

/**
 * Escape special characters in table cells
 *
 * In Gherkin table cells, certain characters need escaping:
 * - | (pipe) must be escaped as \|
 * - \ (backslash) must be escaped as \\
 * - newlines must be escaped as \n
 *
 * Note: The Gherkin parser normalizes escape sequences during parsing,
 * so we cannot perfectly preserve the original form. Our opinionated
 * choice is to use consistent escaping (always escape backslashes).
 */
function escapeTableCell (value: string): string {
  // Order matters: escape backslashes first, then pipes, then newlines
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, '\\n')
}

/**
 * Format a table row with aligned columns
 */
function formatTableRow (row: TableRow, columnWidths: number[]): string {
  const cells = row.cells.map((cell, index) => {
    const value = escapeTableCell(cell.value)
    const width = columnWidths[index] ?? value.length
    return value.padEnd(width)
  })
  return `| ${cells.join(' | ')} |`
}

/**
 * Format data table with comments
 */
function formatDataTable (
  dataTable: DataTable,
  baseIndent: string,
  ctx: CommentContext
): string[] {
  const lines: string[] = []
  const columnWidths = calculateColumnWidths(dataTable.rows)

  // Get line range for comments
  const firstRow = dataTable.rows[0]
  const lastRow = dataTable.rows[dataTable.rows.length - 1]
  if (firstRow == null) return lines

  const startLine = firstRow.location.line
  const endLine = lastRow?.location.line ?? startLine

  // Get comments within the table
  const commentsInTable = getCommentsInRange(startLine, endLine, ctx)

  for (const row of dataTable.rows) {
    // Check for comments before this row
    const rowLine = row.location.line
    for (const [commentLine, comments] of commentsInTable) {
      if (commentLine < rowLine) {
        for (const comment of comments) {
          lines.push(baseIndent + comment.text.trim())
        }
        commentsInTable.delete(commentLine)
      }
    }
    lines.push(baseIndent + formatTableRow(row, columnWidths))
  }

  return lines
}

/**
 * Escape docstring delimiter inside content
 */
function escapeDocStringContent (content: string, delimiter: string): string {
  const escapedDelimiter = delimiter.split('').map(c => `\\${c}`).join('')
  return content.replace(new RegExp(delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), escapedDelimiter)
}

/**
 * Format docstring
 */
function formatDocString (docString: DocString, baseIndent: string): string[] {
  const lines: string[] = []
  const delimiter = docString.delimiter
  const mediaType = docString.mediaType ?? ''

  lines.push(baseIndent + delimiter + mediaType)

  const escapedContent = escapeDocStringContent(docString.content, delimiter)
  const contentLines = escapedContent.split('\n')
  for (const line of contentLines) {
    lines.push(baseIndent + line)
  }

  lines.push(baseIndent + delimiter)
  return lines
}

/**
 * Format tags - one per line
 */
function formatTags (tags: readonly Tag[], indent: string): string[] {
  return tags.map(tag => indent + tag.name)
}

/**
 * Get the last line of a step (including docstring/datatable)
 */
function getStepLastLine (step: Step): number {
  let lastLine = step.location.line
  if (step.dataTable != null) {
    const rows = step.dataTable.rows
    const lastRow = rows[rows.length - 1]
    if (lastRow != null) {
      lastLine = lastRow.location.line
    }
  }
  if (step.docString != null) {
    // Estimate docstring end line
    const docStringLines = step.docString.content.split('\n').length
    lastLine = step.docString.location.line + docStringLines + 1
  }
  return lastLine
}

/**
 * Format a step with comments
 */
function formatStep (
  step: Step,
  baseIndent: string,
  ctx: CommentContext,
  prevStepEndLine: number
): string[] {
  const lines: string[] = []

  // Get comments before this step
  const commentsBefore = getCommentsBefore(step.location.line, ctx, prevStepEndLine)
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim())
  }

  lines.push(baseIndent + step.keyword + step.text.trim())

  if (step.dataTable != null) {
    lines.push(...formatDataTable(step.dataTable, baseIndent + INDENT, ctx))
  }

  if (step.docString != null) {
    lines.push(...formatDocString(step.docString, baseIndent + INDENT))
  }

  return lines
}

/**
 * Format examples section with comments
 */
function formatExamples (
  examples: Examples,
  baseIndent: string,
  ctx: CommentContext,
  prevEndLine: number
): string[] {
  const lines: string[] = []

  // Comments before examples
  const commentsBefore = getCommentsBefore(examples.location.line, ctx, prevEndLine)
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim())
  }

  // Tags
  if (examples.tags.length > 0) {
    lines.push(...formatTags(examples.tags, baseIndent))
  }

  // Examples header
  const name = examples.name !== '' ? ` ${examples.name}` : ''
  lines.push(baseIndent + examples.keyword + ':' + name)

  // Description
  if (examples.description !== '') {
    const descLines = examples.description.split('\n')
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim())
    }
  }

  // Table
  const tableIndent = baseIndent + INDENT
  const allRows = [examples.tableHeader, ...examples.tableBody].filter((r): r is TableRow => r != null)
  const columnWidths = calculateColumnWidths(allRows)

  // Get line range for comments within the table
  const firstRow = examples.tableHeader ?? examples.tableBody[0]
  const lastRow = examples.tableBody[examples.tableBody.length - 1]

  if (firstRow != null) {
    const startLine = firstRow.location.line
    const endLine = lastRow?.location.line ?? startLine

    // Get comments within the table
    const commentsInTable = getCommentsInRange(startLine, endLine, ctx)

    if (examples.tableHeader != null) {
      lines.push(tableIndent + formatTableRow(examples.tableHeader, columnWidths))
    }

    for (const row of examples.tableBody) {
      // Check for comments before this row
      const rowLine = row.location.line
      for (const [commentLine, comments] of commentsInTable) {
        if (commentLine < rowLine) {
          for (const comment of comments) {
            lines.push(tableIndent + comment.text.trim())
          }
          commentsInTable.delete(commentLine)
        }
      }
      lines.push(tableIndent + formatTableRow(row, columnWidths))
    }
  } else {
    // Fallback if no rows (edge case)
    if (examples.tableHeader != null) {
      lines.push(tableIndent + formatTableRow(examples.tableHeader, columnWidths))
    }
  }

  return lines
}

/**
 * Format a scenario or scenario outline with comments
 */
function formatScenario (
  scenario: Scenario,
  baseIndent: string,
  ctx: CommentContext,
  prevEndLine: number
): string[] {
  const lines: string[] = []

  // Get first tag line or scenario line for comment placement
  const firstTag = scenario.tags[0]
  const scenarioStartLine = firstTag != null
    ? firstTag.location.line
    : scenario.location.line

  // Comments before scenario (or its tags)
  const commentsBefore = getCommentsBefore(scenarioStartLine, ctx, prevEndLine)
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim())
  }

  // Tags
  if (scenario.tags.length > 0) {
    lines.push(...formatTags(scenario.tags, baseIndent))
  }

  // Scenario header
  lines.push(baseIndent + scenario.keyword + ': ' + scenario.name)

  // Description
  if (scenario.description !== '') {
    const descLines = scenario.description.split('\n')
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim())
    }
    lines.push('')
  }

  // Steps
  const stepIndent = baseIndent + INDENT
  let lastStepEndLine = scenario.location.line
  for (const step of scenario.steps) {
    lines.push(...formatStep(step, stepIndent, ctx, lastStepEndLine))
    lastStepEndLine = getStepLastLine(step)
  }

  // Examples (for Scenario Outline)
  if (scenario.examples.length > 0) {
    lines.push('')
    let prevExampleEndLine = lastStepEndLine
    for (let i = 0; i < scenario.examples.length; i++) {
      const example = scenario.examples[i]
      if (example == null) continue
      if (i > 0) {
        lines.push('')
      }
      lines.push(...formatExamples(example, stepIndent, ctx, prevExampleEndLine))
      const lastRow = example.tableBody[example.tableBody.length - 1]
      prevExampleEndLine = lastRow?.location.line ?? example.location.line
    }
  }

  return lines
}

/**
 * Format a background with comments
 */
function formatBackground (
  background: Background,
  baseIndent: string,
  ctx: CommentContext,
  prevEndLine: number
): string[] {
  const lines: string[] = []

  // Comments before background
  const commentsBefore = getCommentsBefore(background.location.line, ctx, prevEndLine)
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim())
  }

  // Background header
  const name = background.name !== '' ? ` ${background.name}` : ''
  lines.push(baseIndent + background.keyword + ':' + name)

  // Description
  if (background.description !== '') {
    const descLines = background.description.split('\n')
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim())
    }
  }

  // Steps
  const stepIndent = baseIndent + INDENT
  let lastStepEndLine = background.location.line
  for (const step of background.steps) {
    lines.push(...formatStep(step, stepIndent, ctx, lastStepEndLine))
    lastStepEndLine = getStepLastLine(step)
  }

  return lines
}

/**
 * Get the last line of a feature child
 */
function getFeatureChildLastLine (child: FeatureChild): number {
  if (child.background != null) {
    const steps = child.background.steps
    const lastStep = steps[steps.length - 1]
    return lastStep != null ? getStepLastLine(lastStep) : child.background.location.line
  }
  if (child.scenario != null) {
    const scenario = child.scenario
    if (scenario.examples.length > 0) {
      const lastExample = scenario.examples[scenario.examples.length - 1]
      if (lastExample != null) {
        const lastRow = lastExample.tableBody[lastExample.tableBody.length - 1]
        return lastRow?.location.line ?? lastExample.location.line
      }
    }
    const steps = scenario.steps
    const lastStep = steps[steps.length - 1]
    return lastStep != null ? getStepLastLine(lastStep) : scenario.location.line
  }
  if (child.rule != null) {
    const children = child.rule.children
    const lastChild = children[children.length - 1]
    if (lastChild?.scenario != null) {
      const lastStep = lastChild.scenario.steps[lastChild.scenario.steps.length - 1]
      return lastStep != null ? getStepLastLine(lastStep) : lastChild.scenario.location.line
    }
    return child.rule.location.line
  }
  return 0
}

/**
 * Format a rule child with comments
 */
function formatRuleChild (
  child: RuleChild,
  baseIndent: string,
  ctx: CommentContext,
  prevEndLine: number
): string[] {
  if (child.background != null) {
    return formatBackground(child.background, baseIndent, ctx, prevEndLine)
  }
  if (child.scenario != null) {
    return formatScenario(child.scenario, baseIndent, ctx, prevEndLine)
  }
  return []
}

/**
 * Format a rule with comments
 */
function formatRule (
  rule: Rule,
  baseIndent: string,
  ctx: CommentContext,
  prevEndLine: number
): string[] {
  const lines: string[] = []

  const firstRuleTag = rule.tags[0]
  const ruleStartLine = firstRuleTag != null
    ? firstRuleTag.location.line
    : rule.location.line

  // Comments before rule
  const commentsBefore = getCommentsBefore(ruleStartLine, ctx, prevEndLine)
  for (const comment of commentsBefore) {
    lines.push(baseIndent + comment.text.trim())
  }

  // Tags
  if (rule.tags.length > 0) {
    lines.push(...formatTags(rule.tags, baseIndent))
  }

  // Rule header
  lines.push(baseIndent + rule.keyword + ': ' + rule.name)

  // Description
  if (rule.description !== '') {
    const descLines = rule.description.split('\n')
    for (const line of descLines) {
      lines.push(baseIndent + INDENT + line.trim())
    }
  }

  // Children
  const childIndent = baseIndent + INDENT
  let lastChildEndLine = rule.location.line
  const childLines: string[] = []
  for (const child of rule.children) {
    if (childLines.length > 0) {
      childLines.push('')
    }
    childLines.push(...formatRuleChild(child, childIndent, ctx, lastChildEndLine))
    if (child.scenario != null) {
      const steps = child.scenario.steps
      const lastStep = steps[steps.length - 1]
      lastChildEndLine = lastStep != null ? getStepLastLine(lastStep) : child.scenario.location.line
    } else if (child.background != null) {
      const steps = child.background.steps
      const lastStep = steps[steps.length - 1]
      lastChildEndLine = lastStep != null ? getStepLastLine(lastStep) : child.background.location.line
    }
  }

  if (childLines.length > 0) {
    lines.push('')
    lines.push(...childLines)
  }

  return lines
}

/**
 * Format a feature child with comments
 */
function formatFeatureChild (
  child: FeatureChild,
  baseIndent: string,
  ctx: CommentContext,
  prevEndLine: number
): string[] {
  if (child.background != null) {
    return formatBackground(child.background, baseIndent, ctx, prevEndLine)
  }
  if (child.scenario != null) {
    return formatScenario(child.scenario, baseIndent, ctx, prevEndLine)
  }
  if (child.rule != null) {
    return formatRule(child.rule, baseIndent, ctx, prevEndLine)
  }
  return []
}

/**
 * Format a feature with comments
 */
function formatFeature (
  feature: Feature,
  originalText: string,
  ctx: CommentContext
): string[] {
  const lines: string[] = []

  // Get the start line (first tag or feature keyword)
  const firstFeatureTag = feature.tags[0]
  const featureStartLine = firstFeatureTag != null
    ? firstFeatureTag.location.line
    : feature.location.line

  // Language comment (if present in original)
  const hasLanguage = LANGUAGE_PATTERN.test(originalText)
  if (hasLanguage && feature.language !== 'en') {
    lines.push(`# language: ${feature.language}`)
  }

  // Comments before feature (or its tags)
  const commentsBefore = getCommentsBefore(featureStartLine, ctx, 0)
  for (const comment of commentsBefore) {
    lines.push(comment.text.trim())
  }

  // Tags
  if (feature.tags.length > 0) {
    lines.push(...formatTags(feature.tags, ''))
  }

  // Feature header
  lines.push(feature.keyword + ': ' + feature.name)

  // Description
  if (feature.description !== '') {
    const descLines = feature.description.split('\n')
    for (const line of descLines) {
      lines.push(INDENT + line.trim())
    }
  }

  // Children
  let lastChildEndLine = feature.location.line
  const childLines: string[] = []
  for (const child of feature.children) {
    if (childLines.length > 0) {
      childLines.push('')
    }
    childLines.push(...formatFeatureChild(child, INDENT, ctx, lastChildEndLine))
    lastChildEndLine = getFeatureChildLastLine(child)
  }

  if (childLines.length > 0) {
    lines.push('')
    lines.push(...childLines)
  }

  // Add trailing comments
  const trailingComments = getRemainingComments(ctx)
  if (trailingComments.length > 0) {
    lines.push('')
    for (const comment of trailingComments) {
      lines.push(comment.text.trim())
    }
  }

  return lines
}

/**
 * Check if Gherkin string is formatted correctly
 *
 * @param input - Gherkin source string
 * @returns true if input is already formatted correctly, false otherwise
 *
 * @example
 * ```typescript
 * const isFormatted = check('Feature: My Feature\n');
 * // Returns true if properly formatted
 * ```
 */
export function check (input: string): boolean {
  try {
    const formatted = format(input)
    return input === formatted
  } catch {
    return false
  }
}

/**
 * Format Gherkin string according to opinionated rules
 *
 * Formatting rules (not configurable):
 * - 2 spaces for indentation
 * - Proper spacing between keywords and content
 * - Consistent table alignment
 * - Trailing whitespace removed
 * - Single newline at end of file
 *
 * @param input - Gherkin source string
 * @returns Formatted Gherkin string
 * @throws Error if input is not valid Gherkin
 *
 * @example
 * ```typescript
 * const formatted = format('Feature:My Feature');
 * // Returns: 'Feature: My Feature\n'
 * ```
 */
export function format (input: string): string {
  // Handle empty input
  if (input.trim() === '') {
    return ''
  }

  // Parse the input
  const document = parse(input)

  // Create comment context
  const ctx: CommentContext = {
    comments: document.comments,
    usedComments: new Set()
  }

  // If no feature, might be just comments
  if (document.feature == null) {
    if (document.comments.length > 0) {
      const commentLines = document.comments.map(c => c.text.trim())
      return commentLines.join('\n') + '\n'
    }
    return ''
  }

  // Format the feature with comments
  const lines = formatFeature(document.feature, input, ctx)

  // Join lines and ensure single trailing newline
  let result = lines.join('\n')

  // Remove trailing whitespace from each line
  result = result
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')

  // Ensure single trailing newline
  return result + '\n'
}
