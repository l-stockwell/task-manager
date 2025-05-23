import styled, { css } from "styled-components";
import { Fonts, FontSizes, Colors, Spacing, BorderRadius } from "./variables";
import { FiCalendar } from "react-icons/fi";

export const Container = css`
  width: 100%;
  max-width: 344px;
  margin: 0 auto;
  padding: ${Spacing.lg} ${Spacing.md};
`;

export const BaseHeading = css`
  font-family: ${Fonts.karla};
  font-weight: 700;
  font-size: ${FontSizes.h1};
  line-height: 0.8;
  text-align: center;
  text-transform: uppercase;
  color: ${Colors.textDark};
  margin-bottom: ${Spacing.lg};
  letter-spacing: 0.05em;
`;

export const BaseText = css`
  font-family: ${Fonts.karla};
  font-weight: 500;
  color: ${Colors.textDark};
`;

export const sharedInput = css`
  width: 100%;
  height: 52px;
  padding: 0 ${Spacing.md};
  font-family: ${Fonts.karla};
  font-size: ${FontSizes.lg};
  color: ${Colors.textDark};
  border: 2px solid ${Colors.border};
  border-radius: ${BorderRadius.round};
  background: ${Colors.textLight};
  box-sizing: border-box;
`;

export const BaseButton = css`
  height: 52px;
  background: ${Colors.primaryPink};
  border: none;
  border-radius: ${BorderRadius.pill};
  font-family: ${Fonts.karla};
  font-weight: 700;
  font-size: ${FontSizes.button};
  color: #000;
  cursor: pointer;
  transition: opacity 0.2s;
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;

export const SecondaryButton = css`
  height: 48px;
  background: #fff;
  color: ${Colors.textDark};
  border: 2px solid ${Colors.textDark};
  border-radius: ${BorderRadius.pill};
  font-family: ${Fonts.karla};
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.95);
  }
`;

export const FlexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DatePickerWrapper = css`
  display: flex;
  align-items: center;
  border: 2px solid ${Colors.textDark};
  border-radius: ${BorderRadius.small};
  overflow: hidden;
`;

export const DatePickerInput = css`
  ${sharedInput}
  border: none;
  background: transparent;
  flex: 1;
  padding: 0 ${Spacing.md};

  /* hide native picker icon */
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
  }
  &::-moz-calendar-picker-indicator {
    opacity: 0;
  }
`;

export const DateIconButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 ${Spacing.md};
  border: none;
  background: transparent;
  border-left: 2px solid ${Colors.textDark};
  color: ${Colors.textDark};
  cursor: pointer;
`;

export const CalendarIconStyled = styled(FiCalendar)`
  width: 20px;
  height: 20px;
  color: ${Colors.textDark};
`;
