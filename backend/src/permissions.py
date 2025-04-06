from functools import wraps
from typing import Callable

from fastapi import HTTPException, Request, status


class Permissions:
    VIEW_UNVERIFIED_USERS = "users:unverified:view"
    VIEW_VERIFIED_USERS = "users:verified:view"
    MANAGE_USERS = "users:manage"
    EXPORT_DATA = "data:export"
    VIEW_OWN_PROFILE = "profile:view"

    VIEW_MEETINGS = "meetings:view"
    CREATE_MEETINGS = "meetings:create"
    VIEW_MEETING_DETAILS = "meetings:details:view"
    VIEW_QUESTIONS = "questions:view"
    VOTE = "vote:create"
    SIGN_PROTOCOLS = "protocols:sign"
    SOSAT = "do:sosat"


ROLE_PERMISSIONS = {
    "member_union": [
        Permissions.VIEW_OWN_PROFILE,
        Permissions.VIEW_MEETINGS,
        Permissions.VIEW_MEETING_DETAILS,
        Permissions.VOTE
    ],
    "member_comitet": [
        Permissions.VIEW_OWN_PROFILE,
        Permissions.VIEW_MEETINGS,
        Permissions.VIEW_MEETING_DETAILS,
        Permissions.VOTE
    ],
    "admin": [
        Permissions.VIEW_UNVERIFIED_USERS,
        Permissions.VIEW_VERIFIED_USERS,
        Permissions.MANAGE_USERS,
        Permissions.EXPORT_DATA,
        Permissions.VIEW_OWN_PROFILE,
        Permissions.VIEW_MEETINGS,
        Permissions.CREATE_MEETINGS
    ],
    "secretar": [
        Permissions.VIEW_OWN_PROFILE,
        Permissions.VIEW_MEETINGS,
        Permissions.CREATE_MEETINGS,
        Permissions.VIEW_MEETING_DETAILS,
        Permissions.VIEW_QUESTIONS,
        Permissions.VOTE,
        Permissions.SIGN_PROTOCOLS
    ],
    "corporative_secretar": [
        Permissions.VIEW_OWN_PROFILE,
        Permissions.VIEW_MEETINGS,
        Permissions.CREATE_MEETINGS,
        Permissions.VIEW_MEETING_DETAILS,
        Permissions.VIEW_QUESTIONS,
        Permissions.VOTE,
        Permissions.SIGN_PROTOCOLS
    ],
    "guest": [
        Permissions.VIEW_MEETINGS
    ]
}


def check_permission(required_permission: str):
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            if not hasattr(request.state, 'permissions'):
                raise HTTPException(status.HTTP_401_UNAUTHORIZED)
            if required_permission not in request.state.permissions:
                raise HTTPException(status.HTTP_403_FORBIDDEN)
            return await func(request, *args, **kwargs)
        return wrapper
    return decorator