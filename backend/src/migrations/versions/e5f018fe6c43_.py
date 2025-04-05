"""empty message

Revision ID: e5f018fe6c43
Revises: 70c2bee74e87
Create Date: 2025-04-06 00:57:02.918872

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e5f018fe6c43'
down_revision: Union[str, None] = '70c2bee74e87'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('meeting', 'status')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('meeting', sa.Column('status', sa.VARCHAR(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
