FROM python:3.12-slim

RUN mkdir /app

WORKDIR /app

COPY poetry.lock pyproject.toml ./

RUN pip install poetry

RUN poetry install --no-root

COPY . .

RUN chmod a+x ./build/*.sh
# ENTRYPOINT ["tail", "-f", "/dev/null"]

CMD [ "sh", "./build/app_entrypoint.sh" ]
