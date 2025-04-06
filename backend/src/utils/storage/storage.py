from src.config import settings
import boto3


class Storage:
    bucket = settings.storage.bucket
    storage_link = 'https://storage.yandexcloud.net'

    def __init__(self):
        session = boto3.session.Session(
            aws_access_key_id=settings.storage.public_key,
            aws_secret_access_key=settings.storage.privet_key
        )
        s3 = session.client(
            service_name='s3',
            endpoint_url=self.storage_link
        )
        self.client = s3

    def put_image(self, key: str, file: bytes):
        self.client.put_object(Bucket=self.bucket, Key=key, Body=file)
        return self.storage_link + f'/{self.bucket}/{key}'
