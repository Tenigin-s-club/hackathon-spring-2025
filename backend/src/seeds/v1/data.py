from uuid import UUID
from src.database.models import Role, User, UserRole
from src.utils.security.password import encode_password

# Роли с фиксированными UUID
roles_data = [
    Role(id=UUID('00000000-0000-0000-0000-000000000001'), name='test'),
    Role(id=UUID('00000000-0000-0000-0000-000000000002'), name="member_union"),
    Role(id=UUID('00000000-0000-0000-0000-000000000003'), name="member_comitet"),
    Role(id=UUID('00000000-0000-0000-0000-000000000004'), name="admin"),
    Role(id=UUID('00000000-0000-0000-0000-000000000005'), name="secretar"),
    Role(id=UUID('00000000-0000-0000-0000-000000000006'), name="corporative_secretar"),
    Role(id=UUID('00000000-0000-0000-0000-000000000007'), name="guest")
]

# Пользователи с фиксированными UUID
users_data = [
    User(
        id=UUID('00000000-0000-0000-0000-000000000001'),
        fio="Иван Иванов Иванов",
        email="ivan@test.test",
        password=encode_password("123"),
        checked=True
    ),
    User(
        id=UUID('00000000-0000-0000-0000-000000000002'),
        fio="Павел Вячеславович Стручков",
        email="pavlov@test.test",
        password=encode_password("123"),
        checked=True
    ),
    User(
        id=UUID('00000000-0000-0000-0000-000000000003'),
        fio="Яза Кривинина Рыбакова",
        email="yaza@test.test",
        password=encode_password("123"),
        checked=True
    ),
    User(
        id=UUID('00000000-0000-0000-0000-000000000004'),
        fio="Алексей Петров Сидоров",
        email="alex@test.test",
        password=encode_password("123"),
        checked=True
    ),
    User(
        id=UUID('00000000-0000-0000-0000-000000000005'),
        fio="Елена Сергеевна Миронова",
        email="elena@test.test",
        password=encode_password("123"),
        checked=True
    ),
    User(
        id=UUID('00000000-0000-0000-0000-000000000006'),
        fio="Admin",
        email="admin@admin.ru",
        password=encode_password("123"),
        checked=True
    ),
    User(
        id=UUID('00000000-0000-0000-0000-000000000007'),
        fio="Aboba",
        email="aboba@admin.ru",
        password=encode_password("123"),
        checked=False
    )
]

# Связи пользователей и ролей через явные UUID
user_roles = [
    # Иван (000...0001) - test и member_union
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000001'),
        role_id=UUID('00000000-0000-0000-0000-000000000001')
    ),
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000001'),
        role_id=UUID('00000000-0000-0000-0000-000000000002')
    ),

    # Павел (000...0002) - member_comitet
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000002'),
        role_id=UUID('00000000-0000-0000-0000-000000000003')
    ),

    # Яза (000...0003) - secretar
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000003'),
        role_id=UUID('00000000-0000-0000-0000-000000000005')
    ),

    # Алексей (000...0004) - corporative_secretar
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000004'),
        role_id=UUID('00000000-0000-0000-0000-000000000006')
    ),

    # Елена (000...0005) - guest
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000005'),
        role_id=UUID('00000000-0000-0000-0000-000000000007')
    ),

    # Admin (000...0006) - admin и corporative_secretar
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000006'),
        role_id=UUID('00000000-0000-0000-0000-000000000004')
    ),
    UserRole(
        user_id=UUID('00000000-0000-0000-0000-000000000006'),
        role_id=UUID('00000000-0000-0000-0000-000000000006')
    )
]