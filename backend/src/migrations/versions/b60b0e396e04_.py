"""empty message

Revision ID: b60b0e396e04
Revises: cf05775fc40d
Create Date: 2025-04-05 14:48:21.642811

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b60b0e396e04'
down_revision: Union[str, None] = 'cf05775fc40d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('material', 'title')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('material', sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
