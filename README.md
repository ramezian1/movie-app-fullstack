# 🎬 Movie App Fullstack

A full-stack Movie Database application built with **FastAPI** (Python) and **React** (Vite, Tailwind CSS).

⸻

## Features

- User registration & JWT login
- Add, search, and list movies (title, genre, year, description)
- Secure JWT-protected API endpoints
- Responsive modern UI with Tailwind CSS
- Ready for portfolio/demo use

⸻

## Tech Stack

- **Backend:** FastAPI, Python, SQLite, SQLAlchemy, JWT
- **Frontend:** React, Vite, Axios, Tailwind CSS

⸻

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/ramezian1/movie-app-fullstack.git
cd movie-app-fullstack
```

### 2. Backend Setup
```bash
cd movie_api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

•	FastAPI runs at http://127.0.0.1:8000
•	Swagger docs: http://127.0.0.1:8000/docs

### 3. Frontend Setup

Open another terminal:
```bash
cd movie_frontend
npm install
npm run dev
```
•	React app runs at http://localhost:5173

⸻

#### Usage
•	Register and log in to get a JWT token
•	Add, search, and browse movies
•	Log out to clear authentication
•	Data is stored locally in movies.db (SQLite)

#### Credits
•	Developed by Bobby Mezian
•	Backend: FastAPI
•	Frontend: React, Vite, Tailwind CSS

## License
MIT License. See [LICENSE](LICENSE) for details.
Robert Mezian 2025
