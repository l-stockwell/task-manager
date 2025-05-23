import type { Task } from "../models/Task";
import type { DateRange } from "../components/DateFilter";

export function filterByStatus(
  tasks: Task[],
  filter: "inprogress" | "completed",
): Task[] {
  return tasks.filter((t) =>
    filter === "completed" ? t.complete : !t.complete,
  );
}

export function filterByDateRange(
  tasks: Task[],
  { start, end }: DateRange,
): Task[] {
  return tasks.filter((t) => {
    const created = new Date(t.created);
    if (start && created < new Date(start)) return false;
    if (end && created > new Date(end)) return false;
    return true;
  });
}

export function paginate<T>(items: T[], page: number, perPage = 20): T[] {
  const from = (page - 1) * perPage;
  return items.slice(from, from + perPage);
}

export function calculateTotalPages(items: Task[], perPage = 20): number {
  return Math.ceil(items.length / perPage);
}
