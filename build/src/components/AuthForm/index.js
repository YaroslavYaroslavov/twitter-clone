import { paths } from 'constants/paths';
import { TwitterLogoSmall } from 'pages/Signup/styled';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthWrapper, GoBack, HeaderAuthForm } from './styled';
const { homepage } = paths;
export const AuthForm = ({ headerText, children }) => {
    const navigate = useNavigate();
    const handleLogoClick = useCallback(() => {
        navigate(homepage);
    }, [navigate, homepage]);
    return (React.createElement(AuthWrapper, null,
        React.createElement(TwitterLogoSmall, { onClick: handleLogoClick }),
        React.createElement(HeaderAuthForm, null, headerText),
        React.createElement(GoBack, { onClick: handleLogoClick }, "Go Back"),
        children));
};
