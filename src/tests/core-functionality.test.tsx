import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TaskListPage from "../pages/TaskListPage";
import { useTasks } from "../hooks/useTasks";

// Mock the tasks hook
vi.mock("../hooks/useTasks");
const mockedUseTasks = useTasks as unknown as ReturnType<typeof vi.fn>;

// Sample tasks for most tests
const mockTasks = [
  {
    id: "1",
    title: "Task 1",
    created: new Date().toISOString(),
    complete: false,
  },
  {
    id: "2",
    title: "Task 2",
    created: new Date().toISOString(),
    complete: false,
  },
  {
    id: "3",
    title: "Task 3",
    created: new Date().toISOString(),
    complete: true,
  },
];

describe("TaskListPage", () => {
  const addMock = vi.fn();
  const toggleMock = vi.fn();
  const removeMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    mockedUseTasks.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      error: null,
      add: addMock,
      toggleComplete: toggleMock,
      remove: removeMock,
    });
  });

  it("shows all in-progress tasks", () => {
    render(<TaskListPage />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("shows only completed tasks when 'Completed' filter is selected", async () => {
    render(<TaskListPage />);

    await userEvent.click(screen.getByRole("button", { name: /completed/i }));

    // Only the completed task (Task 3) should be visible
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).toBeNull();
    expect(screen.queryByText("Task 2")).toBeNull();
  });

  it("creates a new task", async () => {
    render(<TaskListPage />);

    // Open modal, fill form, submit
    await userEvent.click(
      screen.getByRole("button", { name: /create a new task/i }),
    );
    const title = await screen.findByLabelText(/title/i);
    await userEvent.type(title, "New Task");
    const desc = screen.getByLabelText(/task description/i);
    await userEvent.type(desc, "Test description");
    await userEvent.click(
      screen.getByRole("button", { name: /^create task$/i }),
    );

    // Verify add() was called with correct payload
    await waitFor(() =>
      expect(addMock).toHaveBeenCalledWith(
        expect.objectContaining({ title: "New Task" }),
      ),
    );
  });

  it("toggles a task’s completion", () => {
    render(<TaskListPage />);

    // Find the first task’s toggle button
    const item = screen.getByText("Task 1").closest("li");
    const toggleBtn = within(item!).getByTestId("check-button");

    fireEvent.click(toggleBtn);

    expect(toggleMock).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("deletes a task after confirmation", async () => {
    render(<TaskListPage />);

    // Trigger delete flow
    const item = screen.getByText("Task 1").closest("li");
    const deleteBtn = within(item!).getByTestId("delete-button");
    await userEvent.click(deleteBtn);

    // Confirm deletion
    const confirm = await screen.findByRole("button", { name: /yes, delete/i });
    await userEvent.click(confirm);

    await waitFor(() => expect(removeMock).toHaveBeenCalledWith("1"));
  });

  it("filters tasks by date range", () => {
    // Override hook to use two dated tasks
    const dated = [
      { id: "1", title: "Jan Task", created: "2024-01-15", complete: false },
      { id: "2", title: "Dec Task", created: "2024-12-15", complete: false },
    ];
    mockedUseTasks.mockReturnValue({
      tasks: dated,
      loading: false,
      error: null,
      add: addMock,
      toggleComplete: toggleMock,
      remove: removeMock,
    });

    render(<TaskListPage />);

    // Set date range to include only December
    fireEvent.change(screen.getByTestId("start-date"), {
      target: { value: "2024-07-01" },
    });
    fireEvent.change(screen.getByTestId("end-date"), {
      target: { value: "2024-12-31" },
    });

    expect(screen.queryByText("Jan Task")).toBeNull();
    expect(screen.getByText("Dec Task")).toBeInTheDocument();
  });

  it("paginates when there are more than 20 tasks", async () => {
    // Create 25 tasks
    const many = Array.from({ length: 25 }, (_, i) => ({
      id: `${i}`,
      title: `Task ${i}`,
      created: new Date().toISOString(),
      complete: false,
    }));
    mockedUseTasks.mockReturnValue({
      tasks: many,
      loading: false,
      error: null,
      add: addMock,
      toggleComplete: toggleMock,
      remove: removeMock,
    });

    render(<TaskListPage />);

    // Page 1 shows task-0 but not task-21
    expect(screen.getByTestId("task-title-0")).toHaveTextContent("Task 0");
    expect(screen.queryByTestId("task-title-21")).toBeNull();

    // Go to next page
    await userEvent.click(screen.getByTestId("next-button"));

    // Now task-21 should appear
    const t21 = await screen.findByTestId("task-title-21");
    expect(t21).toHaveTextContent("Task 21");
  });
});
