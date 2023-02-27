import random
from uuid import uuid4
import bcrypt
from pymongo import MongoClient
import boto3
import secretKeys

queue_client = boto3.resource('sqs', region_name="us-west-2",
                            aws_access_key_id=secretKeys.awsAccessKey,
                            aws_secret_access_key=secretKeys.awsSecretKey)

queue = queue_client.get_queue_by_name(QueueName='EmailQueue')
client = MongoClient(
    'mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['user']
code = random.randrange(1, 99999, 5)


def lambda_handler(event, context):

    req_body = event["body"]
    name = req_body['Name']
    email = req_body['Email']
    Username = req_body['Username']
    Password = req_body['Password']
    Active = req_body['Active']
    Clubs = req_body['Clubs']
    password = Password
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)

    db.insert_one({
        '_id' : email,
        'Name': name,
        'username': Username,
        'password': hash,
        'VerifcationCode': code,
        'Active': Active,
        'Clubs': Clubs
    })
    respone = queue.send_message(MessageBody='{} , {}'.format(email, code))
    return {
        '_id' : email,
        'Name': name,
        'username': Username,
        'password': hash,
        'VerifcationCode': code,
        'Active': Active,
        'Clubs': Clubs
    }

