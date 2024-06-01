import usePortal from 'hooks/use-portal';
import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import { ModalContainer, ModalContent } from './styled';
export const Modal = memo(({ active, setActive, children }) => {
    Modal.displayName = 'Modal';
    const handleCloseModal = () => {
        setActive(false);
    };
    const portal = usePortal();
    return (portal &&
        ReactDOM.createPortal(React.createElement(ModalContainer, { active: active, onClick: handleCloseModal },
            React.createElement(ModalContent, { active: active, onClick: (e) => e.stopPropagation() }, children)), portal));
});
