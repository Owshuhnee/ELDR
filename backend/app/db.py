from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)        # creates the connection to Neon PostgreSQL database using the URL inside .env file

SessionLocal = sessionmaker(bind=engine)    # creates database sessions

Base = declarative_base()                   # base class that models will inherit from

def get_db():                               # function that opens a database session
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()