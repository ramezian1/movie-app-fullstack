from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
from app.config import settings

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False}  # only needed for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator:
    """Yield a DB session and ensure it is closed after the request.
    Import this once here; routes should use Depends(get_db) instead of
    defining their own copy.
    """
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
