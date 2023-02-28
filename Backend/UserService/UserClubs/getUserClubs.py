from pymongo import MongoClient

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    return list(db.find({'$or' : [{'Owner' : event['userEmail']}, {'members':event['userEmail']}]}))

