import uuid

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database.config import Base


class Question(Base):
    __tablename__ = 'question'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    title: Mapped[str]
    description: Mapped[str]
    solution: Mapped[str] = mapped_column(default='')
    meeting_id: Mapped[int] = mapped_column(ForeignKey('meeting.id'))
    meeting: Mapped["Meeting"] = relationship(back_populates="questions")
    materials: Mapped[list["Material"]] = relationship(back_populates="question")
