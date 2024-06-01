import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
export const StyledSelect = styled.select `
  height: 70px;
  font-size: 18px;
  border-radius: 6px;

  border: 1px solid ${colors.border};

  width: ${({ width }) => width};
`;
