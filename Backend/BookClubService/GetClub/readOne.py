from pymongo import MongoClient

client = MongoClient('mongodb+srv://team1:fV7v57oPgnrrhiiP@theclub.bzkoudj.mongodb.net/?retryWrites=true&w=majority')
db = client['Bookclub']['Clubs']

def lambda_handler(event, context):
    print(event)
    code = event["pathParams"]["code"]
    return db.find_one({'_id' : code})