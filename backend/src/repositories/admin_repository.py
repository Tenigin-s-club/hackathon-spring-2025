from uuid import UUID

from src.database.config import async_session_factory
from src.database.models import User, UserRole
from sqlalchemy import select, insert, delete


class AdminRepository:
    model = User

    async def get_all_users(self, verification: bool = False) -> list[dict]:
        async with async_session_factory() as session:
            query = select(self.model.id, self.model.fio, self.model.email).where(self.model.checked == verification)
            data = await session.execute(query)

            return data.mappings().all()

    async def add_roles_user(self, id: UUID, roles_id: list[UUID]):
        async with async_session_factory() as session:

            for role in roles_id:
                query = insert(UserRole).values(user_id=id, role_id=role)
                await  session.execute(query)

            await session.commit()
            return

    async def delete_user(self, id: UUID):
        async with async_session_factory() as session:
            query = delete(self.model).where(self.model.id == id)
            await session.execute(query)

            await session.commit()
            return