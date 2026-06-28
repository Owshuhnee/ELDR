# DATABASE SETUP
# Creates the database engine, session factory, and base model class

# ─── IMPORTS ──────────────────────────────────────────────────────────────────
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import QueuePool
import os


# ─── ENGINE ───────────────────────────────────────────────────────────────────
# DATABASE_URL is loaded from the .env file - never hardcode credentials here
DATABASE_URL = os.getenv("DATABASE_URL")

# create_engine sets up the connection to the Neon PostgreSQL database
# pool_pre_ping=True tests the connection before using it - prevents stale connections
# pool_recycle=300 replaces connections older than 5 minutes
engine = create_engine(
    DATABASE_URL,
    poolclass    = QueuePool,
    pool_pre_ping = True,
    pool_recycle  = 300,
)


# ─── SESSION ──────────────────────────────────────────────────────────────────
# SessionLocal is a factory - calling SessionLocal() opens a new database session
# Every route that needs the database calls SessionLocal() and closes it in finally
SessionLocal = sessionmaker(bind=engine)


# ─── BASE ─────────────────────────────────────────────────────────────────────
# Base is the parent class for all SQLAlchemy models
# Every model in models.py inherits from Base so SQLAlchemy knows about it
Base = declarative_base()


# ─── GENERATOR FUNCTION ───────────────────────────────────────────────────────
# get_db() is a legacy generator - kept for any code that still uses next(get_db())
# New routes should use SessionLocal() directly instead
def get_db():
    # Open a session
    db = SessionLocal()
    try:
        # Hand the session to whoever called get_db()
        yield db
    finally:
        # Always close it when done, even if an error occurred
        db.close()