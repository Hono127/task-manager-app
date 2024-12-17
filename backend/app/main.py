from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じて特定のオリジンに制限
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# クラスモデル
class Task(BaseModel):
    id: int
    title: str
    description: str
    priority: str
    tags: List[str]
    due_date: str


tasks = [
    {
        "id": 1,
        "title": "タスク1",
        "description": "タスク1の説明",
        "priority": "高",
        "tags": ["仕事", "緊急"],
        "due_date": "2024-12-31",
    },
    {
        "id": 2,
        "title": "タスク2",
        "description": "タスク2の説明",
        "priority": "低",
        "tags": ["個人"],
        "due_date": "2024-12-25",
    },
]


# タスク一覧取得
@app.get("/tasks")
def get_tasks():
    return tasks


# タスク作成
@app.post("/tasks")
def create_task(task: Task):
    tasks.append(task.dict())
    return {"message": "タスクの作成に成功しました", "tasks": task}
