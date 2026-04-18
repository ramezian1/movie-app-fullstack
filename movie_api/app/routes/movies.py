from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db  # centralized — no local copy needed
from app import crud
from app.models import MovieCreate, MovieUpdate, MovieOut
from app.auth import get_current_user

router = APIRouter(prefix="/movies", tags=["movies"])


@router.get("/search", response_model=List[MovieOut])
def search_movies(
    title: Optional[str] = Query(None),
    genre: Optional[str] = Query(None),
    year: Optional[int] = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return crud.search_movies(db, title, genre, year, skip=skip, limit=limit)


@router.get("/", response_model=List[MovieOut])
def read_movies(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return crud.get_movies(db, skip=skip, limit=limit)


@router.get("/{movie_id}", response_model=MovieOut)
def read_movie(
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    movie = crud.get_movie(db, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


@router.post("/", status_code=201, response_model=MovieOut)
def create_movie(
    movie: MovieCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    return crud.create_movie(db, movie)


@router.put("/{movie_id}", response_model=MovieOut)
def update_movie(
    movie_id: int,
    movie: MovieUpdate,  # Fixed: was MovieCreate, now allows partial updates
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    updated = crud.update_movie(db, movie_id, movie)
    if not updated:
        raise HTTPException(status_code=404, detail="Movie not found")
    return updated


@router.delete("/{movie_id}")
def delete_movie(
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    deleted = crud.delete_movie(db, movie_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Movie not found")
    return {"ok": True}
