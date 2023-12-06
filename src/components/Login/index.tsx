import { AuthInput } from 'components/AuthInput';
import { TwitterLogoSmall } from 'components/Signup/styled';
import { checkOTP } from 'components/SignupForm';
import { signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FirebaseContext } from '../../index';
import { LoginForm } from './interfaces';
import {
  HeaderLoginForm,
  LinkToRegister,
  LoginButton,
  LoginWrapper,
  StyledLoginForm,
} from './styled';

export const Login = () => {
  const { auth } = useContext(FirebaseContext);
  const { register, handleSubmit } = useForm<LoginForm>({});

  const submit: SubmitHandler<LoginForm> = (data) => {
    if (data.login.indexOf('@') !== -1) {
      signInWithEmailAndPassword(auth, data.login, data.password).catch(console.error);
    } else {
      const appVerify = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, data.login, appVerify)
        .then((confirmationResult) => {
          confirmationResult
            .confirm(checkOTP())
            .then(({ user }) => {
              if (!user.email) {
                user.delete();
              }
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
  };

  const isLogin = () => {
    return true;
  };

  return (
    <LoginWrapper>
      <TwitterLogoSmall />
      <HeaderLoginForm>Log in to Twitter</HeaderLoginForm>
      <StyledLoginForm onSubmit={handleSubmit(submit)}>
        <AuthInput
          placeholder="email or phone"
          type=""
          {...register('login', { required: true, validate: isLogin })}
        />
        <AuthInput
          placeholder="password"
          type="password"
          {...register('password', { required: true, validate: isLogin })}
        />
        <LoginButton>Log In</LoginButton>
      </StyledLoginForm>
      <LinkToRegister to={'/signup'}>Sign up to Twitter</LinkToRegister>
    </LoginWrapper>
  );
};
