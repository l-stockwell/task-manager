import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import FilterTabs from "../components/FilterTabs";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";
import AddTaskForm from "../components/AddTaskForm";
import DateRangeFilter, { type DateRange } from "../components/DateFilter";
import { useTasks } from "../hooks/useTasks";
import type { Task, CreateTaskDto } from "../models/Task";
import {
  Spacing,
  Fonts,
  FontSizes,
  Colors,
  BorderRadius,
} from "../styles/variables";
import { SecondaryButton } from "../styles/shared";
import {
  filterByStatus,
  filterByDateRange,
  paginate,
  calculateTotalPages,
} from "../utils/tasksUtils";

export default function TaskListPage() {
  const { tasks, loading, error, add, toggleComplete, remove } = useTasks();

  const [filter, setFilter] = useState<"inprogress" | "completed">("inprogress");
  const [dateRange, setDateRange] = useState<DateRange>({ start: "", end: "" });
  const [page, setPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);

  // Apply filters and pagination
  const statusFiltered = filterByStatus(tasks, filter);
  const dateFiltered = filterByDateRange(statusFiltered, dateRange);
  const totalPages = calculateTotalPages(dateFiltered);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [filter, dateRange, totalPages]);

  const paginated = paginate(dateFiltered, page);

  const handleCreate = async (data: CreateTaskDto) => {
    await add(data);
    setShowAdd(false);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    await remove(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <Page>
      <HeaderRow>
        <Header>My Tasks</Header>
      </HeaderRow>

      <FiltersRow>
        <DateRangeFilter
          start={dateRange.start}
          end={dateRange.end}
          onChange={setDateRange}
        />
      </FiltersRow>

      <TabsRow>
        <FilterTabs filter={filter} onChange={setFilter} />
      </TabsRow>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskList
        tasks={paginated}
        loading={loading}
        onToggle={toggleComplete}
        onDelete={setPendingDelete}
      />

      <Pagination
        page={page}
        total={totalPages}
        onPageChange={(p) => setPage(p)}
      />

      <NewTaskButton onClick={() => setShowAdd(true)}>
        Create a new task
      </NewTaskButton>

      {showAdd && (
        <Modal
          fullPage
          onClose={() => setShowAdd(false)}
          showCloseButton={false}
        >
          <AddTaskForm
            onSubmit={handleCreate}
            loading={loading}
            error={error}
          />
        </Modal>
      )}

      {pendingDelete && (
        <Modal onClose={() => setPendingDelete(null)} showCloseButton={false}>
          <DeleteContainer>
            <DeleteHeading>
              Are you sure you want to delete this task?
            </DeleteHeading>
            <DeleteText>This action cannot be undone.</DeleteText>
            <ButtonRow>
              <GoBackButton onClick={() => setPendingDelete(null)}>
                Go back
              </GoBackButton>
              <DeleteButton onClick={confirmDelete}>Yes, delete</DeleteButton>
            </ButtonRow>
          </DeleteContainer>
        </Modal>
      )}
    </Page>
  );
}

const Page = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Spacing.md};
`;

const Header = styled.h1`
  font-family: ${Fonts.karla};
  font-weight: 700;
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin: 0;
`;

const TabsRow = styled.div`
  margin-bottom: ${Spacing.sm};
`;

const FiltersRow = styled.div`
  margin-bottom: ${Spacing.md};
`;

const NewTaskButton = styled.button`
  width: 100%;
  padding: ${Spacing.md};
  background: ${Colors.primaryPink};
  color: #000;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: ${BorderRadius.pill};
  margin-top: ${Spacing.xl};
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};
  text-align: center;
`;

const DeleteHeading = styled.h2`
  font-family: ${Fonts.karla};
  font-weight: 500;
  font-size: ${FontSizes.xl};
  color: ${Colors.textDark};
  margin: 0;
`;

const DeleteText = styled.p`
  font-family: ${Fonts.karla};
  font-size: ${FontSizes.body};
  color: ${Colors.textDark};
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${Spacing.md};
`;

const GoBackButton = styled.button`
  ${SecondaryButton}
`;

const DeleteButton = styled.button`
  height: 48px;
  background: ${Colors.primaryPink};
  color: #000;
  border: none;
  border-radius: ${BorderRadius.pill};
  font-family: ${Fonts.karla};
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.95);
  }
`;
