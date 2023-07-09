Feature: My First JS App

  Background:
    Given A web browser is at the "Main" page

  Scenario: There are 9 pictures in the picture grid
    When The picture grid is displayed
    Then There are 9 pictures in the picture grid

  Scenario: As a user, I can search for a picture with a valid picture name
    When The user enters "1.png" into the search bar
    And User clicks the Submit button
    Then The searchable picture "1.png" is displayed on the screen
    And The picture grid is hidden

  Scenario: As a user, I cannot get a picture if the picture is not found
    When The user enters "1" into the search bar
    And User clicks the Submit button
    Then The searchable picture "1" is not displayed on the screen
    And Error message "Error: Not Found" is shown
    And The picture grid is hidden


  Scenario Outline: Submit button should be disabled if the search field is empty or contains spaces only
    When The user enters <searchedValue> into the search bar
    Then The submit button cannot be clicked
    And The picture grid is not hidden

    Examples:
      | searchedValue |
      | ""            |
      | " "           |
      | "  "          |
      | "\u00A0"      |

