import uuid

from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database.config import Base


class Material(Base):
    __tablename__ = 'material'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    url: Mapped[str]
    question_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('question.id'))
    question: Mapped["Question"] = relationship(back_populates="materials")
