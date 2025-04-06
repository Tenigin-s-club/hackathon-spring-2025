from uuid import UUID

from sqlalchemy import delete, insert, select, update

from src.database.config import async_session_factory
from src.database.models import Role, User, UserRole


class AdminRepository:
    @staticmethod
    async def find_all_users(verification: bool = False) -> list[dict]:
        async with async_session_factory() as session:
            query = select(User.id, User.fio, User.email).where(User.checked == verification)
            result = await session.execute(query)
            return result.mappings().all()

    @staticmethod
    async def add_roles_user(id: UUID, roles: list[str]) -> None:
        async with async_session_factory() as session:
            for role in roles:
                query = select(Role.id).where(Role.name == role)
                result = await session.execute(query)
                
                query = insert(UserRole).values(user_id=id, role_id=result.scalar())
                await session.execute(query)
                
                query = update(User).where(User.id == id).values(checked=True)
                await session.execute(query)
            await session.commit()

    @staticmethod
    async def delete_user(id: UUID) -> None:
        async with async_session_factory() as session:
            query = delete(User).where(User.id == id)
            await session.execute(query)
            await session.commit()
