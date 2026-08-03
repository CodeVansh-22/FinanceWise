import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "financewise-secret-key-prod-2026")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "financewise-super-jwt-secret-2026")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/financewise")
    
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
    
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
    
    RATELIMIT_STORAGE_URI = "memory://"
    RATELIMIT_DEFAULT = "200 per day; 50 per hour"
    
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max file upload

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config_by_name = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'default': DevelopmentConfig
}
