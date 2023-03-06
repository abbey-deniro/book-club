from pymongo import MongoClient

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
bookClubDB = client['Bookclub']['Clubs']
userDB = client['Bookclub']['user']

def lambda_handler(event, context):
    bookClub = bookClubDB.find_one({'_id' : event['bookClubCode']})

    if(bookClub != None):
        roll = 'Owner' if bookClub['Owner'] == event['userEmail'] else 'Member'
        bookClubDB.find_one_and_update({'_id' : event['bookClubCode']}, {'$push': {'members':event['userEmail']}}, upsert= True)
        userDB.find_one_and_update({'_id' : event['userEmail']}, {'$set':{f"Clubs.{bookClub['Name']}": roll}}, upsert=True)
        response = {"StatusCode" : 200, "Body":"Added member"}
    else:
        response = {"StatusCode" : 404, "Body":"Invalid code"}
    
    return response