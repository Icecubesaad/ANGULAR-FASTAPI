from fastapi import APIRouter, Body

from database.db import *
from models.notes import noteModel

from schemas.note import BaseModel, Response, UpdateNoteModel

router = APIRouter()


@router.get("/", response_description="notes retrieved", response_model=Response)
async def get_notes():
    notes = await retrieve_notes()
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "notes data retrieved successfully",
        "data": notes,
    }


@router.get("/{id}", response_description="note data retrieved", response_model=Response)
async def get_note_data(id: PydanticObjectId):
    note = await retrieve_notes(id)
    if note:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "note data retrieved successfully",
            "data": note,
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "note doesn't exist",
    }


@router.post(
    "/",
    response_description="note data added into the database",
    response_model=Response,
)
async def add_note_data(note: noteModel = Body(...)):
    new_note = await add_note(note)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "note created successfully",
        "data": new_note,
    }


@router.delete("/{id}", response_description="note data deleted from the database")
async def delete_note_data(id: PydanticObjectId):
    deleted_note = await delete_note(id)
    if deleted_note:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "note with ID: {} removed".format(id),
            "data": deleted_note,
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "note with id {0} doesn't exist".format(id),
        "data": False,
    }


@router.put("/{id}", response_model=Response)
async def update_note(id: PydanticObjectId, req: UpdateNoteModel = Body(...)):
    updated_note = await update_note_data(id, req.dict())
    if updated_note:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "note with ID: {} updated".format(id),
            "data": updated_note,
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. note with ID: {} not found".format(id),
        "data": False,
    }
