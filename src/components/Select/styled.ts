import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';

import { StyledSelectProps } from './interface';

export const StyledSelect = styled.select<StyledSelectProps>`
  height: 70px;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid ${colors.border};

  width: ${({ width }) => width};
`;
