import styled, { css } from "styled-components";
import { FiTrash2, FiCalendar, FiCheck, FiCircle } from "react-icons/fi";
import type { Task } from "../models/Task";
import {
  Colors,
  Fonts,
  FontSizes,
  Spacing,
  BorderRadius,
} from "../styles/variables";

interface Props {
  task: Task;
  onToggle: (t: Task) => void;
  onDelete: (t: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
const dueDate = new Date(task.due || task.created); // Determine the due date — use 'due' if available, otherwise fall back to 'created'
const now = new Date();

// Calculate the difference in days between the due date and now
const diffDays = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

let variant: "default" | "warning" | "overdue" = "default";

if (!task.complete) {
  // If the due date is in the past, mark as "overdue"
  if (diffDays < 0) variant = "overdue";
  // If the due date is within the next 7 days, mark as "warning"
  else if (diffDays <= 7) variant = "warning";
}

// Format the due date to "dd/mm"
const formatted = dueDate.toLocaleDateString(undefined, {
  day: "2-digit",
  month: "2-digit",
});


  return (
    <Card data-testid={`task-item-${task.id}`}>
      <TopRow>
        <StatusBadge complete={task.complete}>
          {task.complete ? "Completed" : "In Progress"}
        </StatusBadge>
        <DateBadge variant={variant}>
          <FiCalendar />
          {formatted}
        </DateBadge>
      </TopRow>
      <Divider />
      <TitleRow>
        <StatusIcon
          data-testid="check-button"
          complete={task.complete}
          onClick={() => onToggle(task)}
        >
          {task.complete ? <FiCheck /> : <FiCircle />}
        </StatusIcon>

        <TextContent>
          <Title complete={task.complete} data-testid={`task-title-${task.id}`}>
            {task.title}
          </Title>
          {task.description && <Description>{task.description}</Description>}
        </TextContent>

        <TrashButton data-testid="delete-button" onClick={() => onDelete(task)}>
          <FiTrash2 />
        </TrashButton>
      </TitleRow>
      <Actions>
        <ManageButton onClick={() => alert("Not implemented yet!")}>
          Manage task
        </ManageButton>{" "}
      </Actions>
    </Card>
  );
}

const Card = styled.li`
  background: ${Colors.bgDark};
  border-radius: ${BorderRadius.small};
  padding: ${Spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${Spacing.sm};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  height: 1px;
  background: ${Colors.divider};
  margin: ${Spacing.xs} 0;
`;

const StatusBadge = styled.span<{ complete: boolean }>`
  font-family: ${Fonts.karla};
  font-weight: 500;
  font-size: ${FontSizes.body};
  line-height: 1.5;
  padding: ${Spacing.xs} ${Spacing.md};
  border-radius: ${BorderRadius.pill};
  color: ${Colors.textLight};
  background: ${({ complete }) =>
    complete ? Colors.completeGreen : Colors.inProgressBlue};
`;

const DateBadge = styled.div<{ variant: "default" | "warning" | "overdue" }>`
  font-family: ${Fonts.karla};
  font-weight: 500;
  font-size: ${FontSizes.body};
  display: flex;
  align-items: center;
  gap: ${Spacing.xs};
  padding: ${Spacing.xs} ${Spacing.md};
  border-radius: ${BorderRadius.pill};
  color: ${({ variant }) =>
    variant === "default" ? Colors.textDark : Colors.textLight};
  background: ${({ variant }) =>
    variant === "overdue"
      ? Colors.overdueRed
      : variant === "warning"
        ? Colors.warningOrange
        : Colors.textLight};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spacing.md};
`;

const StatusIcon = styled.div<{ complete: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: ${({ complete }) =>
    complete ? Colors.completeGreen : Colors.textLight};

  border: 2px solid ${Colors.textLight};

  color: ${Colors.textLight};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${Spacing.xs};
`;

const Title = styled.h3<{ complete: boolean }>`
  margin: 0;
  font-family: ${Fonts.karla};
  font-weight: 600;
  font-size: ${FontSizes.lg};
  color: ${Colors.textLight};
  ${({ complete }) =>
    complete &&
    css`
      text-decoration: line-through;
      opacity: 0.6;
    `}
`;

const Description = styled.p`
  margin: 0;
  font-family: ${Fonts.karla};
  font-weight: 400;
  font-size: ${FontSizes.body};
  color: ${Colors.textGray};
`;

const TrashButton = styled.button`
  background: transparent;
  border: none;
  color: ${Colors.neutral};
  font-size: 24px;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${Spacing.sm};
`;

const ManageButton = styled.button`
  width: 100%;
  padding: ${Spacing.sm} 0;
  background: ${Colors.textLight};
  color: ${Colors.textDark};
  border: none;
  border-radius: ${BorderRadius.pill};
  font-family: ${Fonts.karla};
  font-weight: 600;
  font-size: ${FontSizes.body};
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;
