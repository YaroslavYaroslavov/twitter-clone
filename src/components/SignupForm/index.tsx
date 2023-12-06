import { AuthInput } from 'components/AuthInput';
import { LoginButton } from 'components/Login/styled';
import { CustomSelect } from 'components/Select';
import { TwitterLogoSmall } from 'components/Signup/styled';
import { createUserWithEmailAndPassword, linkWithPhoneNumber } from 'firebase/auth';
import React, { FC, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FirebaseContext } from '../../index';
import { SignupFormProps } from './interface';
import { BirthdayContainer, SignupFormContainer, StyledSignupForm } from './styled';

export const checkOTP = () => {
  return prompt('Введите код авторизации, полученный в СМС') || '';
};
export const SignupForm: FC = () => {
  const { register, handleSubmit } = useForm<SignupFormProps>({});

  const navigate = useNavigate();

  const { auth } = useContext(FirebaseContext);

  const handleRegister: SubmitHandler<SignupFormProps> = ({ email, password, phone }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const appVerify = window.recaptchaVerifier;
        linkWithPhoneNumber(user, phone, appVerify)
          .then((confirmationResult) => {
            confirmationResult
              .confirm(checkOTP())
              .then(() => {
                navigate('/feed');
              })
              .catch((err) => {
                user.delete();
                console.error(err);
              });
          })
          .catch(() => {
            user.delete();
          });
      })
      .catch(console.error);
  };

  const isLogin = () => true;

  return (
    <SignupFormContainer>
      <TwitterLogoSmall />
      <h1>Create an account</h1>
      <StyledSignupForm onSubmit={handleSubmit(handleRegister)}>
        <AuthInput
          type="text"
          placeholder="Name"
          {...register('name', { required: true, validate: isLogin })}
        />
        <AuthInput
          type="phone"
          placeholder="Phone number"
          {...register('phone', { required: true, validate: isLogin })}
        />
        <AuthInput
          type="email"
          placeholder="Email"
          {...register('email', { required: true, validate: isLogin })}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          {...register('password', { required: true, validate: isLogin })}
        />
        <BirthdayContainer>
          <CustomSelect optionsArr={[]} placeholder={'Day'} width={'180px'} />
          <CustomSelect optionsArr={[]} placeholder={'Month'} width={'100px'} />
          <CustomSelect optionsArr={[]} placeholder={'Year'} width={'100px'} />
        </BirthdayContainer>

        <LoginButton type="submit">Next</LoginButton>
      </StyledSignupForm>
    </SignupFormContainer>
  );
};
