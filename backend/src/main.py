from typing import Callable

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.config import settings
from src.permissions import ROLE_PERMISSIONS
from src.routers import routers_list
from src.utils.security.token import decode as decode_jwt


app = FastAPI(root_path='/api')
for router in routers_list:
    app.include_router(router)
'''
member_union, member_comitet - только голосует в свей касте 
admin - не может голосовать (может если он еще и секретарь)
secretar, corporative_secretar - подписи в конце, могут голосовать и смотреть
guest - может только смотреть, прошедшие
'''


@app.middleware('http')
async def security_middleware(request: Request, handler: Callable):
    try:
        public_paths = [
            '/docs',
            '/api/openapi.json',
            '/api/auth/login',
            '/api/auth/register',
            '/api/auth/refresh'
        ]
        if request.url.path in public_paths:
            return await handler(request)

        token = request.cookies.get(settings.auth.cookie_access)
        try:
            payload = await decode_jwt(token)
            request.state.user_roles = payload.get("roles", [])
            request.state.user_id = payload.get("sub")
            request.state.permissions = []
            for role in request.state.user_roles:
                request.state.permissions.extend(ROLE_PERMISSIONS.get(role, []))
        except Exception:
            pass
        return await handler(request)

    except Exception:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal Server Error"}
        )


app.add_middleware(
    CORSMiddleware,
    allow_origins=[f'http://localhost:5173', 'http://localhost'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)