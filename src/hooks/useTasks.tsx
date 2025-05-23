import { useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task";
import type { Task, CreateTaskDto } from "../models/Task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const add = async (dto: CreateTaskDto) => {
    const newTask = await createTask({
      ...dto,
      created: new Date(),
      complete: false,
    });
    setTasks((ts) => [newTask, ...ts]);
  };

  const toggleComplete = async (t: Task) => {
    const updated = await updateTask(t.id, !t.complete);
    setTasks((ts) => ts.map((x) => (x.id === updated.id ? updated : x)));
  };

  const remove = async (id: string) => {
    await deleteTask(id);
    setTasks((ts) => ts.filter((t) => t.id !== id));
  };

  return { tasks, loading, error, add, toggleComplete, remove };
}
