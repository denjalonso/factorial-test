Feature: Create new user
  In order to have users in the platform
  As an admin
  I want to create a new user

  Scenario: A valid non existing user
    Given I send a PUT request to "/users/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "name": "Parrot"
    }
    """
    Then the response status code should be 201
    And the response should be empty
