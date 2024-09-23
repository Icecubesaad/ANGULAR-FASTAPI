from fastapi import FastAPI, Depends
from config.config import initiate_database
from routes.notes import router as NoteRouter

app = FastAPI()



@app.on_event("startup")
async def start_database():
    await initiate_database()


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app."}


app.include_router(NoteRouter,tags=["Students"],prefix="/student",)
