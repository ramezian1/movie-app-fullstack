from fastapi import FastAPI
from app.routes import movies, users
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Movie Database API",
    description="A RESTful API for managing a movie database.",
    version="1.0.0"
)

app.include_router(movies.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Movie Database API"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["http://localhost:5173"] in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)