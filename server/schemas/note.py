from pydantic import BaseModel, EmailStr
from typing import Optional, Any

class UpdateNoteModel(BaseModel):
    title: Optional[str]
    desciption: Optional[str]

    class Collection:
        name = "note"

    class Config:
        json_schema_extra = {
            "example": {
               "title":"This is the title of my note",
               "desciption":"This is the desciption of the documents titled as 'This is the title of my node'"
            }
        }

class Response(BaseModel):
    status_code: int
    response_type: str
    description: str
    data: Optional[Any]

    class Config:
        json_schema_extra = {
            "example": {
                "status_code": 200,
                "response_type": "success",
                "description": "Operation successful",
                "data": "Sample data",
            }
        }
