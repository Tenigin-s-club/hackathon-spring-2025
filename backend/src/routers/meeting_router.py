from tabnanny import check

from fastapi import APIRouter, File, HTTPException, UploadFile, Request, status
from fastapi import status as fastapi_status, Depends, BackgroundTasks
from uuid import UUID

from src.permissions import check_permission, Permissions
from src.repositories.auth_repository import AuthRepository
from src.repositories.meeting_repository import MeetingRepository
from src.repositories.question_repository import QuestionsRepository
from src.schemas.meeting_schema import SInputMeeting, SShortlyMeeting
from src.schemas.question_schema import SQuestionResult, SOutputQuestion, SQuestionVoteResult
from src.utils.storage.storage import Storage
from src.utils.notification.mail import Mail

router = APIRouter(
    prefix='/meetings',
    tags=['Meetings']
)


@router.get('')
@check_permission(Permissions.VIEW_MEETINGS)
async def get_all_meetings(request: Request, status: str) -> list[SShortlyMeeting]:
    if status not in ['active', 'completed', 'future']:
        raise HTTPException(fastapi_status.HTTP_422_UNPROCESSABLE_ENTITY,
                            "you can only use 'active', 'completed' and 'future' statuses")
    result = await MeetingRepository.find_all(status)
    return result


@router.get('/{id}')
@check_permission(Permissions.VIEW_MEETINGS)
async def get_meeting(request: Request, id: int):
    result = await MeetingRepository.find_by_id_or_none(id)
    if not result:
        raise HTTPException(fastapi_status.HTTP_404_NOT_FOUND,
                            "meeting with this ID is not found")
    return result


@router.post('', status_code=fastapi_status.HTTP_201_CREATED)
@check_permission(Permissions.CREATE_MEETINGS)
async def create_meeting(
        request: Request,
        data: SInputMeeting,
        background_task: BackgroundTasks,
        mail: Mail = Depends(Mail),
        repo: AuthRepository = Depends(AuthRepository)
) -> int:
    meeting_id = await MeetingRepository.create(**data.model_dump())
    emails = await repo.all_users_email()
    background_task.add_task(
        mail.send_meeting_documentation,
        data.voting_datetime.time(),
        data.voting_datetime.date(),
        emails
    )

    return meeting_id


@router.post('/{id}/question', status_code=fastapi_status.HTTP_201_CREATED)
@check_permission(Permissions.CREATE_MEETINGS)
async def create_question(request: Request, id: int, title: str, description: str, file: list[UploadFile] = File(...)) -> None:
    urls = []
    storage = Storage()
    for material in file:
        storage.put_file(material.filename, material.file)
        urls.append(material.filename)
    await QuestionsRepository.create(meeting_id=id, title=title, description=description, materials=urls)


@router.post('/result/{id}')
@check_permission(Permissions.VIEW_VERIFIED_USERS)
async def get_meeting_result(request: Request, id: int) -> list[SQuestionResult]:
    global result
    result: list[SQuestionResult]
    question = await MeetingRepository.get_meetings_question(id)
    if not question:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
    print(question)

    for q in question:
        q_result = await QuestionsRepository.find_by_id_or_none(q.id)
        votes = await QuestionsRepository.get_votes(q.id)
        result.append(
            SQuestionResult(
                question=SOutputQuestion(
                    id=q_result.id,
                    title=q_result.title,
                    description=q_result.description,
                    solution=q_result.solution
                ),
                result=votes
            )
        )

    return result




@router.post('/{id}/sign', status_code=fastapi_status.HTTP_201_CREATED)
@check_permission(Permissions.WRITE_DOCS)
def sign_meeting(request: Request, id: int) -> None:
    return None
