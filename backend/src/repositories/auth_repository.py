from uuid import UUID

from sqlalchemy import delete, insert, select

from src.database.config import async_session_factory
from src.database.models import Role
from src.database.models.user import User
from src.database.models.user_role import UserRole


class AuthRepository:
    @staticmethod
    async def find_by_id_or_none(id: UUID) -> dict | None:
        async with async_session_factory() as session:
            query = select(User.id, User.email, User.fio).where(User.id == id)
            result = await session.execute(query)
            return result.mappings().one_or_none()

    @staticmethod
    async def find_by_email_or_none(email: str) -> dict:
        async with async_session_factory() as session:
            query = select(User.id, User.password).where(User.email == email)
            result = await session.execute(query)
            return result.mappings().one_or_none()

    @staticmethod
    async def create(**values) -> None:
        async with async_session_factory() as session:
            query = insert(User).values(**values)
            await session.execute(query)
            await session.commit()

    @staticmethod
    async def delete(id: UUID) -> None:
        async with async_session_factory() as session:
            query = delete(User).where(User.id == id)
            await session.execute(query)
            await session.commit()

    @staticmethod
    async def find_is_user_checked(id: UUID) -> bool:
        async with async_session_factory() as session:
            query = select(User.checked).where(User.id == id)
            result = await session.execute(query)
            return result.scalar()

    @staticmethod
    async def find_roles_by_user_id(id: UUID) -> list[str]:
        async with async_session_factory() as session:
            query = (select(Role.name)
                     .join(UserRole, Role.id == UserRole.role_id)
                     .where(UserRole.user_id == id))
            result = await session.execute(query)
            return result.scalars().all()

    @staticmethod
    async def all_users_email() -> list[str]:
        async with async_session_factory() as session:
            query = select(User.email)
            data = await session.execute(query)

            return data.scalars().all()
