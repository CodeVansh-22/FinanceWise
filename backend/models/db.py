import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.client = None
        self.db = None
    
    def connect(self):
        mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/financewise_local")
        self.client = MongoClient(mongo_uri)
        db_name = mongo_uri.split("/")[-1].split("?")[0]
        # In case there's no db_name in URI, default to financewise
        if not db_name:
             db_name = "financewise"
        self.db = self.client[db_name]
        print(f"Connected to MongoDB: {db_name}")

db_instance = Database()

def get_db():
    if db_instance.client is None:
        db_instance.connect()
    return db_instance.db
