from pymongo import MongoClient

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    bookClub = db.find_one({'code' : event['bookClubCode']})
    if(bookClub != None):
        db.find_one_and_update({'code' : event['bookClubCode']}, {'$push': {'members':event['userEmail']}}, upsert= True)
        response = "Added member"
    else:
        response = "Invalid code"
    
    return response