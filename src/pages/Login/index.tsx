import { AuthForm } from 'components/AuthForm';
import { AuthInput } from 'components/AuthInput';
import { paths } from 'constants/paths';
import { signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
import { checkOTP } from 'helpers/checkOTP';
import { StateInterface } from 'interface';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { authMessages } from 'static/authMessages';

import { configLogin } from './config';
import { LoginForm } from './interfaces';
import { LinkToRegister, LoginButton, StyledLoginForm } from './styled';

const { signup } = paths;
const { loginPlaceholder, passwordPlaceholder, loginButtonText, LinkToRegisterText } = configLogin;
const { unexpectedError, invalidUsernameOrPassword, invalidCode, userIsNotRegister } = authMessages;

export const Login = () => {
  const auth = useSelector((state: StateInterface) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const submit: SubmitHandler<LoginForm> = (data) => {
    if (data.login.indexOf('@') !== -1) {
      signInWithEmailAndPassword(auth, data.login, data.password).catch(() => {
        alert(invalidUsernameOrPassword);
      });
    } else {
      const appVerify = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, data.login, appVerify)
        .then((confirmationResult) => {
          confirmationResult
            .confirm(checkOTP())
            .then(({ user }) => {
              if (!user.email) {
                alert(userIsNotRegister);
                user.delete();
              }
            })
            .catch(() => {
              alert(invalidCode);
            });
        })
        .catch(() => {
          alert(unexpectedError);
        });
    }
  };

  return (
    <AuthForm headerText="Войти в TravelCrew">
      <StyledLoginForm onSubmit={handleSubmit(submit)}>
        <AuthInput
          placeholder={loginPlaceholder}
          type="login"
          register={register}
          error={errors.login}
          fieldName="login"
          getValues={getValues}
        />
        <AuthInput
          placeholder={passwordPlaceholder}
          type="password"
          error={errors.password}
          register={register}
          fieldName="password"
          getValues={getValues}
        />
        <LoginButton>{loginButtonText}</LoginButton>
      </StyledLoginForm>
      <LinkToRegister to={signup}>{LinkToRegisterText}</LinkToRegister>
    </AuthForm>
  );
};
