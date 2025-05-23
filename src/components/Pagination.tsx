import styled from "styled-components";
import { FlexCenter, BaseText, SecondaryButton } from "../styles/shared";
import { Spacing, FontSizes, BorderRadius } from "../styles/variables";

interface PaginationProps {
  page: number;
  total: number;
  onPageChange: (p: number) => void;
}
export default function Pagination({ page, total, onPageChange }: PaginationProps) {
  if (total <= 1) return null; // Don't show pagination if there's only one page

  return (
    <PaginationContainer>
      <PageButton
        data-testid="prev-button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ‹ Prev
      </PageButton>

      <PageInfo data-testid="page-info">
        Page {page} of {total}
      </PageInfo>

      <PageButton
        data-testid="next-button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === total}
      >
        Next ›
      </PageButton>
    </PaginationContainer>
  );
}

const PaginationContainer = styled.nav`
  ${FlexCenter}
  gap: ${Spacing.sm};
  margin: ${Spacing.lg} 0;
`;

const PageButton = styled.button`
  ${SecondaryButton}
  height: 40px;
  min-width: 80px;
  font-size: ${FontSizes.body};
  border-radius: ${BorderRadius.small};
  padding: 0 ${Spacing.md};

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const PageInfo = styled.span`
  ${BaseText}
  font-size: ${FontSizes.body};
`;
