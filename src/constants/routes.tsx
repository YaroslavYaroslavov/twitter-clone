import { Feed } from 'components/Feed';
import { Login } from 'components/Login';
import { Signup } from 'components/Signup';
import { SignupForm } from 'components/SignupForm';
import React from 'react';

import { feed, homepage, login, signup } from './paths';

export const RoutesArr = [
  {
    pathname: homepage,
    element: <Signup />,
  },
  {
    pathname: signup,
    element: <SignupForm />,
  },
  {
    pathname: login,
    element: <Login />,
  },
  {
    pathname: feed,
    element: <Feed />,
  },
];
