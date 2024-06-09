// styled.js
import cross from 'assets/cross.svg'
import goBack from 'assets/goback.svg'
import sendMessage from 'assets/sendMessage.svg'
import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlex, flexColumn } from 'theme/globalStyles';

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
    border-radius: 0
  }

  &.theirs {
    border-radius: 0;
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
    border-radius: 10px 10px 0px 10px;
  }

  &.theirs {
    border-radius: 0px 10px 10px 10px;
    align-self: flex-start; /* Устанавливаем выравнивание по левому краю для сообщений собеседника */
  }
`;

export const InputContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: stretch;
  padding: 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 5px;
  /* gap: 20px; */
  
`;

export const MessageInput = styled.input`
border: none;
  margin-bottom: 10px;
  padding: 10px;
  flex-grow: 0;
  resize: none;
  border-radius: 7px;
  height: 60px;
  width: 100%;
  &:focus {
    outline-width: 0;
}
`;

export const ButtonContainer = styled.div`
  display: flex;
 justify-content: center;
 align-items: center;
 gap: 20px;

`;
export const SendButton = styled.button`
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  background: url(${sendMessage})  center no-repeat;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: invert(78%) sepia(9%) saturate(10%) hue-rotate(326deg) brightness(83%) contrast(82%);
  cursor: pointer;
  transition: filter 0.3s; // добавим плавное изменение фильтра при наведении
  
  &:hover {
    filter: none;
    transform: scale(1.2);
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
export const ParticipantsCount = styled.span`
  display: inline;
  margin: 0;
  padding: 0;
  border: 0;
  background: 0 0;
  color: var(--gray_400);
  font: 16px / 18px
    var(
      --palette-vk-font,
      -apple-system,
      BlinkMacSystemFont,
      'Roboto',
      'Helvetica Neue',
      Geneva,
      arial,
      Tahoma,
      verdana,
      sans-serif
    );

  &:hover {
    text-decoration: underline;
  }
`;

export const NoMessages = styled.div `
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;

`
export const DialogHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: end;
  & > * {
    width: 100px
  }
`

export const MembersModal = styled.div`

`

export const MembersList = styled.ul`
 list-style-type: none;
`
export const CrossBtn = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  background: url(${cross})  center no-repeat;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  
  cursor: pointer;
  transition: filter 0.3s; // добавим плавное изменение фильтра при наведении
  
  &:hover {
    filter: invert(100%) 
  } `

export const GoBack = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  background: url(${goBack})  center no-repeat;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: -5px; 
  left: 0px;
  margin-right: 20px;
  cursor: pointer;
  transition: filter 0.3s; // добавим плавное изменение фильтра при наведении
  
  &:hover {
    filter: invert(100%) 
  } `



export const HeaderModal = styled.div`
  width: 300px;
display: flex;
align-items: center;
justify-content: center;
 
`
export const EditUsersContainer = styled.div`
position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
export const SystemMessage = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

`