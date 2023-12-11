import styled from 'styled-components';
import { colors } from 'theme/colorsPallete';
import { defaultFont } from 'theme/globalStyles';

export const AuthWrapper = styled.div`
  width: 500px;
  padding-top: 50px;
  margin: auto;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
`;

export const HeaderAuthForm = styled.h1`
  ${defaultFont}

  margin-top: 40px;
  margin-bottom: 30px;
`;

export const GoBack = styled.p`
  margin-bottom: 30px;
  cursor: pointer;

  color: ${colors.lightBlue};
`;
