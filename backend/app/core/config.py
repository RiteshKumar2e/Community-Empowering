from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "Community AI Platform"
    DEBUG: bool = True
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "https://community-empower.vercel.app"
    ]
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/community_ai"
    
    # AI API Keys
    GROQ_API_KEY: str = ""
    
    # File Upload
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
