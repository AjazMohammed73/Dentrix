from pydantic import EmailStr, Field

from .common import CamelModel
from .user import UserOut


class LoginRequest(CamelModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


class TokenResponse(CamelModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
