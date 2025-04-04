import uuid

from sqlalchemy import insert, select, delete

from src.database.config import async_session_factory
from src.database.models import Role
from src.database.models.user_role import UserRole
from src.schemas.auth_schema import SRegister
from src.database.models.user import User


class AuthRepository:
    model = User

    async def get_user(self, user_id: uuid.UUID) -> dict:
        async with async_session_factory() as session:
            query = select(self.model.id, self.model.email, self.model.fio).where(self.model.id == user_id)

            data = await session.execute(query)

            return data.mappings().first()

    async def create_user(self, user: SRegister):
        async with async_session_factory() as session:
            query = insert(self.model).values(**user.model_dump())

            await session.execute(query)
            await session.commit()

    async def get_user_id(self, user_email: str) -> dict:
        async with async_session_factory() as session:
            query = select(self.model.id, self.model.password).where(self.model.email == user_email)

            user_id = await session.execute(query)

            return user_id.mappings().first()


    async def check_valid_user(self, user_id: uuid.UUID) -> bool:
        async with async_session_factory() as session:
            query = select(self.model.checked).where(self.model.id == user_id)

            user_status = await session.execute(query)

            return user_status.scalar()


    async def delete_user(self, user_id: uuid.UUID):
        async with async_session_factory() as session:
            query = delete(self.model).where(self.model.id == user_id)
            await session.execute(query)
            await session.commit()


    async def get_user_roles(self, user_id: uuid.UUID) -> list[str]:
        async with async_session_factory() as session:
            query = (select(Role.name)
                     .join(UserRole, Role.id == UserRole.role_id)
                     .where(UserRole.user_id == user_id))

            role_ids = await session.execute(query)

            return role_ids.scalars().all()