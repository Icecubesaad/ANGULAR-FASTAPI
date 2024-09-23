from typing import Optional, Any

from beanie import Document
from pydantic import BaseModel


class noteModel(Document):
    title: str
    description: str

    class Config:
        json_schema_extra = {
            "example": {
               "title":"This is the title of my note",
               "desciption":"This is the desciption of the documents titled as 'This is the title of my node'"
            }
        }

    class Settings:
        name = "note"
