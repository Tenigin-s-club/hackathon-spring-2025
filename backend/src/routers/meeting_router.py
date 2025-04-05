import aiofiles
from fastapi import APIRouter, status, Form, UploadFile, File
from uuid import UUID

from src.repositories.question_repository import QuestionsRepository
from src.schemas.meeting_schema import SInputMeeting
from src.repositories.meeting_repository import MeetingRepository

router = APIRouter(
    prefix='/meetings',
    tags=['Meetings']
)


@router.get('')
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


@router.post('', status_code=status.HTTP_201_CREATED)
async def create_meeting(data: SInputMeeting):
    meeting_id = await MeetingRepository.create(**data.model_dump())
    return {'meeting_id': meeting_id}


@router.post('/{id}/question', status_code=status.HTTP_201_CREATED)
async def create_meeting(title: str = Form(), description: str = Form(), materials: list[UploadFile] = File(...)):
    folder_path = 'materials/'
    urls = []
    for material in materials:
        file_path = folder_path + material.filename
        async with aiofiles.open(file_path, 'wb') as file:
            content = await material.read()
            await file.write(content)
        urls.append(file_path)
    await QuestionsRepository.create(title=title, description=description, materials=urls)


@router.post('/{id}/sign', status_code=status.HTTP_201_CREATED)
def sign_meeting(id: UUID):
    # check role
    return None
