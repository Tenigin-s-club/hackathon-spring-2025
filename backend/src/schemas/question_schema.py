from typing import Annotated

from pydantic import BaseModel, ConfigDict
from fastapi import UploadFile, File
from uuid import UUID


class SMaterial(BaseModel):
    url: str
    # for ORM
    model_config = ConfigDict(from_attributes=True)


class SInputQuestion(BaseModel):
    title: str
    description: str
    solution: str
    materials: Annotated[list[UploadFile], File(...)]


class SCreateQuestion(BaseModel):
    title: str
    description: str
    solution: str
    materials: list[str]


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
