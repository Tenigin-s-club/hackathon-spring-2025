from fastapi import APIRouter
from .auth_router import router as auth_router
from .admin_router import router as admin_router

routers_list: list[APIRouter] = [auth_router, admin_router]