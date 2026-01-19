Feature: And But Keywords

  Scenario: Scenario demonstrating And and But keywords
    Given a shopping cart exists
    And the cart contains 3 items
    But the cart does not contain any discounts
    When the user applies coupon code "SAVE20"
    Then the discount should be applied
    And the total should be reduced by 20%
    But the shipping cost should remain unchanged
