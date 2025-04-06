from logging import getLogger
from uuid import UUID

from fastapi import APIRouter, Request, status

from src.permissions import Permissions, check_permission
from src.repositories.admin_repository import AdminRepository
from src.repositories.auth_repository import AuthRepository
from src.schemas.admin_schema import SConfirm, SUsersBasic
from src.schemas.auth_schema import SUser

router = APIRouter(
    prefix='/admin',
    tags=['Admin']
)


@router.get('/verified_users')
@check_permission(Permissions.MANAGE_USERS)
async def get_verified_users(request: Request) -> list[SUser]:
    users = await AdminRepository.find_all_users(True)
    result = []
    for user in users:
        roles = await AuthRepository.find_roles_by_user_id(user["id"])
        result.append(SUser(roles=roles, **user))
    return result


@router.get('/unverified_users')
@check_permission(Permissions.MANAGE_USERS)
async def get_unverified_users(request: Request) -> list[SUsersBasic]:
    users = await AdminRepository.find_all_users()
    return [SUsersBasic(**row) for row in users]


@router.post('/confirm_user/{id}')
@check_permission(Permissions.MANAGE_USERS)
async def confirm_user(request: Request, id: UUID, data: SConfirm) -> None:
    await AdminRepository.add_roles_user(id, data.roles)


@router.delete('/disconfirm_user/{id}', status_code=status.HTTP_204_NO_CONTENT)
@check_permission(Permissions.MANAGE_USERS)
async def disconfirm_user(request: Request, id: UUID) -> None:
    await AdminRepository.delete_user(id)


@router.get('/admin/export_users')
@check_permission(Permissions.MANAGE_USERS)
async def export_users(request: Request):
    return "sosi huy"
