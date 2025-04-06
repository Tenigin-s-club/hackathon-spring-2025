from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SMaterial(BaseModel):
    url: str
    # for ORM
    model_config = ConfigDict(from_attributes=True)


class SOutputQuestion(BaseModel):
    id: UUID
    title: str
    description: str
    solution: str
    # for ORM
    model_config = ConfigDict(from_attributes=True)


class SOutputFullQuestion(BaseModel):
    id: UUID
    title: str
    description: str
    solution: str
    materials: list[SMaterial]
    # for ORM
    model_config = ConfigDict(from_attributes=True)
