import datetime
import os
from pathlib import Path

import dotenv
from pydantic import BaseModel

BASE_DIR = Path(__file__).parent.parent

dotenv.load_dotenv()


class DataBase(BaseModel):
    user: str = os.environ.get("POSTGRES_USER")
    name: str = os.environ.get("POSTGRES_DB")
    host: str = os.environ.get("POSTGRES_HOST")
    port: str = os.environ.get("POSTGRES_PORT")
    password: str = os.environ.get("POSTGRES_PASSWORD")
    url: str = f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{name}"


class TypeToken(BaseModel):
    refresh: str = "refresh"
    access: str = "access"


class Auth(BaseModel):
    public_key: Path = BASE_DIR / "src" / "certs" / "jwt-public.pem"
    private_key: Path = BASE_DIR / "src" / "certs" / "jwt-private.pem"
    algorithm: str = "RS256"
    access_exp: datetime.timedelta = datetime.timedelta(minutes=15)
    refresh_exp: datetime.timedelta = datetime.timedelta(days=30)
    type_token: TypeToken = TypeToken()
    cookie_refresh: str = "refresh-token"
    cookie_access: str = "access-token"

class Storage(BaseModel):
    public_key: str = os.environ.get("STORAGE_PUBLIC_KEY")
    privet_key: str = os.environ.get("STORAGE_PRIVET_KEY")

    bucket: str = os.environ.get("STORAGE_BUCKET")

class Settings(BaseModel):
    database: DataBase = DataBase()
    auth: Auth = Auth()
    storage: Storage = Storage()


settings = Settings()
