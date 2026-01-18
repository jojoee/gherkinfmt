import { describe, it, expect } from 'vitest'
import { format, check } from '../src/index.js'

describe('Formatter', () => {
  describe('basic formatting', () => {
    it('should return input unchanged (stub implementation)', () => {
      const input = 'Feature: My Feature'
      const result = format(input)

      // Stub returns input unchanged
      expect(result).toBe(input)
    })

    it('should handle empty input', () => {
      const result = format('')

      expect(result).toBe('')
    })

    it('should handle multiline input', () => {
      const input = `Feature: My Feature

Scenario: Test
  Given something`
      const result = format(input)

      // Stub returns input unchanged
      expect(result).toBe(input)
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
Scenario Outline: My Outline`
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
})

describe('Check', () => {
  it('should return false for stub implementation', () => {
    const input = 'Feature: My Feature'
    const result = check(input)

    // Stub always returns false
    expect(result).toBe(false)
  })

  it('should handle empty input', () => {
    const result = check('')

    expect(result).toBe(false)
  })

  it('should return boolean', () => {
    const result = check('Feature: Test')

    expect(typeof result).toBe('boolean')
  })
})
