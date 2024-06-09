import styled from 'styled-components';

import { ModalContainerProps } from './interface';

export const ModalContainer = styled.div<ModalContainerProps>`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  transition: 0.1s;
  justify-content: center;
  transform: scale(1);
  opacity: ${(props) => (props.active ? 1 : 0)};
  z-index: ${(props) => (props.active ? 999 : -999)};
`;

export const ModalContent = styled.div<ModalContainerProps>`
  max-height: 70vh;
  overflow-y: scroll;
  max-width: 1920px;
  padding: 20px;
  border-radius: 12px;
  transition: 0.5s;
  background-color: white;
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(0)')};
  &::-webkit-scrollbar {
    width: 6px; /* Ширина скроллбара */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Цвет трека */
    margin: 40px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Цвет ползунка */
    border-radius: 40px;
    height: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Цвет ползунка при наведении */
  }
`;
