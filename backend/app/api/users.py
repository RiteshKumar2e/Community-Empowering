from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core.database import get_db
from app.models.models import User
from app.api.auth import oauth2_scheme
from app.core.security import decode_access_token

router = APIRouter()

class StatsResponse(BaseModel):
    queriesCount: int
    coursesEnrolled: int
    resourcesViewed: int
    achievementsEarned: int

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Get current authenticated user"""
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@router.get("/stats", response_model=StatsResponse)
async def get_user_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get user statistics"""
    from app.models.models import Query, Enrollment
    
    queries_count = db.query(Query).filter(Query.user_id == current_user.id).count()
    courses_enrolled = db.query(Enrollment).filter(Enrollment.user_id == current_user.id).count()
    
    return {
        "queriesCount": queries_count,
        "coursesEnrolled": courses_enrolled,
        "resourcesViewed": 0,  # Implement tracking
        "achievementsEarned": 0  # Implement achievements system
    }

@router.get("/activity")
async def get_user_activity(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get user recent activity"""
    from app.models.models import Query
    
    recent_queries = db.query(Query).filter(
        Query.user_id == current_user.id
    ).order_by(Query.created_at.desc()).limit(10).all()
    
    activity = []
    for query in recent_queries:
        activity.append({
            "description": f"Asked: {query.message[:50]}...",
            "timestamp": query.created_at.strftime("%Y-%m-%d %H:%M")
        })
    
    return activity

@router.get("/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone,
        "location": current_user.location,
        "language": current_user.language,
        "communityType": current_user.community_type
    }
