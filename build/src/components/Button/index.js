import React from 'react';
import { ButtonWrapper } from './styled';
export const LoginButton = ({ title, iconSrc, callback }) => {
    return (React.createElement(ButtonWrapper, { onClick: callback },
        iconSrc && React.createElement("img", { src: iconSrc }),
        title));
};
