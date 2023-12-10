import styled from 'styled-components';
import { centerByFlexColumn } from 'theme/globalStyles';

export const AuthWrapper = styled.div`
  ${centerByFlexColumn}

  width: 500px;
  margin: auto;
  margin-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
`;

export const HeaderAuthForm = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 40px;
  margin-bottom: 30px;
`;
