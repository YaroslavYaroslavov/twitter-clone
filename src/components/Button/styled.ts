import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { centerByFlex } from 'theme/globalStyles';

export const ButtonWrapper = styled.button`
  ${centerByFlex}

  max-width: 400px;
  height: 40px;
  border-radius: 42px;
  background-color: white;
  transition: 0.2s;
  width: 350px;

  border: 1px solid ${colors.border};

  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGrayHover};
  }
`;
