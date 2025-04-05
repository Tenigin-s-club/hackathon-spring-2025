import uuid
from datetime import datetime

from sqlalchemy import text, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from src.database.config import Base

class Question(Base):
    __tablename__ = 'question'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    title: Mapped[str]
    description: Mapped[str]
    solution: Mapped[str] = mapped_column(default='')
    meeting_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('meeting.id'))
    meeting: Mapped["Meeting"] = relationship(back_populates="questions")
    materials: Mapped[list["Material"]] = relationship(back_populates="question")
