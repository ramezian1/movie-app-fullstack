from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from app.database import Base
from sqlalchemy import Column, Integer, String
from app.database import Base

from sqlalchemy import Column, Integer, String
from app.database import Base

class Movie(Base):
    __tablename__ = "movies"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    genre = Column(String, index=True)
    year = Column(Integer, index=True)
    description = Column(String, nullable=True)

from pydantic import BaseModel

class MovieCreate(BaseModel):
    title: str
    genre: str
    year: int
    description: str = None

class MovieUpdate(BaseModel):
    title: str = None
    genre: str = None
    year: int = None
    description: str = None

from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        orm_mode = True

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

