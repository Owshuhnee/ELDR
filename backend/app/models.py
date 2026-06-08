from app.db import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

class User(Base):                                               # creates a Python class that maps to the users table in Neon

    __tablename__ = "users"                                     # tells which table this maps to

    id = Column(Integer, primary_key=True)
    role = Column(String(50), nullable=False, default="elder")
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    password_hash = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(20))
    created_at = Column(DateTime(timezone=True), server_default=func.now())