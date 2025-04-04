"""empty message

Revision ID: 70c2bee74e87
Revises: b60b0e396e04
Create Date: 2025-04-05 15:43:17.851214

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '70c2bee74e87'
down_revision: Union[str, None] = 'b60b0e396e04'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('user_role_role_id_fkey', 'user_role', type_='foreignkey')
    op.drop_constraint('user_role_user_id_fkey', 'user_role', type_='foreignkey')
    op.create_foreign_key(None, 'user_role', 'role', ['role_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'user_role', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user_role', type_='foreignkey')
    op.drop_constraint(None, 'user_role', type_='foreignkey')
    op.create_foreign_key('user_role_user_id_fkey', 'user_role', 'user', ['user_id'], ['id'])
    op.create_foreign_key('user_role_role_id_fkey', 'user_role', 'role', ['role_id'], ['id'])
    # ### end Alembic commands ###
