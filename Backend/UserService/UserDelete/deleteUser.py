import pymongo
from uuid import uuid4
from pymongo import MongoClient

client = MongoClient(
    'mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['user']

def lambda_handler(event, context):

    req_body = event["body"]
    email = req_body['Email']

    myquery = { "Email": email }

    db.delete_one(myquery)
