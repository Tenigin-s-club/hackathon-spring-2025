import uuid


from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import ForeignKey

from src.database.config import Base


class UserMeeting(Base):
    __tablename__ = "user_meeting"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id'))
    meeting_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('meeting.id'))
    user: Mapped["User"] = relationship(back_populates="meeting_associations")
    meeting: Mapped["Meeting"] = relationship(back_populates="user_associations")
