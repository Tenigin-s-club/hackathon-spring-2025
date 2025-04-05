import uuid
from datetime import datetime

from sqlalchemy import text
from sqlalchemy.orm import mapped_column, Mapped, relationship

from src.database.config import Base

class Meeting(Base):
    __tablename__ = 'meeting'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    voting_datetime: Mapped[datetime]
    end_datetime: Mapped[datetime]
    place: Mapped[str]
    is_internal: Mapped[bool]
    protocol_datetime: Mapped[datetime | None]
    counter: Mapped[str]
    questions: Mapped[list["Question"]] = relationship(back_populates="meeting")
    users: Mapped[list["User"]] = relationship(secondary="user_meeting", back_populates="meetings", viewonly=True)
    user_associations: Mapped[list["UserMeeting"]] = relationship(back_populates="meeting")
