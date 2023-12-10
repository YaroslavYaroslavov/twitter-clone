import { Feed } from 'components/Feed';
import { Login } from 'components/pages/Login';
import { Signup } from 'components/pages/Signup';
import { SignupForm } from 'components/pages/SignupForm';
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
