import uuid

from sqlalchemy import text
from sqlalchemy.orm import mapped_column, Mapped, relationship

from src.database.config import Base


class User(Base):
    __tablename__ = 'user'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    fio: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[bytes]
    checked: Mapped[bool] = mapped_column(default=False)
    meetings: Mapped[list["Meeting"]] = relationship(secondary="user_meeting", back_populates="users", viewonly=True)
    meeting_associations: Mapped[list["UserMeeting"]] = relationship(back_populates="user")
