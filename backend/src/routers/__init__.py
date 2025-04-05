from fastapi import APIRouter
from .auth_router import router as auth_router
from .meeting_router import router as meeting_router
from .question_router import router as question_router

routers_list: list[APIRouter] = [auth_router, meeting_router, question_router]
