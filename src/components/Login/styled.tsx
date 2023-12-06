import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;

  justify-content: center;
  margin: auto;
  margin-top: 50px;
`;

export const LoginButton = styled.button`
  width: 450px;
  height: 60px;
  color: white;
  background-color: #1da1f2;
  border: none;
  border-radius: 76px;
  font-size: 20px;
`;

export const AuthInput = styled.input`
  width: 450px;
  height: 70px;
  padding-left: 30px;
  border: 1px solid #cdcdcd;
  font-size: 20px;
  border-radius: 6px;
`;

export const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const LinkToRegister = styled(Link)`
  color: #1da1f2;
  font-size: 20px;
  margin-left: auto;
  margin-right: 0;
`;

export const HeaderLoginForm = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 40px;
`;
