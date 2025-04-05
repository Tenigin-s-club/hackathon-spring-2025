import uuid

from sqlalchemy import text
from sqlalchemy.orm import mapped_column, Mapped

from src.database.config import Base

class Role(Base):
    __tablename__ = 'role'

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, server_default=text('uuid_generate_v4()'))
    name: Mapped[str]
