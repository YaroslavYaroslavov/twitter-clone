import { Feed } from 'pages/Feed';
import { Login } from 'pages/Login';
import { Profile } from 'pages/Profile';
import { Signup } from 'pages/Signup';
import { SignupForm } from 'pages/SignupForm';
import React from 'react';

import { paths } from './paths';
import Messages from 'pages/Messages';

const { homepage, signup, login, feed, profile, messages } = paths;

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
  {
    pathname: profile,
    element: <Profile />,
    logged: true,
  },
  {
    pathname: messages,
    element: <Messages />,
    logged: true,
  }
];
