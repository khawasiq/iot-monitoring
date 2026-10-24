from fastapi import APIRouter
from app.schemas import CreateLocation
from app.database import homes

router = APIRouter()

@router.post("/register-home")
def register_home(data: CreateLocation):
    new_home = {
        "id": len(homes) + 1,
        "user_id": data.user_id,
        "name": data.name.strip(),
    }
    homes.append(new_home)
    return new_home
@router.get("/homes/{user_id}")
def get_homes(user_id: int):
    user_homes = []
    for home in homes:
        if home["user_id"] == user_id:
            user_homes.append(home)
    return user_homes;