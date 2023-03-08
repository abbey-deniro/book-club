from pymongo import MongoClient

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    club = db.find_one({'_id' : event['bookClubCode']})

    if(event['userEmail' == club['Owner']]):
        db.delete_one({'_id' : event['bookClubCode']})
        response =  "Bookclub deleted"
    else:
        response = "Unauthorized. User is not the owner."

    return response