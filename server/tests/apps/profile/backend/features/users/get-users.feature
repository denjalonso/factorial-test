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
        "users": [
        {
            "id": "8b5ac071-9094-4c3f-b9c5-2d5cfb8a5fae",
            "name": "Parrot"
        },{
            "id": "1b5d77a0-5c47-411f-9753-3a19b21fc2c1",
            "name": "Parrot"
        },{
            "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
            "name": "Parrot"
        }, {
            "id": "6d1a5a84-7d5b-4a7f-8bcb-d7aeb4ccde18",
            "name": "Parrot"
        }]
      }
    }
    """
