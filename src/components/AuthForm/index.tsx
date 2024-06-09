import { paths } from 'constants/paths';
import { TwitterLogoSmall } from 'pages/Signup/styled';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthFormProps } from './interfaces';
import { AuthWrapper, GoBack, HeaderAuthForm } from './styled';

const { homepage } = paths;

export const AuthForm: FC<AuthFormProps> = ({ headerText, children }) => {
  const navigate = useNavigate();

  const handleLogoClick = useCallback(() => {
    navigate(homepage);
  }, [navigate, homepage]);

  return (
    <AuthWrapper>
      <TwitterLogoSmall onClick={handleLogoClick} />
      <HeaderAuthForm>{headerText}</HeaderAuthForm>
      <GoBack onClick={handleLogoClick}>Назад</GoBack>

      {children}
    </AuthWrapper>
  );
};
