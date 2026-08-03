import os
import logging
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

class DatabaseConnection:
    _instance = None

    def __init__(self):
        self.client = None
        self.db = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = DatabaseConnection()
        return cls._instance

    def connect(self, app=None):
        if self.db is not None:
            return self.db

        mongo_uri = os.getenv("MONGO_URI")
        if not mongo_uri:
            logger.warning("MONGO_URI not set. Using local fallback.")
            mongo_uri = "mongodb://localhost:27017/financewise"
            
        masked = mongo_uri.split("@")[-1] if "@" in mongo_uri else "local"
        logger.info(f"Connecting to MongoDB instance (Host: {masked})")

        self.client = MongoClient(
            mongo_uri, 
            serverSelectionTimeoutMS=5000,
            maxPoolSize=50,
            minPoolSize=5
        )

        try:
            self.client.admin.command('ping')
            logger.info("MongoDB ping successful.")
        except Exception as e:
            logger.error(f"MongoDB connection ping failed: {e}")

        # Extract db name
        db_name = "financewise"
        if "/" in mongo_uri:
            possible_name = mongo_uri.split("/")[-1].split("?")[0]
            if possible_name:
                db_name = possible_name

        self.db = self.client[db_name]
        self._ensure_indexes()
        return self.db

    def _ensure_indexes(self):
        try:
            if self.db is not None:
                self.db.users.create_index("email", unique=True)
                self.db.transactions.create_index("user_id")
                self.db.invoices.create_index("user_id")
                self.db.goals.create_index("user_id")
                self.db.loans.create_index("user_id")
                self.db.chat_history.create_index("user_id")
                self.db.notifications.create_index("user_id")
                logger.info("Database indexes ensured.")
        except Exception as e:
            logger.warning(f"Index creation error: {e}")

db_conn = DatabaseConnection.get_instance()

def get_db():
    return db_conn.connect()
