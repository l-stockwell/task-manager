import styled from "styled-components";
import type { Task } from "../models/Task";
import TaskItem from "./TaskItem";
import { Spacing } from "../styles/variables";
import { BaseText } from "../styles/shared";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (t: Task) => void;
  onDelete: (t: Task) => void;
}

export default function TaskList({
  tasks,
  loading,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (loading) return <p>Loading…</p>;
  if (tasks.length === 0)
    return (
      <Text>
        <p>No tasks have been created yet.</p>
      </Text>
    );
  return (
    <List>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${Spacing.sm} 0;
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};
`;

const Text = styled.p`
  ${BaseText}
`;
