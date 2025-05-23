import styled from "styled-components";
import {
  BorderRadius,
  Colors,
  Fonts,
  FontSizes,
  Spacing,
} from "../styles/variables";

type FilterProps = {
  filter: "inprogress" | "completed";
  onChange: (f: "inprogress" | "completed") => void;
};

export default function FilterTabs({ filter, onChange }: FilterProps) {
  return (
    <TabsContainer>
      <TabButton
        selected={filter === "inprogress"}
        onClick={() => onChange("inprogress")}
      >
        In Progress
      </TabButton>
      <TabButton
        selected={filter === "completed"}
        onClick={() => onChange("completed")}
      >
        Completed
      </TabButton>
    </TabsContainer>
  );
}

const TabsContainer = styled.div`
  display: flex;
  background: ${Colors.bgDark};
  border-radius: ${BorderRadius.round};
  overflow: hidden;
  min-height: 53px;
`;

const TabButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: ${Spacing.sm} 0;
  font-family: ${Fonts.karla};
  font-size: ${FontSizes.body};
  font-weight: 600;
  text-align: center;
  color: ${({ selected }) =>
    selected ? Colors.accentYellow : Colors.textLight};
  background: transparent;
  border: none;
  border-bottom: ${({ selected }) =>
    selected ? `4px solid ${Colors.accentYellow}` : "4px solid transparent"};
  cursor: pointer;
  transition: color 0.2s;
  &:focus {
    outline: none;
  }
`;
