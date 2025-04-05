
from fastapi import Request, HTTPException, status
from typing import Callable
from functools import wraps

def role_required(required_roles: list[str]):
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            token = request.cookies.get()

            try:


                if not any(role in user_roles for role in required_roles):
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="Insufficient permissions"
                    )

                request.state.user = payload
                return await func(request, *args, **kwargs)

            except Exception:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token"
                )
        return wrapper
    return decorator