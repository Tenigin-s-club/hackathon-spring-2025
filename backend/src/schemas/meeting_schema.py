from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from uuid import UUID
from src.schemas.question_schema import SInputQuestion, SOutputQuestion, SCreateQuestion


class SInputMeeting(BaseModel):
    voting_datetime: datetime
    end_datetime: datetime
    place: str
    is_internal: bool
    counter: UUID
    questions: list[SInputQuestion]


class SCreateMeeting(BaseModel):
    voting_datetime: datetime
    end_datetime: datetime
    place: str
    is_internal: bool
    counter: UUID
    questions: list[SCreateQuestion]


class SShortlyMeeting(BaseModel):
    id: UUID
    voting_datetime: datetime
    end_datetime: datetime
    place: str
    is_internal: bool
    protocol_datetime: datetime | None
    status: str


class SVoter(BaseModel):
    fio: str
    # for ORM
    model_config = ConfigDict(from_attributes=True)


class SFullMeeting(BaseModel):
    id: UUID
    voting_datetime: datetime
    end_datetime: datetime
    place: str
    is_internal: bool
    protocol_datetime: datetime | None
    counter: str
    # from another tables
    voters: list[SVoter] = Field(alias='users')
    questions: list[SOutputQuestion]
    # for ORM
    model_config = ConfigDict(from_attributes=True)


class SVote(BaseModel):
    # -1, 0 and 1
    choice: int