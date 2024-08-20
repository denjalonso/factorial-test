Feature: Get hosted onboarding
  As a user with permissions
  I want to get a user hosted onboarding

  Scenario: A hosted onboarding
    Given I send a graphql request with query and variables:
    """
    {
        "query": "mutation CreateUser($user: CreateUserInput!) { createUser(input: $user) { id name } }",
        "variables": { "user": { "id": "1b5d77a0-5c47-411f-9753-3a19b21fc2c1", "name": "Parrot" } }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "createUser": {
          "id": "1b5d77a0-5c47-411f-9753-3a19b21fc2c1",
          "name": "Parrot"
        }
      }
    }
    """

    Given I send a graphql request with query and variables:
    """
    {
        "query": "mutation CreateHostedUserOnboarding($input: CreateHostedUserOnboardingInput!) { createHostedUserOnboarding(input: $input) { id status user { id } } }",
        "variables": { "input": { "id": "9b6c0b7e-23f3-431a-8d92-463b981c2a1f", "userId": "1b5d77a0-5c47-411f-9753-3a19b21fc2c1", "status": "INVITED" } }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "createHostedUserOnboarding": {
          "id": "9b6c0b7e-23f3-431a-8d92-463b981c2a1f",
          "status": "INVITED",
          "user": {
            "id": "1b5d77a0-5c47-411f-9753-3a19b21fc2c1"
          }
        }
      }
    }
    """

    Given I send a graphql request with query and variables:
    """
    {
        "query": "query UserSelfOnboardingHosted($onboardingId: ID!) { hostedUserOnboarding(id: $onboardingId) { id } }",
        "variables": { "onboardingId": "9b6c0b7e-23f3-431a-8d92-463b981c2a1f" }
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "hostedUserOnboarding": {
          "id": "9b6c0b7e-23f3-431a-8d92-463b981c2a1f"
        }
      }
    }
    """
