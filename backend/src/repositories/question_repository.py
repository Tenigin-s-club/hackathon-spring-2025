from sqlalchemy import insert, select
from sqlalchemy.orm import selectinload
from uuid import UUID

from src.database.config import async_session_factory
from src.schemas.meeting_schema import SInputMeeting, SShortlyMeeting, SFullMeeting
from src.database.models.meeting import Meeting
from src.database.models.question import Question
from src.schemas.question_schema import SOutputQuestion


class QuestionsRepository:
    @staticmethod
    async def find_by_id_or_none(id: UUID):
        async with async_session_factory() as session:
            query = (select(Question)
                     # .options(selectinload(Question.materials))
                     .where(Question.id == id))
            result = await session.execute(query)
            meeting = SOutputQuestion.model_validate(result.scalars().one_or_none())
            return {**meeting.model_dump()}
