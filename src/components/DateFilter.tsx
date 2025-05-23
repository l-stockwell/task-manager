import { useRef } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { Spacing, Fonts, FontSizes, Colors } from "../styles/variables";
import {
  CalendarIconStyled,
  DateIconButton,
  DatePickerInput,
  DatePickerWrapper,
} from "../styles/shared";

export type DateRange = { start: string; end: string };

export default function DateRangeFilter({
  start,
  end,
  onChange,
}: {
  start: string;
  end: string;
  onChange: (range: DateRange) => void;
}) {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (key: "start" | "end", value: string) => {
    const next = { start, end, [key]: value };
    if (next.start && next.end && next.end < next.start) {
      alert("End date cannot be earlier than start date");
      return;
    }
    onChange(next);
  };
  
  return (
    <Wrapper>
      <Label>Created:</Label>

      <DateWrapper>
        <DateInput
          ref={startRef}
          value={start}
          data-testid="start-date"
          id="start-date-input"
          onChange={(e) => handleDateChange("start", e.target.value)}
          onClick={() => startRef.current?.showPicker?.()}
        />
        <IconButton
          type="button"
          onClick={() => startRef.current?.showPicker?.()}
          aria-label="Pick start date"
        >
          <CalendarIconStyled />
        </IconButton>
        {start && (
          <IconButton
            type="button"
            onClick={() => handleDateChange("start", "")}
            aria-label="Clear start date"
          >
            <ClearIcon />
          </IconButton>
        )}
      </DateWrapper>

      <DateWrapper>
        <DateInput
          ref={endRef}
          value={end}
          data-testid="end-date"
          id="end-date-input"
          onChange={(e) => handleDateChange("end", e.target.value)}
          onClick={() => endRef.current?.showPicker?.()}
        />
        <IconButton
          type="button"
          onClick={() => endRef.current?.showPicker?.()}
          aria-label="Pick end date"
        >
          <CalendarIconStyled />
        </IconButton>
        {end && (
          <IconButton
            type="button"
            onClick={() => handleDateChange("end", "")}
            aria-label="Clear end date"
          >
            <ClearIcon />
          </IconButton>
        )}
      </DateWrapper>
    </Wrapper>
  );
}

const Label = styled.span`
  font-family: ${Fonts.karla};
  font-weight: 600;
  font-size: ${FontSizes.body};
  color: ${Colors.textDark};
  white-space: nowrap;
`;

const DateWrapper = styled.div`
  ${DatePickerWrapper}
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  flex: 1 1 0;
  min-width: 100px;
  border-color: ${Colors.neutral};
`;

const DateInput = styled.input.attrs({ type: "date" })`
  ${DatePickerInput}
  padding: 0 ${Spacing.sm};
  flex: 1;
  min-width: 0;
`;

const IconButton = styled.button`
  ${DateIconButton}
  padding: 0 ${Spacing.sm};
  border-color: ${Colors.neutral};
`;

const ClearIcon = styled(FiX)`
  width: 16px;
  height: 16px;
  color: ${Colors.textDark};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${Spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 480px) {
    > ${DateWrapper} {
      flex-basis: 100%;
    }
  }
`;
