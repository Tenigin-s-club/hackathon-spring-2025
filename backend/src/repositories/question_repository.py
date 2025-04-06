from uuid import UUID

from sqlalchemy import insert, select, func, and_
from sqlalchemy.orm import selectinload

from src.database.config import async_session_factory
from src.database.models import Material, Vote
from src.database.models.question import Question
from src.schemas.question_schema import SOutputFullQuestion, SQuestionResult, SQuestionVoteResult
from src.utils.storage.storage import Storage


class QuestionsRepository:
    @staticmethod
    async def find_by_id_or_none(id: UUID):
        async with async_session_factory() as session:
            query = (select(Question)
                     .options(selectinload(Question.materials))
                     .where(Question.id == id))
            result = await session.execute(query)
            question = SOutputFullQuestion.model_validate(result.scalars().one_or_none())
            storage = Storage()
            return {'materials': [storage.generate_url(material.url) for material in question.materials], **question.model_dump(exclude={'materials'})}

    @staticmethod
    async def create(**values) -> None:
        async with async_session_factory() as session:
            materials = values.pop('materials')
            query = insert(Question).values(**values).returning(Question.id)
            question = await session.execute(query)
            question_id = question.scalar()
            for material in materials:
                query = insert(Material).values(
                    question_id=question_id,
                    url=material
                )
                await session.execute(query)
            await session.commit()

    @staticmethod
    async def get_votes(question_id: int) -> SQuestionVoteResult:
        async with async_session_factory() as session:
            query_agree = select(func.count(Vote.id)).where(and_(Vote.answer == 1, Vote.question_id == question_id))
            query_disagree = select(func.count(Vote.id)).where(Vote.answer == -1, Vote.question_id == question_id)
            agree_res = await session.execute(query_agree)
            disagree_res = await session.execute(query_disagree)

            return SQuestionVoteResult(
                agree = agree_res.scalar(),
                disagree = disagree_res.scalar()
            )
