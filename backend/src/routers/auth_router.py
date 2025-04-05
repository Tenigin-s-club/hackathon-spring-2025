import datetime
import uuid

from fastapi import APIRouter, Response, Depends, HTTPException, status, Request

from src.models.auth_model import SRegister, SLogin
from src.repositories.auth_repository import AuthRepository
from src.utils.security.password import encode_password, check_password
from src.utils.security.token import encode as encode_jwt
from src.utils.security.token import decode as decode_jwt
from src.config import settings

router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)


@router.post('/register', status_code=201)
async def register(data: SRegister, repository: AuthRepository = Depends(AuthRepository)):
    data.password = encode_password(data.password)
    await repository.create_user(data)

    return


@router.post('/login')
async def login(response: Response, data: SLogin, repository: AuthRepository = Depends(AuthRepository)):
    user_credential = await repository.get_user_id(data.email)
    if not user_credential:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'invalid password or email')
    elif not check_password(data.password, user_credential.password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'invalid password or email')

    user_roles = await repository.get_user_roles(user_credential.id)

    checked_user = await repository.check_valid_user(user_credential.id)
    if not checked_user:
        raise HTTPException(status.HTTP_403_FORBIDDEN, 'activate account')

    # оно дублируется но мне похуй, если хочешь можешь исправить, егор предложил создать файл helpers.py
    payload = {
        'sub': str(user_credential.id),
        'roles': user_roles
    }

    access_token = await encode_jwt(settings.auth.type_token.access, payload)
    refresh_token = await encode_jwt(settings.auth.type_token.refresh, payload)

    now = datetime.datetime.now(datetime.UTC)
    response.set_cookie(
        settings.auth.cookie_access,
        access_token,
        expires=(now + settings.auth.access_exp))
    response.set_cookie(
        settings.auth.cookie_refresh,
        refresh_token,
        httponly=True,
        expires=(now + settings.auth.refresh_exp))

    return


@router.post('/refresh')
async def refresh(request: Request, response: Response, repository: AuthRepository = Depends(AuthRepository)):
    refresh_token = request.cookies.get(settings.auth.cookie_refresh)

    try:
        pyload = await decode_jwt(refresh_token.encode())

    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'token timeout')

    sub = pyload['sub']

    user_roles = await repository.get_user_roles(uuid.UUID(sub))
    checked_user = await repository.check_valid_user(uuid.UUID(sub))
    if not checked_user:
        raise HTTPException(status.HTTP_403_FORBIDDEN, 'activate account')

    payload = {
        'sub': sub,
        'roles': user_roles
    }

    access_token = await encode_jwt(settings.auth.type_token.access, payload)
    refresh_token = await encode_jwt(settings.auth.type_token.refresh, payload)

    now = datetime.datetime.now(datetime.UTC)
    response.set_cookie(
        settings.auth.cookie_access,
        access_token,
        expires=(now + settings.auth.access_exp))
    response.set_cookie(
        settings.auth.cookie_refresh,
        refresh_token,
        httponly=True,
        expires=(now + settings.auth.refresh_exp))

    return




