import styled from 'styled-components';

import { StyledCustomSelectProps } from './interface';

export const StyledCustomSelect = styled.select<StyledCustomSelectProps>`
  width: ${({ width }) => width};
  height: 70px;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #c8cdd1;
`;
