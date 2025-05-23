import styled from "styled-components";
import { useState, useRef, type FormEvent } from "react";
import type { CreateTaskDto } from "../models/Task";
import {
  BaseButton,
  BaseHeading,
  CalendarIconStyled,
  Container,
  DateIconButton,
  DatePickerInput,
  DatePickerWrapper,
  sharedInput,
} from "../styles/shared";
import { Colors, Fonts, FontSizes, Spacing } from "../styles/variables";

export default function AddTaskForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (data: CreateTaskDto) => Promise<void>;
  loading: boolean;
  error: string | null;
}) {
  const today = new Date().toISOString().slice(0, 10); // Today's date in YYYY-MM-DD
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<string>(today);
  const [description, setDescription] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, due: dueDate || undefined, description });

    // Clear the form
    setTitle("");
    setDueDate(today);
    setDescription("");
  };

  return (
    <FormContainer>
      <Heading>Less juggling, more chill. Add your task and relax.</Heading>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="title">
            Title<Required>*</Required>
          </Label>
          <TextInput
            id="title"
            placeholder="Task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>

        <Field>
          <Label htmlFor="dueDate">
            Due date<Required>*</Required>
          </Label>
          <DateWrapper>
            <DateInput
              id="dueDate"
              ref={dateInputRef}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
            <IconButton
              type="button"
              onClick={() =>
                dateInputRef.current?.showPicker
                  ? dateInputRef.current.showPicker()
                  : dateInputRef.current?.focus()
              }
            >
              <CalendarIcon />
            </IconButton>
          </DateWrapper>
        </Field>

        <Field>
          <Label htmlFor="description">
            Task description<Required>*</Required>
          </Label>
          <Textarea
            id="description"
            placeholder="Your message"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Field>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create task"}
        </SubmitButton>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  ${Container}
`;

const Heading = styled.h1`
  ${BaseHeading}
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.md};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.sm};
`;

const Label = styled.label`
  font-family: ${Fonts.karla};
  font-weight: 600;
  font-size: ${FontSizes.body};
  color: ${Colors.textDark};
`;

const Required = styled.span`
  color: ${Colors.errorPink};
  margin-left: ${Spacing.xs};
`;

const DateWrapper = styled.div`
  ${DatePickerWrapper}
  height: 48px;
  width: 100%;
  max-width: 344px;
`;

const DateInput = styled.input.attrs({ type: "date" })`
  ${DatePickerInput}
`;

const IconButton = styled.button`
  ${DateIconButton}
`;

const CalendarIcon = CalendarIconStyled;

const TextInput = styled.input`
  ${sharedInput}
`;

const Textarea = styled.textarea`
  ${sharedInput}
  min-height: 120px;
  padding: ${Spacing.md};
  resize: vertical;
`;

const SubmitButton = styled.button`
  ${BaseButton}
`;

const ErrorMessage = styled.p`
  font-family: ${Fonts.karla};
  font-size: ${FontSizes.body};
  color: ${Colors.errorPink};
  margin-top: ${Spacing.sm};
`;
