import asyncio

from sqlalchemy.ext.asyncio import AsyncSession

from src.seeds.v1.data import roles_data, users_data, user_roles
from src.database.config import async_session_factory


async def seed_database(session: AsyncSession):
    session.add_all(roles_data)
    session.add_all(users_data)

    session.add_all(user_roles)

    await session.commit()


async def gen_seed():
    async with async_session_factory() as session:
        await seed_database(session)


if __name__ == "__main__":
    asyncio.run(gen_seed())
