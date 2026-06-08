from app.db import Base
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    role = Column(String(50), nullable=False, default="elder")
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    password_hash = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(20))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    needs_mobility = Column(Boolean, default=False)
    needs_vision = Column(Boolean, default=False)
    onboarding_complete = Column(Boolean, default=False)