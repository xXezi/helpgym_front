import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #000;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 20px;
  color: #333;
`;

function Modal({ title, children, onClose }) {
  // Impedir que o scroll do body funcione quando o modal estiver aberto
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Fechar o modal quando clicar fora do conteúdo
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
