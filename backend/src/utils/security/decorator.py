from fastapi import Request, HTTPException, status
from typing import Optional, Callable
from functools import wraps

def check_roles(required_roles: Optional[list[str]] = None):
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            if not required_roles:
                return await func(request, *args, **kwargs)

            user_roles = getattr(request.state, 'user_roles', [])

            if not any(role in user_roles for role in required_roles):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail='Forbidden'
                )

            return await func(request, *args, **kwargs)

        return wrapper

    return decorator

