import type { Task } from "../models/Task";
import {
  calculateTotalPages,
  filterByDateRange,
  paginate,
  filterByStatus,
} from "../utils/tasksUtils";

describe("filterByStatus", () => {
  const tasks: Task[] = [
    {
      id: "1",
      title: "A",
      created: "2025-01-01T00:00:00.000Z",
      description: "Test",
      complete: false,
    },
    {
      id: "2",
      title: "B",
      created: "2025-01-02T00:00:00.000Z",
      description: "Test",
      complete: true,
    },
    {
      id: "3",
      title: "C",
      created: "2025-01-03T00:00:00.000Z",
      description: "Test",
      complete: false,
    },
  ];

  it('returns only in-progress tasks when filter="inprogress"', () => {
    const result = filterByStatus(tasks, "inprogress");
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.complete)).toBe(true);
  });

  it('returns only completed tasks when filter="completed"', () => {
    const result = filterByStatus(tasks, "completed");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });
});

describe("filterByDateRange", () => {
  const tasks: Task[] = [
    {
      id: "1",
      title: "Jan",
      created: "2025-01-01T00:00:00.000Z",
      description: "Test",
      complete: false,
    },
    {
      id: "2",
      title: "Feb",
      created: "2025-02-15T00:00:00.000Z",
      description: "Test",
      complete: false,
    },
    {
      id: "3",
      title: "Mar",
      created: "2025-03-10T00:00:00.000Z",
      description: "Test",
      complete: false,
    },
  ];

  it("filters tasks on or after start date", () => {
    const result = filterByDateRange(tasks, {
      start: "2025-02-01",
      end: "",
    });
    expect(result.map((t) => t.id)).toEqual(["2", "3"]);
  });

  it("filters tasks on or before end date", () => {
    const result = filterByDateRange(tasks, {
      start: "",
      end: "2025-02-28",
    });
    expect(result.map((t) => t.id)).toEqual(["1", "2"]);
  });

  it("filters tasks between start and end dates", () => {
    const result = filterByDateRange(tasks, {
      start: "2025-01-15",
      end: "2025-03-01",
    });
    expect(result.map((t) => t.id)).toEqual(["2"]);
  });

  it("returns all tasks if no start or end provided", () => {
    const result = filterByDateRange(tasks, { start: "", end: "" });
    expect(result).toHaveLength(tasks.length);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 50 }, (_, i) => `item${i + 1}`);

  it("returns the first page by default perPage=20", () => {
    const page1 = paginate(items, 1);
    expect(page1).toHaveLength(20);
    expect(page1[0]).toBe("item1");
    expect(page1[19]).toBe("item20");
  });

  it("returns the correct slice for a later page", () => {
    const page3 = paginate(items, 3);
    expect(page3).toHaveLength(10);
    expect(page3[0]).toBe("item41");
    expect(page3[9]).toBe("item50");
  });

  it("respects a custom perPage value", () => {
    const page2 = paginate(items, 2, 10);
    expect(page2).toHaveLength(10);
    expect(page2[0]).toBe("item11");
    expect(page2[9]).toBe("item20");
  });
});

describe("calculateTotalPages", () => {
  const tasks = Array.from(
    { length: 45 },
    (_, i) =>
      ({
        id: `${i}`,
        title: "",
        created: "",
        complete: false,
      }) as Task,
  );

  it("calculates pages with default perPage=20", () => {
    expect(calculateTotalPages(tasks)).toBe(3);
  });

  it("calculates pages with a custom perPage", () => {
    expect(calculateTotalPages(tasks, 10)).toBe(5);
  });

  it("returns 0 pages for empty items", () => {
    expect(calculateTotalPages([], 20)).toBe(0);
  });
});
