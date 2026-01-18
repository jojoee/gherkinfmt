/**
 * gherkinfmt CLI - Opinionated Gherkin Formatter
 *
 * Usage:
 *   gherkinfmt <--check|--write> [files...]
 *
 * Options:
 *   --check    Check if files are formatted
 *   --write    Format files in-place (overwrite)
 *   --version  Show version number
 *   --help     Show help
 *
 * Examples:
 *   gherkinfmt --check file.feature
 *   gherkinfmt --write src/
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'
import { check, format } from './index.js'

interface CliOptions {
  checkOnly: boolean
  write: boolean
  showVersion: boolean
  showHelp: boolean
  files: string[]
}

const VERSION = '0.0.0-development'

const HELP_TEXT = `
gherkinfmt - Opinionated Gherkin Formatter

Usage:
  gherkinfmt <--check|--write> [files...]

Options:
  --check    Check if files are formatted (exit 0 if ok, 1 if not)
  --write    Format files in-place (overwrite)
  --version  Show version number
  --help     Show help

Examples:
  gherkinfmt --check file.feature      Check single file
  gherkinfmt --check "src/**/*.feature" Check files matching glob
  gherkinfmt --write file.feature      Format and overwrite single file
  gherkinfmt --write src/              Format all .feature files in directory recursively

`

function parseArgs (args: string[]): CliOptions {
  const options: CliOptions = {
    checkOnly: false,
    write: false,
    showVersion: false,
    showHelp: false,
    files: []
  }

  for (const arg of args) {
    if (arg === '--check') {
      options.checkOnly = true
      options.write = false
    } else if (arg === '--write') {
      options.write = true
      options.checkOnly = false
    } else if (arg === '--version') {
      options.showVersion = true
    } else if (arg === '--help') {
      options.showHelp = true
    } else if (!arg.startsWith('-')) {
      options.files.push(arg)
    }
  }

  return options
}

function findFeatureFiles (dir: string): string[] {
  const files: string[] = []

  try {
    const entries = readdirSync(dir)

    for (const entry of entries) {
      const fullPath = join(dir, entry)

      try {
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          // Skip node_modules and hidden directories
          if (!entry.startsWith('.') && entry !== 'node_modules') {
            files.push(...findFeatureFiles(fullPath))
          }
        } else if (stat.isFile() && extname(entry) === '.feature') {
          files.push(fullPath)
        }
      } catch {
        // Skip files we can't access
      }
    }
  } catch {
    // Skip directories we can't read
  }

  return files
}

function expandGlob (pattern: string): string[] {
  // Simple glob expansion for common patterns
  // For full glob support, users should use shell expansion

  const resolved = resolve(pattern)

  try {
    const stat = statSync(resolved)

    if (stat.isDirectory()) {
      return findFeatureFiles(resolved)
    } else if (stat.isFile()) {
      return [resolved]
    }
  } catch {
    // Path doesn't exist or is a glob pattern
    // Try to find matching files in current directory
  }

  return []
}

function expandFiles (patterns: string[]): string[] {
  const files: string[] = []

  for (const pattern of patterns) {
    files.push(...expandGlob(pattern))
  }

  // Remove duplicates
  return [...new Set(files)]
}

function checkFile (filePath: string): { ok: boolean, error?: string } {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const isFormatted = check(content)

    if (!isFormatted) {
      return { ok: false }
    }

    return { ok: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, error: message }
  }
}

function formatFile (filePath: string): { ok: boolean, changed: boolean, error?: string } {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const formatted = format(content)

    if (content === formatted) {
      return { ok: true, changed: false }
    }

    writeFileSync(filePath, formatted, 'utf-8')
    return { ok: true, changed: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, changed: false, error: message }
  }
}

function main (): void {
  const args = process.argv.slice(2)
  const options = parseArgs(args)

  if (options.showHelp) {
    console.log(HELP_TEXT)
    process.exit(0)
  }

  if (options.showVersion) {
    console.log(`gherkinfmt v${VERSION}`)
    process.exit(0)
  }

  if (options.files.length === 0) {
    console.error('Error: No files specified')
    console.error('Run "gherkinfmt --help" for usage')
    process.exit(1)
  }

  const files = expandFiles(options.files)

  if (files.length === 0) {
    console.error('Error: No .feature files found')
    process.exit(1)
  }

  if (!options.checkOnly && !options.write) {
    console.error('Error: No mode specified')
    process.exit(1)
  }

  if (options.write) {
    // Format mode: format and overwrite files
    let processedCount = 0
    let changedCount = 0
    let errorCount = 0

    for (const file of files) {
      const result = formatFile(file)
      processedCount++

      if (!result.ok) {
        errorCount++
        console.error(`✗ ${file}`)
        console.error(`  Error: ${result.error ?? 'Unknown error'}`)
      } else if (result.changed) {
        changedCount++
        console.log(`✓ ${file} (formatted)`)
      } else {
        console.log(`✓ ${file} (unchanged)`)
      }
    }

    console.log('')
    console.log(`Processed ${processedCount} file(s)`)

    if (changedCount > 0) {
      console.log(`${changedCount} file(s) formatted`)
    }

    if (errorCount > 0) {
      console.log(`${errorCount} file(s) failed`)
      process.exit(1)
    }

    process.exit(0)
  } else {
    // Check mode: validate formatting without modifying files
    let hasErrors = false
    let checkedCount = 0
    let errorCount = 0

    for (const file of files) {
      const result = checkFile(file)
      checkedCount++

      if (!result.ok) {
        hasErrors = true
        errorCount++

        if (result.error !== undefined && result.error !== '') {
          console.error(`✗ ${file}`)
          console.error(`  Error: ${result.error}`)
        } else {
          console.error(`✗ ${file}`)
          console.error('  File is not formatted correctly')

          // Show expected format
          try {
            const content = readFileSync(file, 'utf-8')
            const formatted = format(content)

            // Show first difference
            const lines = content.split('\n')
            const formattedLines = formatted.split('\n')

            for (let i = 0; i < Math.max(lines.length, formattedLines.length); i++) {
              if (lines[i] !== formattedLines[i]) {
                console.error(`  Line ${i + 1}:`)
                console.error(`    - ${lines[i] ?? '(missing)'}`)
                console.error(`    + ${formattedLines[i] ?? '(missing)'}`)
                break
              }
            }
          } catch {
            // Ignore formatting errors in diff display
          }
        }
      } else {
        console.log(`✓ ${file}`)
      }
    }

    console.log('')
    console.log(`Checked ${checkedCount} file(s)`)

    if (hasErrors) {
      console.log(`${errorCount} file(s) need formatting`)
      process.exit(1)
    } else {
      console.log('All files are formatted correctly')
      process.exit(0)
    }
  }
}

main()
