Feature: Create new hosted onboarding
  In order to onboard users in the platform
  As an admin
  I want to create a new hosted onboarding

  Scenario: A valid non existing hosted onboarding
    Given I send a graphql request with query and variables:
    """
    {
        "query": "mutation CreateHostedUserOnboarding($input: CreateHostedUserOnboardingInput!) { createHostedUserOnboarding(input: $input) { id status user { id } } }",
        "variables": { "input": { "id": "e3e0a2e4-89c6-4ebd-93d0-ef68a9a1c0f3", "userId": "6d1a5a84-7d5b-4a7f-8bcb-d7aeb4ccde18", "status": "STARTED" } }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "createHostedUserOnboarding": {
          "id": "e3e0a2e4-89c6-4ebd-93d0-ef68a9a1c0f3",
          "status": "STARTED",
          "user": {
            "id": "6d1a5a84-7d5b-4a7f-8bcb-d7aeb4ccde18"
          }
        }
      }
    }
    """
