import React, { FC, forwardRef } from 'react';

import { AuthInputProps } from './interface';
import { StyledAuthInput } from './styled';

export const AuthInput: FC<AuthInputProps> = forwardRef(
  ({ placeholder, type, setState, ...rest }, ref) => {
    AuthInput.displayName = 'AuthInput';
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState && setState(e.target.value);
    };

    return (
      <StyledAuthInput
        onChange={handleInputChange}
        placeholder={placeholder}
        type={type}
        ref={ref}
        {...rest}
      />
    );
  }
);
