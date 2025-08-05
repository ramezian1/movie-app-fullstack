from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import SessionLocal
from app import crud
from app.models import MovieCreate, MovieUpdate  # Add MovieUpdate if you have one
from app.auth import get_current_user

router = APIRouter(
    prefix="/movies",
    tags=["movies"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/search")
def search_movies(
    title: Optional[str] = Query(None),
    genre: Optional[str] = Query(None),
    year: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    return crud.search_movies(db, title, genre, year)

@router.get("/")
def read_movies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_movies(db, skip=skip, limit=limit)

@router.post("/", status_code=201)
def create_movie(
    movie: MovieCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return crud.create_movie(db, movie)

@router.put("/{movie_id}")
def update_movie(
    movie_id: int,
    movie: MovieCreate,  # Or MovieUpdate if you have it
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    updated = crud.update_movie(db, movie_id, movie)
    if not updated:
        raise HTTPException(status_code=404, detail="Movie not found")
    return updated

@router.delete("/{movie_id}")
def delete_movie(
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    deleted = crud.delete_movie(db, movie_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Movie not found")
    return {"ok": True}