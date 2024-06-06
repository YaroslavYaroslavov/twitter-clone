import { Feed } from 'pages/Feed';
import { Login } from 'pages/Login';
import { Profile } from 'pages/Profile';
import { Signup } from 'pages/Signup';
import { SignupForm } from 'pages/SignupForm';
import React from 'react';
import { paths } from './paths';
const { homepage, signup, login, feed, profile } = paths;
export const RoutesArr = [
    {
        pathname: homepage,
        element: React.createElement(Signup, null),
        logged: false,
    },
    {
        pathname: signup,
        element: React.createElement(SignupForm, null),
        logged: false,
    },
    {
        pathname: login,
        element: React.createElement(Login, null),
        logged: false,
    },
    {
        pathname: feed,
        element: React.createElement(Feed, null),
        logged: true,
    },
    {
        pathname: profile,
        element: React.createElement(Profile, null),
        logged: true,
    },
];
