import { validatePatterns } from 'constants/validatePatterns';
import React, { useMemo } from 'react';
import { validateMessages } from 'static/validateMessages';
import { StyledAuthInput, StyledAuthInputContainet } from './styled';
const { requiredFieldMessage } = validateMessages;
export const AuthInput = (props) => {
    const { placeholder, register, type, error, fieldName, validatePattern, getValues } = props;
    const checkPatternLogin = (name) => {
        if (name === 'login') {
            return /[a-zA-Z]/.test(getValues(fieldName))
                ? validatePatterns.emailPattern
                : validatePatterns.phonePattern;
        }
        else {
            return false;
        }
    };
    const pattern = useMemo(() => checkPatternLogin(fieldName) || validatePattern, [fieldName, validatePattern, getValues(fieldName)]);
    return (React.createElement(StyledAuthInputContainet, null,
        error && error.message,
        React.createElement(StyledAuthInput, Object.assign({ placeholder: placeholder, autoComplete: 'off', type: type }, register(fieldName, {
            required: requiredFieldMessage,
            pattern: pattern || validatePattern,
        }), { error: error }))));
};
