from pymongo import MongoClient

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    response = db.find_one_and_update({'_id' : event['bookClubCode']}, {'$pull': {'members': event['userEmail']}})

    if(response != None):
        return "Member removed"
    else:
        return "Incorrect code"