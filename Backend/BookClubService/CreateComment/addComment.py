from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    db.find_one_and_update({'_id' : event['bookClubCode']}, 
        {'$push': {'comments':
            {'user':event['username'], 
            'comment':event['comment'], 
            'time':datetime.now()}
    }}, upsert= True)
    response = "Added comment"
    
    return response