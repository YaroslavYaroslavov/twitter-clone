import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { LoginButtonProps } from './interfaces';
import { ButtonWrapper } from './styled';

export const LoginButton: FC<LoginButtonProps> = ({ title, iconSrc, callback, redirect }) => {
  const Wrapper = redirect ? Link : 'div';

  return (
    <ButtonWrapper onClick={callback}>
      <Wrapper to={redirect || ''}>
        {iconSrc && <img src={iconSrc} />}
        {title}
      </Wrapper>
    </ButtonWrapper>
  );
};
