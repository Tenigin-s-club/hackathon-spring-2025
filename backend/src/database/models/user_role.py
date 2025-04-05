import uuid


from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import ForeignKey

from src.database.config import Base


class UserRole(Base):
    __tablename__ = "user_role"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('user.id'))
    role_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('role.id'))