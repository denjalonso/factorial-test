Feature: Create new user
  In order to have users in the platform
  As an admin
  I want to create a new user

  Scenario: A valid non existing user
    Given I send a PUT request to "/users/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "name": "Parrot"
    }
    """
    Then the response status code should be 201
    And the response should be empty

    Given I send a graphql request with mutation and variables:
    """
    {
        "query": "mutation CreateUser($user: CreateUserInput!) { createUser(input: $user) { id name } }",
        "variables": { "user": { "id": "6d1a5a84-7d5b-4a7f-8bcb-d7aeb4ccde18", "name": "Parrot" } }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "createUser": {
          "id": "6d1a5a84-7d5b-4a7f-8bcb-d7aeb4ccde18",
          "name": "Parrot"
        }
      }
    }
    """

  Scenario: A invalid non existing user
    Given I send a PUT request to "/users/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "name": 5
    }
    """
    Then the response status code should be 422
    # 422 Unprocessable Entity
