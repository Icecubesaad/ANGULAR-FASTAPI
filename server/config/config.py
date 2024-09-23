from typing import Optional

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings
import models as models


class Settings(BaseSettings):
    # database configurations
    MONGO_URI: Optional[str] = None

    class Config:
        env_file = ".env"
        from_attributes = True


async def initiate_database():
    settings = Settings()
    client = AsyncIOMotorClient(settings.MONGO_URI)
    await init_beanie(database=client.get_default_database(), document_models=models.__all__)

