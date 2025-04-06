from uuid import UUID

from src.database.config import async_session_factory
from src.database.models import User, UserRole, Role
from sqlalchemy import select, insert, delete, update


class AdminRepository:
    model = User

    async def get_all_users(self, verification: bool = False) -> list[dict]:
        async with async_session_factory() as session:
            query = select(self.model.id, self.model.fio, self.model.email).where(self.model.checked == verification)
            data = await session.execute(query)

            return data.mappings().all()

    async def add_roles_user(self, id: UUID, roles: list[str]):
        async with async_session_factory() as session:

            for role in roles:
                query = select(Role.id).where(Role.name == role)
                result = await session.execute(query)
                query = insert(UserRole).values(user_id=id, role_id=result.scalar())
                await session.execute(query)
                query = update(User).where(User.id == id).values(checked=True)

            await session.commit()
            return

    async def delete_user(self, id: UUID):
        async with async_session_factory() as session:
            query = delete(self.model).where(self.model.id == id)
            await session.execute(query)

            await session.commit()
            return