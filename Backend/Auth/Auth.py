import jwt
import re

def lambda_handler(event, context):
    print(event['headers'])
    token = ''
    headers = dict(event['headers'])
    try:
        print(headers.keys())
        auth_header = headers['Authorization']
        token = re.match("Bearer (.+)", auth_header)[1]
    except:
        auth_header = headers['authorization']
        token = re.match("Bearer (.+)", auth_header)[1]
    allow = 'Deny'
    
    try:
        jwt.decode(token, "team1bookclubthebest", algorithms="HS256")
        allow = "Allow"
    except:
        allow = 'Deny'
    
    print(allow)

    response = {
    "principalId": "abcdef", # The principal user identification associated with the token sent by the client.
    "policyDocument": {
    "Version": "2012-10-17",
        "Statement": [
            {
            "Action": "execute-api:Invoke",
            # "Effect": "Allow|Deny",
            "Effect": allow,
            # "Resource": "arn:aws:execute-api:{regionId}:{accountId}:{apiId}/{stage}/{httpVerb}/[{resource}/[{child-resources}]]"
            "Resource": event['methodArn']
            }
        ]
    },
        "context": {
        "exampleKey": "exampleValue"
    }
    }

    return response