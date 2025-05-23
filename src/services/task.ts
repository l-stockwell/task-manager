import type { Task, CreateTaskDto } from "../models/Task";

const mockAPI = "http://localhost:3001/tasks";

function getErrorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : String(err) || fallback;
}

export async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await fetch(mockAPI);
    if (!res.ok) {
      throw new Error(`Failed to load tasks (${res.status})`);
    }
    return await res.json();
  } catch (err: unknown) {
    console.error("fetchTasks error:", err);
    throw new Error(getErrorMessage(err, "Unknown error fetching tasks"));
  }
}

export async function createTask(
  dto: CreateTaskDto & { created: Date; complete: boolean },
): Promise<Task> {
  try {
    const body = { ...dto, created: dto.created.toISOString() };
    const res = await fetch(mockAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create task (${res.status}): ${text}`);
    }
    return await res.json();
  } catch (err: unknown) {
    console.error("createTask error:", err);
    throw new Error(getErrorMessage(err, "Unknown error creating task"));
  }
}

export async function updateTask(
  id: string,
  complete: boolean
): Promise<Task> {
  try {
    const res = await fetch(`${mockAPI}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complete }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update task (${res.status}): ${text}`);
    }
    return await res.json();
  } catch (err: unknown) {
    console.error(`updateTask(${id}) error:`, err);
    throw new Error(
      getErrorMessage(err, `Unknown error updating task ${id}`)
    );
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    const res = await fetch(`${mockAPI}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to delete task (${res.status})`);
    }
  } catch (err: unknown) {
    console.error(`deleteTask(${id}) error:`, err);
    throw new Error(
      getErrorMessage(err, `Unknown error deleting task ${id}`)
    );
  }
}
