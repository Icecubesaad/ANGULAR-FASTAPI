from typing import List, Union

from beanie import PydanticObjectId

from models.notes import noteModel

note_collection = noteModel




async def retrieve_notes() -> List[noteModel]:
    notes = await note_collection.all().to_list()
    return notes


async def add_note(new_note: noteModel) -> noteModel:
    note = await new_note.create()
    return note


async def retrieve_note(id: PydanticObjectId) -> noteModel:
    note = await note_collection.get(id)
    if note:
        return note


async def delete_note(id: PydanticObjectId) -> bool:
    note = await note_collection.get(id)
    if note:
        await note.delete()
        return True


async def update_note_data(id: PydanticObjectId, data: dict) -> Union[bool, noteModel]:
    des_body = {k: v for k, v in data.items() if v is not None}
    update_query = {"$set": {field: value for field, value in des_body.items()}}
    note = await note_collection.get(id)
    if note:
        await note.update(update_query)
        return note
    return False
