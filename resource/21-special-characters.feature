Feature: Special Characters

  Scenario: Handle special characters and unicode in data
    Given a product with the following details:
      | field       | value                                      |
      | name        | Café Latte™ - Special Edition              |
      | description | A rich blend with notes of café au lait & crème |
      | tags        | "premium", "limited-edition", "café"       |
      | price       | €12.99                                     |
      | currency    | EUR (€)                                    |
      | emoji       | ☕ 🎉 ✨                                    |
      | japanese    | コーヒー                                    |
      | arabic      | قهوة                                       |
    When I save the product
    Then all special characters should be preserved
    And the product should be searchable by name "Café Latte"
