from sqlalchemy import insert, select
from sqlalchemy.orm import selectinload
from uuid import UUID

from src.database.config import async_session_factory
from src.database.models import Material
from src.schemas.meeting_schema import SInputMeeting, SShortlyMeeting, SFullMeeting
from src.database.models.meeting import Meeting
from src.database.models.question import Question


class MeetingRepository:
    @staticmethod
    async def find_all(**filter_by):
        async with async_session_factory() as session:
            query = select(Meeting.__table__.columns).filter_by(**filter_by)
            result = await session.execute(query)
            return [SShortlyMeeting(**elem) for elem in result.mappings().all()]

    @staticmethod
    async def find_by_id_or_none(id: UUID):
        async with async_session_factory() as session:
            query = (select(Meeting)
                     .options(selectinload(Meeting.questions))
                     .options(selectinload(Meeting.users))
                     .where(Meeting.id == id))
            result = await session.execute(query)
            meeting = SFullMeeting.model_validate(result.scalars().one_or_none())
            return {'voters': [voter.fio for voter in meeting.voters], **meeting.model_dump(exclude={'voters'})}

    @staticmethod
    async def create(**values) -> None:
        async with async_session_factory() as session:
            query = insert(Meeting).values(**values).returning(Meeting.id)
            meeting = await session.execute(query)
            return meeting.scalar()
