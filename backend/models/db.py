import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.client = None
        self.db = None
    
    def connect(self):
        mongo_uri = os.getenv("MONGO_URI")
        if not mongo_uri:
            print("WARNING: MONGO_URI not found in environment. Using local fallback.")
            mongo_uri = "mongodb://localhost:27017/financewise_local"
        else:
            # Mask the password in logs
            masked_uri = mongo_uri.split("@")[-1] if "@" in mongo_uri else "HIDDEN"
            print(f"Connecting to MongoDB (Masked URI: ...@{masked_uri})")
            
        self.client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        try:
            # Trigger a connection to check if it's valid
            self.client.admin.command('ping')
            print("Successfully pinged MongoDB deployment.")
        except Exception as e:
            print(f"CRITICAL: Failed to connect to MongoDB: {e}")
            
        db_name = mongo_uri.split("/")[-1].split("?")[0]
        if not db_name:
             db_name = "financewise"
        self.db = self.client[db_name]
        print(f"Using database: {db_name}")

db_instance = Database()

def get_db():
    if db_instance.client is None:
        db_instance.connect()
    return db_instance.db
