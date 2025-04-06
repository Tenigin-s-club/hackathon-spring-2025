from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from src.schemas.question_schema import SOutputQuestion


class SInputMeeting(BaseModel):
    voting_datetime: datetime
    end_datetime: datetime
    place: str
    is_internal: bool
    counter: str


class SShortlyMeeting(BaseModel):
    id: int
    voting_datetime: datetime
    end_datetime: datetime
    place: str
    is_internal: bool
    protocol_datetime: datetime | None


class SVoter(BaseModel):
    fio: str
    # for ORM
    model_config = ConfigDict(from_attributes=True)


class SFullMeeting(BaseModel):
    id: int
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