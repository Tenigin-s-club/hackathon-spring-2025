from fastapi import APIRouter, status, Request
from src.repositories.question_repository import QuestionsRepository
from uuid import UUID

from src.repositories.vote_repository import VotesRepository
from src.schemas.meeting_schema import SInputMeeting, SVote

router = APIRouter(
    prefix='/meetings/questions',
    tags=['Meeting questions']
)


@router.get('/{id}')
async def get_question(id: UUID):
    # check token, is ended
    result = await QuestionsRepository.find_by_id_or_none(id)
    if not result:
        return 'Egor pidor x2'
    return result


@router.post('/vote/{id}', status_code=status.HTTP_201_CREATED)
async def vote(request: Request, id: UUID, vote: SVote):
    if vote['choice'] not in [-1, 0, 1]:
        return 'Egor idi nahui'
    result = await VotesRepository.find_one_or_none(question_id=id, user_id=request.state.user_id)
    if not result:
        await VotesRepository.create(question_id=id, user_id=request.state.user_id, answer=vote['choice'])
    else:
        await VotesRepository.update(id=result['id'], answer=vote['choice'])
    return None
