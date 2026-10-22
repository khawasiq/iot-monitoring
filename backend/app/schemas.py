from pydantic import BaseModel, Field, EmailStr

class Signup(BaseModel):
    first_name: str = Field(min_length=1)
    last_name: str = Field(min_length=1)
    email: EmailStr
    password: str = Field(min_length=8)

class Signin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)

class HomeCreate(BaseModel):
    user_id: int
    name: str = Field(min_length=1, max_length=50)
class CreateLocation(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    user_id: int