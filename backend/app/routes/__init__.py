from fastapi import APIRouter

from routes.health import router as health_router
from routes.auth import router as auth_router


api_router = APIRouter()

api_router.include_router(health_router)

api_router.include_router(auth_router)