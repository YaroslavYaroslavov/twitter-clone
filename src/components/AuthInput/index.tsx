import { validatePatterns } from 'constants/validatePatterns';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { validateMessages } from 'static/validateMessages';

import { AuthInputProps } from './interface';
import { StyledAuthInput, StyledAuthInputContainet } from './styled';

const { requiredFieldMessage } = validateMessages;

export const AuthInput: FC<AuthInputProps> = ({
  placeholder,
  register,
  type,
  error,
  fieldName,
  validatePattern,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const checkPatternLogin = (name: string) => {
    if (name === 'login') {
      return /[a-zA-Z]/.test(inputValue)
        ? validatePatterns.emailPattern
        : validatePatterns.phonePattern;
    } else {
      return false;
    }
  };

  const pattern = useMemo(
    () => checkPatternLogin(fieldName) || validatePattern,
    [fieldName, validatePattern]
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
        onChange={handleInputChange}
      />
    </StyledAuthInputContainet>
  );
};
