import uuid
from datetime import datetime

from sqlalchemy import text, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped

from src.database.config import Base

class Question(Base):
    __tablename__ = 'question'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    title: Mapped[str]
    solution: Mapped[str]
    place: Mapped[str]
    is_internal: Mapped[bool]
    protocol_datetime: Mapped[datetime | None]
    counter: Mapped[str]
    meeting_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('meeting.id'))
