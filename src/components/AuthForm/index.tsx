import { TwitterLogoSmall } from 'components/pages/Signup/styled';
import { paths } from 'constants/paths';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthFormProps } from './interfaces';
import { AuthWrapper, HeaderAuthForm } from './styled';

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
      {children}
    </AuthWrapper>
  );
};
