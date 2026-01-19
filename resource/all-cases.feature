# =============================================================================
# ALL GHERKIN TEST CASES
# =============================================================================
# This file consolidates all test patterns for Gherkin formatter validation.
# Contains intentional formatting issues to test the formatter.
# =============================================================================

@feature_tag1 @feature_tag2
  @feature_tag3
Feature: All Gherkin Test Cases
    This feature contains all Gherkin syntax patterns for testing.
    It includes intentional formatting issues to validate the formatter.

  # ===========================================================================
  # SECTION 1: Background
  # ===========================================================================
  Background: Common setup
      Given the system is initialized
       And the database is connected

  # ===========================================================================
  # SECTION 2: Minimal Scenario
  # ===========================================================================
  Scenario: Minimal scenario
      Given the minimalism

  # ===========================================================================
  # SECTION 3: Scenario with And/But Keywords
  # ===========================================================================
  @and-but
  Scenario: Scenario demonstrating And and But keywords
    Given a shopping cart exists
    And the cart contains 3 items
    But the cart does not contain any discounts
    When the user applies coupon code "SAVE20"
    Then the discount should be applied
    And the total should be reduced by 20%
    But the shipping cost should remain unchanged

  # ===========================================================================
  # SECTION 4: Scenario with Asterisk Steps
  # ===========================================================================
  @asterisk
  Scenario: Using asterisk for generic steps
    Given the system is in initial state
    * the feature flag "new_ui" is enabled
    * the user has role "admin"
    When the user navigates to the dashboard
    * the user clicks on "Settings"
    Then the settings page should load

  # ===========================================================================
  # SECTION 5: Data Tables
  # ===========================================================================
  @data-table
  Scenario: Data table examples
    Given a simple data table
      | foo | bar |
      | boz | boo |
    And a data table with different fromatting
      |   foo|bar|    boz    |    
    And a data table with an empty cell
      |foo||boz|

  # ===========================================================================
  # SECTION 6: Data Table with Comments
  # ===========================================================================
  @data-table @comments
  Scenario: Data table with comments
        Given context
        Then table node with a comment:
            | amountForPro       | 0  |
            # a comment in between
            | collectedFeeAmount | 95 |
        Then result

  # ===========================================================================
  # SECTION 7: Data Table Special Characters
  # ===========================================================================
  @data-table @special-chars
    Scenario: Data table with special characters
        When I have a data table
            | entityClassName | id |
            | App\Entity\Cart | 4 |
            | App\\Entity\\Cart | 5 |

  # ===========================================================================
  # SECTION 8: Doc String XML
  # ===========================================================================
  @docstring @xml
    Scenario: XML docstring
        When I receive the following feed from the bank:
        """xml
        <feed>
        <account number="123456789">
        </account>
        </feed>
        """

  # ===========================================================================
  # SECTION 9: Doc String JSON
  # ===========================================================================
  @docstring @json
    Scenario: JSON docstring
        When I receive the following feed from the bank:
        """json
        { "account": 
          "1234",
          "amount": 1000}
        """

  # ===========================================================================
  # SECTION 10: Doc String GraphQL
  # ===========================================================================
  @docstring @graphql
    Scenario: GraphQL docstring
        When I make the following query to the API:
        """graphql
        query AccountBalance($accountNumber:String!) {
            account(accountNumber:$accountNumber) {
                balance
            }
        }
        """

  # ===========================================================================
  # SECTION 11: Comments
  # ===========================================================================
  # scenario comment above
  @comments
    Scenario: Scenario with comments
        # step comment
        Given a step
        When context
        # comment 1
        # comment 2
        Then result

  # ===========================================================================
  # SECTION 12: Comments Before Steps
  # ===========================================================================
  @comments
    Scenario: Comments before steps
        Given I have a feature file
        Then I should see the output

        # this comment should stay just before the second given
        Given I have another feature file

  # ===========================================================================
  # SECTION 13: Special Characters
  # ===========================================================================
  @special-characters @unicode
  Scenario: Handle special characters and unicode in data
    Given a product with the following details:
      | field       | value                         |
      | name        | Café Latte™ - Special Edition |
      | price       | €12.99                        |
      | emoji       | ☕ 🎉 ✨                        |
      | japanese    | コーヒー                        |
    When I save the product
    Then all special characters should be preserved

  # ===========================================================================
  # SECTION 14: Escaped Characters
  # ===========================================================================
  @escaped-chars
  Scenario: Escaped characters in table
    Given a huge table with escaped characters
     | \n | 
     | \\n |
     | \| | 
     | \\\| |
     | a\b |
     | a\\b |

  # ===========================================================================
  # SECTION 15: Long Content / Description
  # ===========================================================================
  @long-content
  Scenario: Long scenario description
    Maecenas ullamcorper porta sapien. Vestibulum id ex fermentum, convallis
    erat ut, egestas sem. Mauris tristique massa

  # ===========================================================================
  # SECTION 16: Scenario Outline
  # ===========================================================================
@so_tag1  @so_tag2  
  @so_tag3
  Scenario Outline: Scenario Outline name
        Given I have <number> cukes in my belly
        When I wait <hour> hour
        Then my belly should growl

        Examples:
            | number | hour |
            | 1      |   the first hour of the day    |
            | 2      | 2    |

  # ===========================================================================
  # SECTION 17: Scenario Outline Named Examples
  # ===========================================================================
  @scenario-outline @named-examples
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

  # ===========================================================================
  # SECTION 18: Rule Keyword
  # ===========================================================================
  Rule: User Authentication Rules

    Background: Authentication prerequisites
      Given the authentication service is running

    @auth @positive
    Scenario: Successful authentication with valid credentials
      Given a user with email "valid@example.com" exists
      When the user submits login credentials
      Then the authentication should succeed

    @auth @negative
    Scenario: Account lockout after multiple failed attempts
      Given a user with email "locked@example.com" exists
      When the user fails authentication 5 times
      Then the account should be locked

  Rule: Password Policy Rules

    @password @policy
    Scenario Outline: Password strength validation - <Strength>
      Given a password "<password>"
      When the password is validated
      Then the strength should be "<Strength>"

      Examples:
        | password          | Strength   |
        | abc               | Weak       |
        | Password123       | Good       |
        | P@ssw0rd!123      | Strong     |

# End of file comment
