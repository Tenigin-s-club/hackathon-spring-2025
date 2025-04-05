from fastapi import APIRouter, status
from src.repositories.question_repository import QuestionsRepository
from uuid import UUID
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


# переголосование?????
@router.post('/vote/{id}', status_code=status.HTTP_201_CREATED)
def vote(status: SVote):
    if status['choice'] not in [-1, 0, 1]:
        return 'Egor idi nahui'
    return None
