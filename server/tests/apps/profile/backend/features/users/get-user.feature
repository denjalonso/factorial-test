#Feature: Get user
#  As a user with permissions
#  I want to get user
#
#  Scenario: A existing user
#    Given a GraphQL endpoint
#    When I send a GraphQL request with the following query:
#    """
#    query GetUser($userId: String!) {
#      user(id: $userId) {
#        name
#      }
#    }
#    """
##    Then the response status code should be 200
##    Then the response should contain:
##    """
##    {
##      "data": {
##        "user": {
##          "id": "[ExpectedValue]",
##          "name": [ExpectedValue]
##        }
##      }
##    }
##    """
