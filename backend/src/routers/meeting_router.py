from logging import getLogger
from uuid import UUID

from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi import status as fastapi_status, Depends

from src.repositories.meeting_repository import MeetingRepository
from src.repositories.question_repository import QuestionsRepository
from src.schemas.meeting_schema import SInputMeeting, SShortlyMeeting
from src.utils.storage.storage import Storage
from src.utils.notification.mail import Mail

router = APIRouter(
    prefix='/meetings',
    tags=['Meetings']
)


@router.get('')
async def get_all_meetings(status: str) -> list[SShortlyMeeting]:
    if status not in ['active', 'completed', 'future']:
        raise HTTPException(fastapi_status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "you can only use 'active', 'completed' and 'future' statuses")
    result = await MeetingRepository.find_all(status)
    return result


@router.get('/{id}')
async def get_meeting(id: int):
    result = await MeetingRepository.find_by_id_or_none(id)
    if not result:
        raise HTTPException(fastapi_status.HTTP_404_NOT_FOUND,
                            "meeting with this ID is not found")
    return result


@router.post('', status_code=fastapi_status.HTTP_201_CREATED)
async def create_meeting(data: SInputMeeting, mail: Mail = Depends(Mail)) -> int:
    meeting_id = await MeetingRepository.create(**data.model_dump())

    await mail.send_meeting_documentation(data.voting_datetime.time(), data.voting_datetime.date())

    return meeting_id


@router.post('/{id}/question', status_code=fastapi_status.HTTP_201_CREATED)
async def create_question(id: int, title: str, description: str, file: list[UploadFile] = File(...)) -> None:
    urls = []
    storage = Storage()
    for material in file:
        storage.put_file(material.filename, material.file)
        urls.append(material.filename)
    await QuestionsRepository.create(meeting_id=id, title=title, description=description, materials=urls)


@router.post('/{id}/sign', status_code=fastapi_status.HTTP_201_CREATED)
def sign_meeting(id: int) -> None:
    return None
