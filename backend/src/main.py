from datetime import datetime

from fastapi import FastAPI, status, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from uuid import UUID

from src.router import routers_list

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
def get_all_users():
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
def get_all_users():
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
