import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { flexColumn } from 'theme/globalStyles';
const { lightBlue, lightBlueInactive } = colors;
export const LoginButton = styled.button `
  width: 450px;
  height: 60px;
  color: white;
  background-color: ${({ disabled }) => (!disabled ? lightBlue : lightBlueInactive)};
  border: none;
  border-radius: 76px;
  font-size: 20px;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => !disabled && lightBlueInactive};
  }
`;
export const StyledLoginForm = styled.form `
  ${flexColumn}

  gap: 30px;
  margin-top: 20px;
`;
export const LinkToRegister = styled(Link) `
  color: lightBlue;
  font-size: 20px;
  margin-left: auto;
  margin-right: 0;
  margin-top: 20px;
`;
