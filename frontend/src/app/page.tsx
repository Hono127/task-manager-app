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

  useEffect(() => {
    apiClient.get('/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("タスクが取得できませんでした", error);
      });
  }, []);

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
    </div>

  )
}

export default HomePage