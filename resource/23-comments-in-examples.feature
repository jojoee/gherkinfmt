Feature: Comments in Examples Table

  Scenario Outline: User login with <status> credentials
    Given a user with username "<username>"
    When the user attempts to login
    Then the result should be "<result>"

    Examples:
      | username | status  | result  |
      # Temporarily disabled due to flaky test
        # | admin    | valid   | success |
      | guest    | valid   | success |
      | invalid  | invalid | failure |

  Scenario Outline: Multiple comments in Examples
    Given I have <count> items
    When I process them
    Then I should see <expected>

    Examples:
      | count | expected |
      # First comment
    # Second comment
      | 1     | 1        |
      # Comment between rows
      | 2     | 2        |
      | 3     | 3        |
