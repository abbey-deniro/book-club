import random
from uuid import uuid4
import bcrypt
from pymongo import MongoClient
import boto3
import secretKeys
import jwt

queue_client = boto3.resource('sqs', region_name="us-west-2",
                            aws_access_key_id=secretKeys.awsAccessKey,
                            aws_secret_access_key=secretKeys.awsSecretKey)

queue = queue_client.get_queue_by_name(QueueName='EmailQueue')
client = MongoClient(
    'mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['user']
code = random.randrange(1, 99999, 5)


def lambda_handler(event, context):
    user = {}
    req_body = event["body"]
    user['_id'] = req_body['Email']
    user['Name'] = req_body['Name']
    user['username'] = req_body['Username']
    Password = req_body['Password']
    user['Active'] = req_body['Active']
    user['Clubs'] = req_body['Clubs']
    user['VerificationCode'] = code
    password = Password
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    user['password'] = bcrypt.hashpw(bytes, salt)

    try:
        db.insert_one(user)
        sqsResponse = queue.send_message(MessageBody='{} , {}'.format(user['_id'], code))

        del user['password']
        response = jwt.encode(user, "team1bookclubthebest")
    except:
        response = "User with that email already exists"

    return response

