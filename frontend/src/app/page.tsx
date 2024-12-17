"use client"

import React, { useEffect, useState } from 'react'
import apiClient from './appClient'

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  tags: string[];
  due_date: string;
}

const HomePage = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    id: 0,
    title: "",
    description: "",
    priority: "",
    tags: "",
    due_date: "",
  });


  // タスク一覧取得
  useEffect(() => {
    apiClient.get('/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("タスクが取得できませんでした", error);
      });
  }, []);

  // タスク追加
  const handleCreateTask = () => {
    const taskData = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      tags: newTask.tags.split(","),
      due_date: newTask.due_date,
    };

    apiClient
      .post("/tasks", taskData)
      .then((response) => {
        console.log(response.data);
        setTasks([...tasks, taskData]);
        setNewTask({ id: 0, title: "", description: "", priority: "", tags: "", due_date: "" });
      })
      .catch((error) => {
        console.error("タスクの作成に失敗しました", error);
      });
  };


  return (
    <div>
      <h1>タスク一覧</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>{task.title}</div>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>

      <h2>新しいタスクを作成</h2>
      <div>
        <input
          type="text"
          placeholder="タイトル"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="説明"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="優先度 (例: 高, 中, 低)"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        />
        <input
          type="text"
          placeholder="タグ (カンマ区切り)"
          value={newTask.tags}
          onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
        />
        <input
          type="date"
          value={newTask.due_date}
          onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
        />
        <button onClick={handleCreateTask}>タスクを追加</button>
      </div>
    </div>

  )
}

export default HomePage