import { describe, it, expect } from 'vitest'
import { format, check } from '../src/index.js'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const INPUT_DIR = join(__dirname, '../resource')

/**
 * Get all feature files from a directory
 */
function getFeatureFiles (dir: string): string[] {
  try {
    return readdirSync(dir).filter(f => f.endsWith('.feature'))
  } catch {
    return []
  }
}

/**
 * Read file content
 */
function readFile (path: string): string {
  return readFileSync(path, 'utf8')
}

describe('Formatter', () => {
  describe('basic formatting', () => {
    it('should format a simple feature', () => {
      const input = 'Feature: My Feature'
      const result = format(input)

      expect(result).toBe('Feature: My Feature\n')
    })

    it('should handle empty input', () => {
      const result = format('')

      expect(result).toBe('')
    })

    it('should format multiline input with proper indentation', () => {
      const input = `Feature: My Feature

Scenario: Test
  Given something`
      const result = format(input)

      expect(result).toBe(`Feature: My Feature

  Scenario: Test
    Given something
`)
    })
  })

  describe('feature formatting', () => {
    it('should handle Feature keyword', () => {
      const input = 'Feature: User Login'
      const result = format(input)

      expect(result).toContain('Feature:')
    })

    it('should handle Feature with description', () => {
      const input = `Feature: User Login
  In order to access my account
  As a user
  I want to log in`
      const result = format(input)

      expect(result).toContain('Feature:')
      expect(result).toContain('In order to')
    })
  })

  describe('scenario formatting', () => {
    it('should handle Scenario keyword', () => {
      const input = `Feature: Test
Scenario: My Scenario`
      const result = format(input)

      expect(result).toContain('Scenario:')
    })

    it('should handle Scenario Outline keyword', () => {
      const input = `Feature: Test
Scenario Outline: My Outline
  Given I have <count> items
Examples:
| count |
| 1 |`
      const result = format(input)

      expect(result).toContain('Scenario Outline:')
    })
  })

  describe('step formatting', () => {
    it('should handle Given step', () => {
      const input = `Feature: Test
Scenario: Test
Given I am on the page`
      const result = format(input)

      expect(result).toContain('Given')
    })

    it('should handle When step', () => {
      const input = `Feature: Test
Scenario: Test
When I click the button`
      const result = format(input)

      expect(result).toContain('When')
    })

    it('should handle Then step', () => {
      const input = `Feature: Test
Scenario: Test
Then I should see the result`
      const result = format(input)

      expect(result).toContain('Then')
    })

    it('should handle And step', () => {
      const input = `Feature: Test
Scenario: Test
Given something
And another thing`
      const result = format(input)

      expect(result).toContain('And')
    })

    it('should handle But step', () => {
      const input = `Feature: Test
Scenario: Test
Given something
But not this`
      const result = format(input)

      expect(result).toContain('But')
    })
  })

  describe('tag formatting', () => {
    it('should handle tags', () => {
      const input = `@smoke @login
Feature: User Login`
      const result = format(input)

      expect(result).toContain('@smoke')
      expect(result).toContain('@login')
    })
  })

  describe('table formatting', () => {
    it('should handle data tables', () => {
      const input = `Feature: Test
Scenario: Test
Given the following users:
| name | email |
| John | john@example.com |`
      const result = format(input)

      expect(result).toContain('|')
    })

    it('should handle Examples tables', () => {
      const input = `Feature: Test
Scenario Outline: Test
Given I have <count> items
Examples:
| count |
| 1 |
| 5 |`
      const result = format(input)

      expect(result).toContain('Examples:')
      expect(result).toContain('|')
    })
  })

  describe('comment formatting', () => {
    it('should handle comments', () => {
      const input = `# This is a comment
Feature: Test`
      const result = format(input)

      expect(result).toContain('#')
    })
  })

  describe('background formatting', () => {
    it('should handle Background keyword', () => {
      const input = `Feature: Test
Background:
Given I am logged in`
      const result = format(input)

      expect(result).toContain('Background:')
    })
  })

  describe('indentation', () => {
    it('should use 2-space indentation for scenarios', () => {
      const input = `Feature: Test
Scenario: My Scenario
Given something`
      const result = format(input)

      // Scenario should be indented with 2 spaces
      expect(result).toContain('  Scenario:')
    })

    it('should use 4-space indentation for steps', () => {
      const input = `Feature: Test
Scenario: My Scenario
Given something`
      const result = format(input)

      // Steps should be indented with 4 spaces (2 for scenario + 2 for step)
      expect(result).toContain('    Given')
    })
  })
})

describe('Check', () => {
  it('should return true for properly formatted input', () => {
    const input = `Feature: My Feature

  Scenario: Test
    Given something
`
    const result = check(input)

    expect(result).toBe(true)
  })

  it('should return true for empty input', () => {
    const result = check('')

    expect(result).toBe(true)
  })

  it('should return false for improperly formatted input', () => {
    const input = `Feature: My Feature
Scenario: Test
Given something`
    const result = check(input)

    expect(result).toBe(false)
  })

  it('should return boolean', () => {
    const result = check('Feature: Test')

    expect(typeof result).toBe('boolean')
  })
})

describe('Idempotency', () => {
  const inputFiles = getFeatureFiles(INPUT_DIR)

  for (const file of inputFiles) {
    it(`should be idempotent for ${file}`, () => {
      const inputPath = join(INPUT_DIR, file)
      const input = readFile(inputPath)

      // Format once
      const firstPass = format(input)
      // Format again
      const secondPass = format(firstPass)

      // Should be identical
      expect(secondPass).toBe(firstPass)
    })
  }
})
