// styled.js
import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';

export const DialogContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

export const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  /* Стили для скроллбара */
  &::-webkit-scrollbar {
    width: 8px; /* Ширина скроллбара */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Цвет трека */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Цвет ползунка */
    border-radius: 4px;
    height: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Цвет ползунка при наведении */
  }
`;
export const TheirMessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;
`;

export const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 70%;
  word-break: break-all;

  &.mine {
    align-self: flex-end;
  }

  &.theirs {
    align-self: flex-start;
  }
`;


export const AvatarLink = styled.div`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  justify-content: flex-end; /* Выравнивание аватара и никнейма по правому краю */

  &.mine {
    justify-content: flex-end; /* Выравнивание аватара и никнейма по правому краю для моих сообщений */
  }

  &.theirs {
    justify-content: flex-start; /* Выравнивание аватара и никнейма по левому краю для сообщений собеседника */
  }
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const Username = styled.div`
  font-weight: bold;
`;

export const MessageContent = styled.div`
  display: inline-block;
  background-color: ${colors.lightGray};
  padding: 10px;
  border-radius: 10px;
  margin-top: 5px;
  color: ${colors.black};
  width: 100%;

  &.mine {
    align-self: flex-start;
    background-color: ${colors.blue};
    color: ${colors.white};
  }

  &.theirs {
    align-self: flex-start; /* Устанавливаем выравнивание по левому краю для сообщений собеседника */
  }
`;



export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
`;

export const MessageInput = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  flex-grow: 0;
  resize: none;
  border-radius: 7px;
  height: 60px;
`;

export const ButtonContainer = styled.div`
  display: flex;

  button {
    margin-right: 10px;
  }
`;

export const SendButton = styled.button`
  background-color: ${colors.lightBlue};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.lightBlueInactive};
  }
`;

export const CloseButton = styled.button`
  background-color: ${colors.lightGray};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.lightGrayHover};
  }
`;