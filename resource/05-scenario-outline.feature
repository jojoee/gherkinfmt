@accountability
@accountability-json
Feature: accountability
    accounts should always be good

    Scenario Outline: Scenario Outline name
        Given I have <number> cukes in my belly
        When I wait <hour> hour
        Then my belly should growl

        Examples:
            | number | hour |
            | 1      |   the first hour of the day    |
            | 2      | 2    |
