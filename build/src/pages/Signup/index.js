import { LoginButton } from 'components/Button';
import { footerLinks } from 'constants/footerLinks';
import { paths } from 'constants/paths';
import { googleSignIn } from 'helpers/googleSignIn';
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { configSignup } from './config';
import { AuthorisationSection, BackgroundImage, ButtonContainer, Footer, Policy, SignupBodyContainer, SignupContainer, TwitterLogoSmall, } from './styled';
const { signup, login } = paths;
const { policyDescription, alredyHaveAccount, loginLink, mainHeader, botHeader, signinWithGoogle, signinWithEmail, } = configSignup;
export const Signup = () => {
    const navigate = useNavigate();
    const emailSignIn = useCallback(() => {
        navigate(signup);
    }, [navigate, signup]);
    return (React.createElement(SignupContainer, null,
        React.createElement(SignupBodyContainer, null,
            React.createElement(BackgroundImage, null),
            React.createElement(AuthorisationSection, null,
                React.createElement(TwitterLogoSmall, null),
                React.createElement("h1", null, mainHeader),
                React.createElement("h2", null, botHeader),
                React.createElement(ButtonContainer, null,
                    React.createElement(LoginButton, { title: signinWithGoogle, callback: googleSignIn }),
                    React.createElement(LoginButton, { title: signinWithEmail, callback: emailSignIn })),
                React.createElement(Policy, null, policyDescription),
                React.createElement("span", null,
                    alredyHaveAccount,
                    " ",
                    React.createElement(Link, { to: login }, loginLink)))),
        React.createElement(Footer, null, footerLinks.map((link) => (React.createElement("a", { key: link }, link))))));
};
