from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from database import get_db

from schemas.auth import (
    SignUpSchema,
    SignInSchema,
    AuthResponse,
)

from services.auth import (
    register_user,
    login_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/signup",
    response_model=AuthResponse
)
def signup(
    payload: SignUpSchema,
    db: Session = Depends(get_db)
):
    try:
        token = register_user(
            db,
            payload.email,
            payload.password
        )

        return {
            "access_token": token
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post(
    "/signin",
    response_model=AuthResponse
)
def signin(
    payload: SignInSchema,
    db: Session = Depends(get_db)
):
    try:
        token = login_user(
            db,
            payload.email,
            payload.password
        )

        return {
            "access_token": token
        }

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )