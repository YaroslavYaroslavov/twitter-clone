import styled from 'styled-components';
import { centerByFlexColumn, defaultFont } from 'theme/globalStyles';
import { colors } from 'theme/colorsPallete';

export const MessageModalData = styled.section`
  ${centerByFlexColumn};
  gap: 20px;
  max-width: 500;
  width: 100%; 
  padding: 20px; 
`;

export const MessageInput = styled.textarea`
  ${defaultFont};
  margin-bottom: 10px;
  padding: 10px;
  flex-grow: 0;
  resize: none;
  border-radius: 7px;
  width: 500px;
  height: 150px;
`;

export const SendButton = styled.button`
  ${defaultFont};
  border-radius: 50px;
  border: none;
  background-color: ${colors.lightBlue};
  color: white;
  width: 200px;
  font-weight: 700;
  height: 44px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightBlueInactive};
  }
`;