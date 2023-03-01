import jwt

def lambda_handler(event, context):
    auth_header = event['headers']["Authorization"]
    token = auth_header.split(" ")[1].strip()
    allow = 'Deny'

    try:
        jwt.decode(token, "team1bookclubthebest", algorithms="HS256")
        allow = "Allow"
    except:
        response = "Invalid token"
        return response
    
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