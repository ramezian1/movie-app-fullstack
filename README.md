# 🎬 Movie App Fullstack

A full-stack Movie Database application built with **FastAPI (Python)** for the backend and **React (Vite, Tailwind CSS)** for the frontend.

---

## Features
- User registration & JWT login
- Add/search/list movies with title, genre, year, and description
- Protected API endpoints with JWT authentication
- Responsive, modern UI (Tailwind CSS)
- Clean codebase, ready for portfolio/demo use

---

## Tech Stack
- **Backend:** Python, FastAPI, SQLite, SQLAlchemy, JWT Auth
- **Frontend:** React, Vite, Axios, Tailwind CSS

---

## Quick Start

### 1. **Clone the Repository**

```bash
git clone https://github.com/ramezian1/movie-app-fullstack.git
cd movie-app-fullstack
```

### 2. **Backend Setup** 
```bash
cd movie_api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
•	**FastAPI** runs at http://127.0.0.1:8000
•	**Swagger docs**: http://127.0.0.1:8000/docs

### 	3.	**Frontend Setup**
```bash
cd movie_frontend
npm install
npm run dev
```
•	**React app** runs at http://localhost:5173

---

**LICENSE**  
Copyright (c) 2025 Robert Mezian
