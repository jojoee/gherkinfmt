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
  // TODO: Implement check logic
  // For now, return false to indicate not formatted
  void input
  return false
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
  // TODO: Implement format logic
  // For now, return input unchanged
  return input
}
