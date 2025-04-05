from pydantic import BaseModel
from uuid import UUID


class SRegister(BaseModel):
    email: str
    fio: str
    password: str

class SLogin(BaseModel):
    email: str
    password: str

class SUser(BaseModel):
    id: UUID
    fio: str
    email: str
    roles: list[str]
