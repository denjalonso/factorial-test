Feature: Get user
  As a user with permissions
  I want to get all users

  Scenario: All existing users
    Given I send a graphql request with query and variables:
    """
    {
        "query": "query UsersList { users { id name } }",
        "variables": {}
    }
    """
    Then the response status code should be 200
    And the response should be
    """
    {
      "data": {
        "users": [{
            "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
            "name": "Parrot"
        }, {
            "id": "6d1a5a84-7d5b-4a7f-8bcb-d7aeb4ccde18",
            "name": "Parrot"
        }]
      }
    }
    """
