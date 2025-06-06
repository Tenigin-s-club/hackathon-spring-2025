import uuid

from sqlalchemy import CheckConstraint, ForeignKey, UniqueConstraint, text
from sqlalchemy.orm import Mapped, mapped_column

from src.database.config import Base


class Vote(Base):
    __tablename__ = 'vote'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id'))
    question_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('question.id'))
    answer: Mapped[int] = mapped_column(CheckConstraint("value BETWEEN -1 and 1"))
    UniqueConstraint('user_id', 'question_id')
