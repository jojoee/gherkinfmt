Feature: Asterisk Steps

  Scenario: Using asterisk for generic steps
    Given the system is in initial state
    * the feature flag "new_ui" is enabled
    * the user has role "admin"
    * the current time is "2024-06-15T14:30:00Z"
    When the user navigates to the dashboard
    * the user clicks on "Settings"
    Then the settings page should load
    * all admin options should be visible
