from pymongo import MongoClient

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    bookClub = db.find_one({'_id' : event['bookClubCode']})
    if(bookClub != None):
        db.find_one_and_update({'_id' : event['bookClubCode']}, {'$push': {'members':event['userEmail']}}, upsert= True)
        response = {"StatusCode" : 200, "Body":"Added member"}
    else:
        response = {"StatusCode" : 404, "Body":"Invalid code"}
    
    return response