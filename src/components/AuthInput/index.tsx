import { validatePatterns } from 'constants/validatePatterns';
import React, { FC, useMemo } from 'react';
import { validateMessages } from 'static/validateMessages';

import { AuthInputProps } from './interface';
import { StyledAuthInput, StyledAuthInputContainet } from './styled';

const { requiredFieldMessage } = validateMessages;

export const AuthInput: FC<AuthInputProps> = (props) => {
  const { placeholder, register, type, error, fieldName, validatePattern, getValues } = props;

  const checkPatternLogin = (name: string) => {
    if (name === 'login') {
      return /[a-zA-Z]/.test(getValues(fieldName))
        ? validatePatterns.emailPattern
        : validatePatterns.phonePattern;
    } else {
      return false;
    }
  };

  const pattern = useMemo(
    () => checkPatternLogin(fieldName) || validatePattern,
    [fieldName, validatePattern, getValues(fieldName)]
  );

  return (
    <StyledAuthInputContainet>
      {error && error.message}
      <StyledAuthInput
        placeholder={placeholder}
        autoComplete={'off'}
        type={type}
        {...register(fieldName, {
          required: requiredFieldMessage,
          pattern: pattern || validatePattern,
        })}
        error={error}
      />
    </StyledAuthInputContainet>
  );
};
