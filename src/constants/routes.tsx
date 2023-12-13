import { Feed } from 'pages/Feed';
import { Login } from 'pages/Login';
import { Signup } from 'pages/Signup';
import { SignupForm } from 'pages/SignupForm';
import React from 'react';

import { paths } from './paths';

const { homepage, signup, login, feed } = paths;

export const RoutesArr = [
  {
    pathname: homepage,
    element: <Signup />,
    logged: false,
  },
  {
    pathname: signup,
    element: <SignupForm />,
    logged: false,
  },
  {
    pathname: login,
    element: <Login />,
    logged: false,
  },
  {
    pathname: feed,
    element: <Feed />,
    logged: true,
  },
];
