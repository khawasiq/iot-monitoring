from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, home

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_headers=["*"],
    allow_methods=["*"],
)

app.include_router(auth.router)
app.include_router(home.router)