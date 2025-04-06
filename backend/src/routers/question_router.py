from uuid import UUID

from fastapi import APIRouter, HTTPException, Request, status

from src.repositories.question_repository import QuestionsRepository
from src.repositories.vote_repository import VotesRepository
from src.schemas.meeting_schema import SVote

router = APIRouter(
    prefix='/meetings/questions',
    tags=['Meeting questions']
)


@router.get('/{id}')
async def get_question(id: UUID):
    result = await QuestionsRepository.find_by_id_or_none(id)
    if not result:
        raise HTTPException(status.HTTP_404_NOT_FOUND, 'question with this ID is not found')
    return result


@router.post('/vote/{id}', status_code=status.HTTP_201_CREATED)
async def vote(request: Request, id: UUID, vote: SVote) -> None:
    if vote['choice'] not in [-1, 0, 1]:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY,
                            'you can only use -1 (disagree), 0 (abstain) and 1 (agree) in choice field')
    result = await VotesRepository.find_one_or_none(question_id=id, user_id=request.state.user_id)
    if not result:
        await VotesRepository.create(question_id=id, user_id=request.state.user_id, answer=vote['choice'])
    else:
        await VotesRepository.update(id=result['id'], answer=vote['choice'])
