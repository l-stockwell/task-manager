import React from "react";
import styled from "styled-components";
import { Colors, BorderRadius } from "../styles/variables";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  fullPage?: boolean;
  showCloseButton?: boolean;
}

export default function Modal({
  onClose,
  children,
  fullPage = false,
  showCloseButton = true,
}: ModalProps) {
  return (
    <Overlay fullPage={fullPage} onClick={onClose}>
      <Content fullPage={fullPage} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <CloseButton fullPage={fullPage} onClick={onClose} aria-label="Close">
            ×
          </CloseButton>
        )}
        {children}
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div<{ fullPage: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ fullPage }) => (fullPage ? "none" : "rgba(0,0,0,0.5)")};
  display: flex;
  align-items: ${({ fullPage }) => (fullPage ? "stretch" : "center")};
  justify-content: center;
  z-index: 1000;
`;

const Content = styled.div<{ fullPage: boolean }>`
  background: #fff;
  background: ${({ fullPage }) => fullPage ? Colors.neutralBackground : "#fff"};
  width: 100%;
  max-width: ${({ fullPage }) => (fullPage ? "none" : "344px")};
  height: ${({ fullPage }) => (fullPage ? "100vh" : "auto")};
  max-height: ${({ fullPage }) => (fullPage ? "none" : "90vh")};
  border-radius: ${({ fullPage }) => (fullPage ? "0" : BorderRadius.small)};
  position: relative;
  padding: ${({ fullPage }) => (fullPage ? "0" : "24px")};
  overflow-y: auto;
`;

const CloseButton = styled.button<{ fullPage: boolean }>`
  position: absolute;
  top: ${({ fullPage }) => (fullPage ? "16px" : "12px")};
  right: ${({ fullPage }) => (fullPage ? "16px" : "12px")};
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: ${Colors.textDark};
`;
