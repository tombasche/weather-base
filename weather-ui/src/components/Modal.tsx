import { RefObject, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ModalDiv = styled.div`
  z-index: auto;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  animation: ${fadeInOut} 0.2s;
`;

const Container = styled.div`
  position: fixed;
  width: 600px;
  max-width: 85%;
  height: 400px;
  max-height: 90%;
  padding: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: #001e32;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ title, isOpen, onClose, children }: Props) => {
  const useCloseOnOutsideClick = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: { target: any }) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useCloseOnOutsideClick(wrapperRef);

  return isOpen ? (
    <ModalDiv>
      <Container ref={wrapperRef}>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </Container>
    </ModalDiv>
  ) : null;
};

export default Modal;
