# Newton Raja K — Personal Portfolio

> World-class premium portfolio website built with React + FastAPI

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite, Tailwind CSS, Framer Motion |
| Backend | Python FastAPI |
| Database | PostgreSQL (SQLite for local dev) |
| Deployment | Vercel (frontend) + Render (backend) |

## Quick Start

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Visit: http://localhost:3000

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
API Docs: http://localhost:8000/api/docs

## Project Structure
```
Newton_Portfolio/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/      # Navbar, Footer
│       │   ├── sections/    # All page sections
│       │   └── ui/          # Shared UI primitives
│       ├── context/         # ThemeContext
│       ├── data/            # portfolioData.js
│       ├── hooks/           # Custom React hooks
│       └── utils/           # Animation variants
└── backend/
    └── app/
        ├── main.py          # FastAPI entry point
        ├── config.py        # Settings
        ├── database.py      # SQLAlchemy engine
        ├── models.py        # ORM models
        ├── schemas.py       # Pydantic schemas
        └── routes/          # API route handlers
```

## Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import project in Vercel
3. Set `VITE_API_URL` to your Render backend URL

### Backend → Render
1. Create a Web Service pointing to `/backend`
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add `DATABASE_URL` environment variable (PostgreSQL)

## License
MIT © Newton Raja K
