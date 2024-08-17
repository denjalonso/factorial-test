Feature: Get hosted onboarding
  As a user with permissions
  I want to get a user hosted onboarding

  Scenario: A hosted onboarding
    Given I send a graphql request with query and variables:
    """
    {
        "query": "query UserSelfOnboardingHosted($onboardingId: ID!) { hostedUserOnboarding(id: $onboardingId) { id status user { id } } }",
        "variables": { "onboardingId": "e3e0a2e4-89c6-4ebd-93d0-ef68a9a1c0f3" }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "hostedUserOnboarding": {
          "id": "e3e0a2e4-89c6-4ebd-93d0-ef68a9a1c0f3",
          "status": "STARTED",
          "user": {
             "id": "6d1a5a84-7d5b-4a7f-8bcb-d7aeb4ccde18",
          }
        }
      }
    }
    """
