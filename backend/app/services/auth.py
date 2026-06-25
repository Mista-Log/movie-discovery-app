from sqlalchemy.orm import Session

from models.user import User
from models.utils.security import (
    hash_password,
    verify_password,
)
from models.utils.jwt import create_access_token


def register_user(
    db: Session,
    email: str,
    password: str
):
    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user:
        raise ValueError(
            "User already exists"
        )

    user = User(
        email=email,
        password_hash=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(
        {"sub": str(user.id)}
    )

    return token


def login_user(
    db: Session,
    email: str,
    password: str
):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise ValueError(
            "Invalid credentials"
        )

    if not verify_password(
        password,
        user.password_hash
    ):
        raise ValueError(
            "Invalid credentials"
        )

    return create_access_token(
        {"sub": str(user.id)}
    )