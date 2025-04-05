import aiofiles
from fastapi import APIRouter, status
from uuid import UUID
from src.schemas.meeting_schema import SInputMeeting, SCreateMeeting
from src.repositories.meeting_repository import MeetingRepository
from src.schemas.question_schema import SCreateQuestion

router = APIRouter(
    prefix='/meetings',
    tags=['Meetings']
)


@router.get('/')
async def get_all_meetings(status: str):
    if status not in ['active', 'completed', 'future']:
        # сделать норм ошибку
        return 'Met Egora is dead'
    # check token
    result = await MeetingRepository.find_all(status=status)
    return result


@router.get('/{id}')
async def get_meeting(id: UUID):
    # check token
    result = await MeetingRepository.find_by_id_or_none(id)
    if not result:
        return 'Egor pidor'
    return result


@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_meeting(data: SInputMeeting):
    meeting = SCreateMeeting(questions=[], **data.model_dump(exclude={'questions'}))

    folder_path = 'materials/'
    for question in data.questions:
        schema = SCreateQuestion(materials=[], **question.model_dump(exclude={'materials'}))
        for material in question.materials:
            file_path = folder_path + material.filename
            async with aiofiles.open(file_path, 'wb') as file:
                content = await file.read()
                await file.write(content)
            schema.materials.append(file_path)
        meeting.questions.append(schema)

    meeting_id = await MeetingRepository.create(**meeting.model_dump())
    return {
        'id': meeting_id,
        'questions': len(data.questions),
        **data.model_dump(exclude={'questions'})
    }


@router.post('/{id}/sign', status_code=status.HTTP_201_CREATED)
def sign_meeting(id: UUID):
    # check role
    return None
