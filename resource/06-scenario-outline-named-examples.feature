Feature: Named Examples

  Scenario Outline: Scenario with named example groups
    Given test: <test> - <description>
    When I perform action with <input>
    Then I should see <expected>

    @ValidCases
    Examples: Valid Input Cases
      | test   | description     | input | expected |
      | TC-001 | Positive number | 100   | success  |
      | TC-002 | Zero value      | 0     | success  |

    @InvalidCases
    Examples: Invalid Input Cases
      | test   | description     | input | expected |
      | TC-003 | Negative number | -100  | error    |
      | TC-004 | Non-numeric     | abc   | error    |

    @EdgeCases
    Examples: Edge Cases
      | test   | description       | input     | expected |
      | TC-005 | Very large number | 999999999 | success  |
      | TC-006 | Empty string      |           | error    |
