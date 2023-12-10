import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { flexColumn } from 'theme/globalStyles';

import { StyledAuthInputProps } from './interface';

export const StyledAuthInput = styled.input<StyledAuthInputProps>`
  width: 450px;
  height: 70px;
  padding-left: 30px;
  border: 1px solid ${colors.border};
  font-size: 20px;
  border-radius: 6px;

  border-color: ${({ error }) => (error ? colors.error : colors.border)};
  color: ${({ error }) => (error ? colors.error : 'black')};
`;
export const StyledAuthInputContainet = styled.div`
  ${flexColumn}

  color: ${colors.error};
`;
