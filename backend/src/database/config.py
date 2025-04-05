from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from src.config import settings


class Base(DeclarativeBase):
    pass

async_engine = create_async_engine(settings.database.url, echo=False)
async_session_factory = async_sessionmaker(async_engine, expire_on_commit=False)

