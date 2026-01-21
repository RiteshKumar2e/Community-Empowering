from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.models import models  # Import models to register them
from app.api import auth, users, ai, resources, learning, admin

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Community AI Platform API",
    description="AI-powered platform for community access to information and resources",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(resources.router, prefix="/api/resources", tags=["Resources"])
app.include_router(learning.router, prefix="/api/learning", tags=["Learning"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/")
async def root():
    return {
        "message": "Community AI Platform API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
