from uuid import UUID

from fastapi import APIRouter, Request, Depends, status

from src.permissions import check_permission, Permissions
from src.repositories.admin_repository import AdminRepository
from src.schemas.admin_schema import SUsersBasic, SConfirm

router = APIRouter(
    prefix='/admin',
    tags=['Admin']
)


@router.get('/unverified_users')
@check_permission(Permissions.MANAGE_USERS)
async def get_all_un_verification_users(
        request: Request,
        repository: AdminRepository = Depends(AdminRepository)
) -> list[SUsersBasic]:
    users = await repository.get_all_users()

    return [SUsersBasic(**row) for row in users]

@router.get('/verified_users')
@check_permission(Permissions.MANAGE_USERS)
async def get_verification_users(
        request: Request,
        repository: AdminRepository = Depends(AdminRepository)
) -> list[SUsersBasic]:
    users = await repository.get_all_users(True)

    return [SUsersBasic(**row) for row in users]


@router.post('/confirm_user/{id}')
@check_permission(Permissions.MANAGE_USERS)
async def confirm_user(
        request: Request,
        id: UUID,
        data: SConfirm,
        repository: AdminRepository = Depends(AdminRepository)
):
    await repository.add_roles_user(id, data.roles)
    return

@router.delete('/disconfirm_user/{id}', status_code=status.HTTP_204_NO_CONTENT)
@check_permission(Permissions.MANAGE_USERS)
async def un_confirm_user(
        request: Request,
        id: UUID,
        repository: AdminRepository = Depends(AdminRepository)
):
    await repository.delete_user(id)
    return

@router.get('/admin/export_users')
@check_permission(Permissions.MANAGE_USERS)
async def export_users(request: Request):
    return "sosi huy"
