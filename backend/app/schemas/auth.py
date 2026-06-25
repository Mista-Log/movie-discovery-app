from pydantic import BaseModel, EmailStr, field_validator


class SignUpSchema(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def validate_passwords(
        cls,
        value,
        info
    ):
        password = info.data.get("password")

        if password != value:
            raise ValueError(
                "Passwords do not match"
            )

        return value


class SignInSchema(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"