from pymongo import MongoClient
import re
import jwt

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    token = ''
    headers = dict(event['headers'])
    try:
        auth_header = headers['Authorization']
        token = re.match("Bearer (.+)", auth_header)[1]
    except:
        auth_header = headers['authorization']
        token = re.match("Bearer (.+)", auth_header)[1]
    
    user = jwt.decode(token, "team1bookclubthebest", algorithms="HS256")
    return list(db.find({'$or' : [{'Owner' : user['_id']}, {'members':user['_id']}]}))

