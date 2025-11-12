import asyncio
import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import create_async_engine

# --- Load .env (python-dotenv required) ---
try:
    from dotenv import load_dotenv
except Exception:  # pragma: no cover
    load_dotenv = None

if load_dotenv:
    here = os.path.dirname(os.path.abspath(__file__))
    # try backend/.env then alembic/.env
    for p in (os.path.join(here, "..", ".env"), os.path.join(here, ".env")):
        if os.path.exists(p):
            load_dotenv(p)
            break

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL not found. Ensure backend/.env contains "
        "DATABASE_URL=postgresql+asyncpg://orca:orca@localhost:5432/orca"
    )

# Alembic Config object
config = context.config

# Inject URL from env (overrides alembic.ini)
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Safe logging setup (only if ini has logging sections)
if config.config_file_name:
    try:
        fileConfig(config.config_file_name)
    except Exception:
        # If logging sections are missing, continue without logging
        pass

# Import your metadata
try:
    from app.db import Base  # your project's declarative base
except Exception:
    Base = None

target_metadata = getattr(Base, "metadata", None)

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()

def _run_migrations(connection: Connection) -> None:
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()

async def run_migrations_online() -> None:
    """Run migrations in 'online' mode with async engine."""
    engine = create_async_engine(
        config.get_main_option("sqlalchemy.url"),
        poolclass=pool.NullPool,
        future=True,
    )
    async with engine.connect() as conn:
        await conn.run_sync(_run_migrations)
    await engine.dispose()

if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())

