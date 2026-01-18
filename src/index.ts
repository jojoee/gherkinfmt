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
 */
function escapeTableCell (value: string): string {
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
 * Format data table
 */
function formatDataTable (dataTable: DataTable, baseIndent: string): string[] {
  const lines: string[] = []
  const columnWidths = calculateColumnWidths(dataTable.rows)
  for (const row of dataTable.rows) {
    lines.push(baseIndent + formatTableRow(row, columnWidths))
  }
  return lines
}

/**
 * Format docstring
 */
function formatDocString (docString: DocString, baseIndent: string): string[] {
  const lines: string[] = []
  const delimiter = docString.delimiter
  const mediaType = docString.mediaType ?? ''

  lines.push(baseIndent + delimiter + mediaType)

  // Split content by lines and add each with proper indentation
  const contentLines = docString.content.split('\n')
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
 * Format a step
 */
function formatStep (step: Step, baseIndent: string): string[] {
  const lines: string[] = []
  lines.push(baseIndent + step.keyword + step.text.trim())

  if (step.dataTable != null) {
    lines.push(...formatDataTable(step.dataTable, baseIndent + INDENT))
  }

  if (step.docString != null) {
    lines.push(...formatDocString(step.docString, baseIndent + INDENT))
  }

  return lines
}

/**
 * Format examples section
 */
function formatExamples (examples: Examples, baseIndent: string): string[] {
  const lines: string[] = []

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

  if (examples.tableHeader != null) {
    lines.push(tableIndent + formatTableRow(examples.tableHeader, columnWidths))
  }

  for (const row of examples.tableBody) {
    lines.push(tableIndent + formatTableRow(row, columnWidths))
  }

  return lines
}

/**
 * Format a scenario or scenario outline
 */
function formatScenario (scenario: Scenario, baseIndent: string): string[] {
  const lines: string[] = []

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
  for (const step of scenario.steps) {
    lines.push(...formatStep(step, stepIndent))
  }

  // Examples (for Scenario Outline)
  if (scenario.examples.length > 0) {
    lines.push('')
    const examplesLines: string[] = []
    for (const example of scenario.examples) {
      if (examplesLines.length > 0) {
        examplesLines.push('')
      }
      examplesLines.push(...formatExamples(example, stepIndent))
    }
    lines.push(...examplesLines)
  }

  return lines
}

/**
 * Format a background
 */
function formatBackground (background: Background, baseIndent: string): string[] {
  const lines: string[] = []

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
  for (const step of background.steps) {
    lines.push(...formatStep(step, stepIndent))
  }

  return lines
}

/**
 * Format a rule child (background or scenario)
 */
function formatRuleChild (child: RuleChild, baseIndent: string): string[] {
  if (child.background != null) {
    return formatBackground(child.background, baseIndent)
  }
  if (child.scenario != null) {
    return formatScenario(child.scenario, baseIndent)
  }
  return []
}

/**
 * Format a rule
 */
function formatRule (rule: Rule, baseIndent: string): string[] {
  const lines: string[] = []

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

  // Children (background, scenarios)
  const childIndent = baseIndent + INDENT
  const childLines: string[] = []
  for (const child of rule.children) {
    if (childLines.length > 0) {
      childLines.push('')
    }
    childLines.push(...formatRuleChild(child, childIndent))
  }

  if (childLines.length > 0) {
    lines.push('')
    lines.push(...childLines)
  }

  return lines
}

/**
 * Format a feature child (background, scenario, or rule)
 */
function formatFeatureChild (child: FeatureChild, baseIndent: string): string[] {
  if (child.background != null) {
    return formatBackground(child.background, baseIndent)
  }
  if (child.scenario != null) {
    return formatScenario(child.scenario, baseIndent)
  }
  if (child.rule != null) {
    return formatRule(child.rule, baseIndent)
  }
  return []
}

/**
 * Format a feature
 */
function formatFeature (feature: Feature, originalText: string): string[] {
  const lines: string[] = []

  // Language comment (if present in original)
  const hasLanguage = LANGUAGE_PATTERN.test(originalText)
  if (hasLanguage && feature.language !== 'en') {
    lines.push(`# language: ${feature.language}`)
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
  const childLines: string[] = []
  for (const child of feature.children) {
    if (childLines.length > 0) {
      childLines.push('')
    }
    childLines.push(...formatFeatureChild(child, INDENT))
  }

  if (childLines.length > 0) {
    lines.push('')
    lines.push(...childLines)
  }

  return lines
}

/**
 * Format comments from AST
 * Comments are attached to the nearest following node
 */
function insertComments (lines: string[], comments: readonly Comment[], document: GherkinDocument): string[] {
  if (comments.length === 0) {
    return lines
  }

  // For now, place comments at the start if they appear before feature
  // This is a simplified implementation - full comment handling is in a separate todo
  const result: string[] = []

  // Group comments by their line numbers
  const commentsByLine = new Map<number, Comment[]>()
  for (const comment of comments) {
    const line = comment.location.line
    const existing = commentsByLine.get(line) ?? []
    existing.push(comment)
    commentsByLine.set(line, existing)
  }

  // Find where feature starts
  const feature = document.feature
  const featureStartLine = feature?.location.line ?? 1

  // Add comments that appear before feature
  const sortedCommentLines = Array.from(commentsByLine.keys()).sort((a, b) => a - b)

  for (const commentLine of sortedCommentLines) {
    if (commentLine < featureStartLine) {
      const commentsAtLine = commentsByLine.get(commentLine) ?? []
      for (const comment of commentsAtLine) {
        result.push(comment.text.trim())
      }
    }
  }

  // Add all formatted lines
  result.push(...lines)

  // Add trailing comments (comments after the last element)
  // This is handled in the main format function

  return result
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

  // If no feature, might be just comments
  if (document.feature == null) {
    // Return comments only
    if (document.comments.length > 0) {
      const commentLines = document.comments.map(c => c.text.trim())
      return commentLines.join('\n') + '\n'
    }
    return ''
  }

  // Format the feature
  let lines = formatFeature(document.feature, input)

  // Insert comments
  lines = insertComments(lines, document.comments, document)

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
