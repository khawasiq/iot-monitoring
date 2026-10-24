from fastapi import APIRouter, HTTPException
from app.schemas import Signup, Signin
from app.database import users, password_hash

router = APIRouter()

@router.post("/signup")
def signup(signup_request: Signup):
    for user in users:
        if user["email"] == signup_request.email.lower():
            raise HTTPException(status_code=400, detail="Email already taken")
    new_user = {
        "id": len(users) + 1,
        "first_name": signup_request.first_name,
        "last_name": signup_request.last_name,
        "email": signup_request.email.lower(),
        "encrypted_password": password_hash.hash(signup_request.password),
    }
    users.append(new_user)
    return {"message": "User created", "id": new_user["id"]}

@router.post("/signin")
def signin(signin_request: Signin):
    for user in users:
        if user["email"] == signin_request.email.lower():
            if password_hash.verify(signin_request.password, user["encrypted_password"]):
                return {
                    "id": user["id"],
                    "first_name": user["first_name"],
                    "email": user["email"],
                }
            break
    raise HTTPException(status_code=401, detail="Invalid email or password")
@router.get("/users/user_id")
def get_user(user_id: int):
    for user in users:
        if user["id"] == user_id:
            return {
                "id": user["id"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"]
            }
    raise HTTPException(status_code="404", detail="user not found")