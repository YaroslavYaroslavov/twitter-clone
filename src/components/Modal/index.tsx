import usePortal from 'hooks/use-portal';
import React, { FC, memo } from 'react';
import ReactDOM from 'react-dom';

import { ModalProps } from './interface';
import { ModalContainer, ModalContent } from './styled';

export const Modal: FC<ModalProps> = memo(({ active, setActive, children }) => {
  Modal.displayName = 'Modal';

  const handleCloseModal = () => {
    setActive(false);
  };

  const portal = usePortal();
  return (
    portal &&
    ReactDOM.createPortal(
      <ModalContainer active={active} onClick={handleCloseModal}>
        <ModalContent active={active} onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalContent>
      </ModalContainer>,
      portal
    )
  );
});
