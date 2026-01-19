Feature: Rules with backgrounds and scenarios

  Rule: User Authentication Rules

    Background: Authentication prerequisites
      Given the authentication service is running
      And rate limiting is configured to 5 attempts per minute

    @auth @positive
    Scenario: Successful authentication with valid credentials
      Given a user with email "valid@example.com" exists
      And the user's password is "ValidPass123!"
      When the user submits login credentials
      Then the authentication should succeed
      And a JWT token should be returned

    @auth @negative @lockout
    Scenario: Account lockout after multiple failed attempts
      Given a user with email "locked@example.com" exists
      When the user fails authentication 5 times
      Then the account should be locked
      And the lockout duration should be 15 minutes

  Rule: Password Policy Rules

    @password @policy
    Scenario Outline: Password strength validation - <Strength>
      Given a password "<password>"
      When the password is validated
      Then the strength should be "<Strength>"
      And the validation result should be <is_acceptable>

      Examples:
        | password          | Strength   | is_acceptable |
        | abc               | Weak       | false         |
        | Password123       | Good       | true          |
        | P@ssw0rd!123      | Strong     | true          |
