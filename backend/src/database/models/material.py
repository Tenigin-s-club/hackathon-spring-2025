import uuid
from datetime import datetime

from sqlalchemy import text, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from src.database.config import Base

class Material(Base):
    __tablename__ = 'material'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    url: Mapped[str]
    question_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('question.id'))
    question: Mapped["Question"] = relationship(back_populates="materials")
