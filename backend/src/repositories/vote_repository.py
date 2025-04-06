from sqlalchemy import insert, select, update

from src.database.config import async_session_factory
from src.database.models.vote import Vote


class VotesRepository:
    @staticmethod
    async def find_one_or_none(**filter_by) -> dict:
        async with async_session_factory() as session:
            query = select(Vote).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().one_or_none()

    @staticmethod
    async def create(**values) -> None:
        async with async_session_factory() as session:
            query = insert(Vote).values(**values)
            await session.execute(query)
            await session.commit()

    @staticmethod
    async def update(id, **values) -> None:
        async with async_session_factory() as session:
            query = update(Vote).where(Vote.id == id).values(**values)
            await session.execute(query)
            await session.commit()
