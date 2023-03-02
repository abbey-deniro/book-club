from pymongo import MongoClient


client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

club = {}
def lambda_handler(event, context):
    club['_id'] = event['bookClubCode']
    club['Owner'] = event['owner']
    club['Image'] = event['imageUrl']
    club['BookTitle'] = event['title']
    club['BookLength'] = event['bookLength']
    club['Name'] = event['name']
    club['members'] = []
    id = db.insert_one(club).inserted_id

    return {"Code":id}