from fastapi import APIRouter, Request, Depends

from src.permissions import check_permission, Permissions
from src.repositories.admin_repository import AdminRepository
from src.schemas.admin_schema import SUsersBasic

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
# @app.get('/admin/verified_users')
# async def get_all_users(request: Request):
#     return [
#         {
#             'id': 'o5dgfjljfds',
#             'email': 'i_ebal_egora@dolboeb.ru',
#             'fio': 'Who Are You',
#             'role': ['admin']
#         },
#         {
#             'id': 'gdpou0djdifhv',
#             'email': 'hackathon@pizdec.help',
#             'fio': 'I Am Gay',
#             'role': ['member_union', 'member_comitet']
#         }
#     ]
#
#
# @app.post('/admin/confirm_user/{id}', status_code=status.HTTP_200_OK)
# def confirm_user(id: UUID, data: SConfirm):
#     # change checked = True
#     return None
#
#
# @app.post('/admin/disconfirm_user/{id}', status_code=status.HTTP_200_OK)
# def confirm_user(id: UUID):
#     # DELETE FUCKING ZAYABKA
#     return None
#
#
# @app.get('/admin/export_users')
# def export_users():
#     return None
