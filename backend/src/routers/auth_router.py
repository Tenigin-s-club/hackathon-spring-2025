import datetime
from uuid import UUID

from fastapi import (APIRouter, HTTPException, Request, Response,
                     status)

from src.config import settings
from src.repositories.auth_repository import AuthRepository
from src.schemas.auth_schema import SLogin, SRegister, SUser
from src.utils.security.password import check_password, encode_password
from src.utils.security.token import decode as decode_jwt
from src.utils.security.token import encode as encode_jwt

router = APIRouter(
    prefix='/auth',
    tags=['Auth']
)


@router.get('/me')
async def me(request: Request) -> SUser:
    user = await AuthRepository.find_by_id_or_none(request.state.user_id)
    return SUser(roles=request.state.user_roles, **user)


@router.post('/register', status_code=status.HTTP_201_CREATED)
async def register(data: SRegister) -> None:
    data.password = encode_password(data.password)
    await AuthRepository.create(**data.model_dump())


@router.post('/login')
async def login(response: Response, data: SLogin) -> None:
    user_credential = await AuthRepository.find_by_email_or_none(data.email)
    if not user_credential or not check_password(data.password, user_credential.password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'invalid password or email')

    user_roles = await AuthRepository.find_roles_by_user_id(user_credential.id)
    checked_user = await AuthRepository.find_is_user_checked(user_credential.id)
    if not checked_user:
        raise HTTPException(status.HTTP_403_FORBIDDEN, 'activate account')

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
        expires=(now + settings.auth.access_exp),
        samesite=None,
    )
    response.set_cookie(
        settings.auth.cookie_refresh,
        refresh_token,
        httponly=True,
        expires=(now + settings.auth.refresh_exp),
        samesite=None,
    )


@router.post('/refresh')
async def refresh(request: Request, response: Response) -> None:
    refresh_token = request.cookies.get(settings.auth.cookie_refresh)
    try:
        pyload = await decode_jwt(refresh_token.encode())
    except Exception as e:
        print(e)
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, 'token timeout')

    sub = pyload['sub']
    user_roles = await AuthRepository.find_roles_by_user_id(UUID(sub))
    checked_user = await AuthRepository.find_is_user_checked(UUID(sub))
    if not checked_user:
        raise HTTPException(status.HTTP_403_FORBIDDEN, 'your account is not activated')

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
        samesite=None,
        expires=(now + settings.auth.access_exp))
    response.set_cookie(
        settings.auth.cookie_refresh,
        refresh_token,
        httponly=True,
        samesite=None,
        expires=(now + settings.auth.refresh_exp))


@router.post('/logout', status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response) -> None:
    response.delete_cookie(settings.auth.cookie_access)
    response.delete_cookie(settings.auth.cookie_refresh)


@router.delete('/delete_user/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(id: UUID) -> None:
    await AuthRepository.delete(id)
