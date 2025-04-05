from datetime import datetime
from typing import Callable

from src.config import settings
from src.utils.security.token import decode as decode_jwt
from fastapi import FastAPI, status, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from uuid import UUID

from src.routers import routers_list
from src.permissions import check_permission
from src.permissions import ROLE_PERMISSIONS, Permissions

app = FastAPI(root_path='/api')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[f'http://localhost:5173', 'http://localhost'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

for router in routers_list:
    app.include_router(router)
'''member_union, member_comitet, - только голосует в свей касте 
admin - не может голосовать(может если он еще и секретарь)
, secretar, corporative_secretar - подписи в конце, могут голосовать и смотреть
guest - может только смотреть, прошедшие
'''

@app.middleware("http")
async def security_middleware(request: Request, handler: Callable):
    try:
        public_paths = [
            '/docs',
            '/api/openapi.json',
            '/api/auth/login',
            '/api/auth/register',
            '/api/auth/refresh',
            '/api/auth/me'
        ]

        if request.url.path in public_paths:
            return await handler(request)

        token = request.cookies.get(settings.auth.cookie_access)

        if not token:
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED,
                                content={'detail': 'Unauthorized'})

        try:
            payload = await decode_jwt(token)
            request.state.user_roles = payload.get("roles", [])
            request.state.user_id = payload.get("sub")

            request.state.permissions = []
            for role in request.state.user_roles:
                request.state.permissions.extend(ROLE_PERMISSIONS.get(role, []))

        except Exception:
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED,
                                content={'detail': 'Unauthorized'})

        return await handler(request)

    except Exception:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal Server Error"}
        )


class SRegister(BaseModel):
    email: str
    fio: str
    password: str


class SLogin(BaseModel):
    email: str
    password: str


class SConfirm(BaseModel):
    roles: list[str]


class SQuestion(BaseModel):
    title: str
    material: UploadFile = File(...)


class SMeeting(BaseModel):
    voting_datetime: datetime
    place: str
    is_internal: bool
    counter: UUID
    questions: list[SQuestion]


class SVote(BaseModel):
    # -1, 0 and 1
    choice: int





@app.get('/admin/unverified_users')
@check_permission(Permissions.SOSAT)
async def get_all_users(request: Request):
    return [
        {
            'id': 'o5dgfjljfds',
            'email': 'i_ebal_egora@dolboeb.ru',
            'fio': 'Who Are You'
        },
        {
            'id': 'gdpou0djdifhv',
            'email': 'hackathon@pizdec.help',
            'fio': 'I Am Gay'
        }
    ]


@app.get('/admin/verified_users')
async def get_all_users(request: Request):
    return [
        {
            'id': 'o5dgfjljfds',
            'email': 'i_ebal_egora@dolboeb.ru',
            'fio': 'Who Are You',
            'role': ['admin']
        },
        {
            'id': 'gdpou0djdifhv',
            'email': 'hackathon@pizdec.help',
            'fio': 'I Am Gay',
            'role': ['member_union', 'member_comitet']
        }
    ]


@app.post('/admin/confirm_user/{id}', status_code=status.HTTP_200_OK)
def confirm_user(id: UUID, data: SConfirm):
    # change checked = True
    return None


@app.post('/admin/disconfirm_user/{id}', status_code=status.HTTP_200_OK)
def confirm_user(id: UUID):
    # DELETE FUCKING ZAYABKA
    return None


@app.get('/admin/export_users')
def export_users():
    return None


@app.get('/me')
def me():
    # if not checked = 401
    return {
        'email': 'idk@idk.com',
        'first_name': 'who',
        'middle_name': 'are',
        'last_name': 'you',
        # can be member_union, member_comitet, admin, secretar, corporative_secretar
        'role': ['admin', 'secretar'],
    }



@app.get('/meetings/')
def get_all_meetings():
    # check token
    return [
        {
            'id': 52,
            'voting_datetime': '2022-02-24T05:00:00Z',
            'end_datetime': '2022-02-24T12:00:00Z',
            'place': 'Ростов-На-Дону, площадь Хз, дом 1',
            # очное ли
            'is_internal': True,
            'protocol_datetime': '2022-02-25T05:00:00Z',
            # active, completed and future
            'status': 'future',
        },
        {
            'id': 42,
            'voting_datetime': '2025-02-24T05:00:00Z',
            'end_datetime': '2022-02-24T12:00:00Z',
            'place': 'Ростов Великий, площадь Хз, дом 1',
            # очное ли
            'is_internal': False,
            'protocol_datetime': None,
            'status': 'completed',
        }
    ]


# сделать норм
@app.get('/meetings/{id}')
def get_meeting(id: UUID, status: str):
    if status not in ['active', 'completed', 'future']:
        return 'Met Egora is dead'
    # check token
    return {
        'id': id,
        'voting_datetime': '24.02.2022T05:00Z',
        'end_datetime': '2022-02-24T12:00:00Z',
        'place': 'Ростов-На-Дону, площадь Хз, дом 1',
        # очное ли
        'is_internal': True,
        'protocol_datetime': '25.02.2022T00:00Z',
        'voters': ['Who Are You', 'I Am Gay'],
        'counter': 'Who Are You',
        'questions': [
            {
                'id': 'gkfghrihry889',
                'title': 'What do you do?',
            },
            {
                'id': '400u9y0840ig9rir',
                'title': 'Do you suck big dick?',
            }
        ]
    }


@app.get('/meetings/questions/{id}')
def get_question(id: UUID):
    # check token, is ended
    return {
        'id': id,
        'title': 'What do you do?',
        'solution': 'Idk, pls help me, i want to sleep',
        'materials': [
            {
                'title': 'idk.docx',
                'url': 'https://yandex.ru'
            },
            {
                'title': 'wtf.docx',
                'url': 'https://google.com'
            },
        ]
    }


@app.post('/meetings/', status_code=status.HTTP_201_CREATED)
def create_meeting(data: SMeeting):
    return {
        'id': 42,
        'voting_datetime': '2025-02-24T05:00:00Z',
        'end_datetime': '2022-02-24T12:00:00Z',
        'place': 'Ростов Великий, площадь Хз, дом 1',
        # очное ли
        'is_internal': False,
        'protocol_datetime': None,
        'questions': 69
    }


# переголосование?????
@app.post('/meetings/questions/{id}', status_code=status.HTTP_201_CREATED)
def vote(status: SVote):
    if status['choice'] not in [-1, 0, 1]:
        return 'Egor idi nahui'
    return None


@app.post('/meetings/{id}/sign', status_code=status.HTTP_201_CREATED)
def sign_meeting(id: UUID):
    # check role
    return None
