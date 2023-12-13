import React, { FC } from 'react';

import { LoginButtonProps } from './interfaces';
import { ButtonWrapper } from './styled';

export const LoginButton: FC<LoginButtonProps> = ({ title, iconSrc, callback }) => {
  return (
    <ButtonWrapper onClick={callback}>
      {iconSrc && <img src={iconSrc} />}
      {title}
    </ButtonWrapper>
  );
};
