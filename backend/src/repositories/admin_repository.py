from src.database.config import async_session_factory
from src.database.models import User
from sqlalchemy import select


class AdminRepository:
    model = User

    async def get_all_users(self, verification: bool = False) -> list[dict]:
        async with async_session_factory() as session:
            query = select(self.model.id, self.model.fio, self.model.email).where(self.model.checked == verification)
            data = await session.execute(query)

            return data.mappings().all()
