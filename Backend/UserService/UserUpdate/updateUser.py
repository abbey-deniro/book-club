import pymongo
from uuid import uuid4
from pymongo import MongoClient


client = MongoClient(
    'mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['user']


def lambda_handler(event, context):

    req_body = event["body"]
    name = req_body['Name']
    email = req_body['Email']
    Username = req_body['Username']
    Active = req_body['Active']
    Clubs = req_body['Clubs']

    db.update_one(
        {
            'Email': email
        },
        {
            '$set': {
                "Name": name,
                "username": Username,
                "Active": Active,
                "Clubs": Clubs,
            }
        }
    )

    return {
        'Name': name,
        'username': Username,
        'Active': Active,
        'Clubs': Clubs
    }
