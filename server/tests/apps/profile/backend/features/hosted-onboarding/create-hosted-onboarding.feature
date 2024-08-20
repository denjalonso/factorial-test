Feature: Create new hosted onboarding
  In order to onboard users in the platform
  As an admin
  I want to create a new hosted onboarding

  Scenario: A valid non existing hosted onboarding
    Given I send a graphql request with query and variables:
    """
    {
        "query": "mutation CreateUser($user: CreateUserInput!) { createUser(input: $user) { id name } }",
        "variables": { "user": { "id": "8b5ac071-9094-4c3f-b9c5-2d5cfb8a5fae", "name": "Parrot" } }
    }
    """
    Then the response status code should be 200

    Given I send a graphql request with query and variables:
    """
    {
        "query": "mutation CreateHostedUserOnboarding($input: CreateHostedUserOnboardingInput!) { createHostedUserOnboarding(input: $input) { id status user { id } } }",
        "variables": { "input": { "id": "e8a9249c-d637-48f7-b19b-8b645f8e6624", "userId": "8b5ac071-9094-4c3f-b9c5-2d5cfb8a5fae", "status": "INVITED" } }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "createHostedUserOnboarding": {
          "id": "e8a9249c-d637-48f7-b19b-8b645f8e6624",
          "status": "INVITED",
          "user": {
            "id": "8b5ac071-9094-4c3f-b9c5-2d5cfb8a5fae"
          }
        }
      }
    }
    """
