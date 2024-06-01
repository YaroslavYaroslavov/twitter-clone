import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlex, flexColumn } from 'theme/globalStyles';
export const OptionsList = styled.div `
  ${flexColumn};

  position: absolute;
  background-color: white;
  padding: 10px;
  margin-right: 100px;
  width: 140px;
  gap: 10px;
  border-radius: 15px;
  border: 3px solid gray;
  box-shadow: -10px 19px 20px -14px rgba(0, 0, 0, 1);
`;
export const OptionItem = styled.span `
  ${centerByFlex}

  justify-content: start;
  background-color: white;
  height: 40px;
  padding-left: 20px;
  border-radius: 5px;
  border: 1px solid gray;
  cursor: pointer;
  &:hover {
    background-color: ${colors.lightGrayHover};
  }
`;
export const OpenMenuButton = styled.button `
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export const OtherOptionsContainer = styled.div `
  position: relative;
`;
