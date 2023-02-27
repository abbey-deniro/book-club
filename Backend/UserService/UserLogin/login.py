from pymongo import MongoClient
from bson.objectid import ObjectId
import jwt
import bcrypt

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['user']

def lambda_handler(event, context):
    user = db.find_one({'$or' : [{'username' : event['username']}, {'_id':event['username']}]})

    if (bcrypt.checkpw(event['password'].encode(), user['password'])):
        del user['password']
        
        response = jwt.encode(user, "team1bookclubthebest")
    else:
        response = 'Wrong username or password'
    
    return response

