Feature: Create new hosted onboarding
  In order to onboard users in the platform
  As an admin
  I want to create a new hosted onboarding

  Scenario: A valid non existing hosted onboarding
    Given I send a graphql request with query and variables:
    """
    {
        "query": "mutation CreateHostedUserOnboarding($input: CreateHostedWorkerOnboardingInput!) { createHostedUserOnboarding(input: $input) { id status } }",
        "variables": { "input": { "id": "e3e0a2e4-89c6-4ebd-93d0-ef68a9a1c0f3" } }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "createHostedUserOnboarding": {
          "id": "e3e0a2e4-89c6-4ebd-93d0-ef68a9a1c0f3",
          "status": "STARTED"
        }
      }
    }
    """
