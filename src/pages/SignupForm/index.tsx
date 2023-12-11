import { AuthForm } from 'components/AuthForm';
import { AuthInput } from 'components/AuthInput';
import { BirtdaySelect } from 'components/BirthdaySelect';
import { paths } from 'constants/paths';
import { validatePatterns } from 'constants/validatePatterns';
import { createUserWithEmailAndPassword, linkWithPhoneNumber } from 'firebase/auth';
import { checkOTP } from 'helpers/checkOTP';
import {
  checkIfValidYearPassed,
  getDaysArray,
  getYearsArray,
  monthIndex,
} from 'helpers/dateHelper';
import { googleSignIn } from 'helpers/googleSignIn';
import { StateInterface } from 'interface';
import { LoginForm } from 'pages/Login/interfaces';
import { LoginButton } from 'pages/Login/styled';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { configSignupForm } from './config';
import {
  AlternativeLogin,
  BirthdayContainer,
  ErrorContainer,
  StyledSignupForm,
  TextContainer,
} from './styled';

const { feed } = paths;
const {
  namePlaceholder,
  emailPlaceholder,
  passwordPlaceholder,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  dateOfBirthNotation,
  dateOfBirthHeader,
  phonePlaceholder,
  useAlternative,
  headerText,
} = configSignupForm;

export const SignupForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
    watch,
    getValues,
  } = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: { year: new Date().getUTCFullYear().toString(), month: '0' },
  });

  const navigate = useNavigate();

  const auth = useSelector((state: StateInterface) => state.auth);

  const [daysArray, setDaysArray] = useState(
    getDaysArray(Number(getValues('month')), Number(getValues('year')))
  );

  React.useEffect(() => {
    const subscription = watch(({ month, year }) =>
      setDaysArray(getDaysArray(Number(month), Number(year)))
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleRegister: SubmitHandler<LoginForm> = ({ email, password, phone }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const appVerify = window.recaptchaVerifier;
        linkWithPhoneNumber(user, phone, appVerify)
          .then((confirmationResult) => {
            confirmationResult
              .confirm(checkOTP())
              .then(() => {
                navigate(feed);
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

  return (
    <AuthForm headerText={headerText}>
      <StyledSignupForm onSubmit={handleSubmit(handleRegister)}>
        <AuthInput
          placeholder={namePlaceholder}
          type="name"
          register={register}
          error={errors.name}
          fieldName="name"
          validatePattern={validatePatterns.namePattern}
          getValues={getValues}
        />
        <AuthInput
          placeholder={phonePlaceholder}
          type="phone"
          register={register}
          error={errors.phone}
          validatePattern={validatePatterns.phonePattern}
          fieldName="phone"
          getValues={getValues}
        />
        <AuthInput
          placeholder={emailPlaceholder}
          type="email"
          register={register}
          error={errors.email}
          getValues={getValues}
          validatePattern={validatePatterns.emailPattern}
          fieldName="email"
        />
        <AuthInput
          placeholder={passwordPlaceholder}
          type="password"
          register={register}
          getValues={getValues}
          error={errors.password}
          fieldName="password"
        />
        <TextContainer>
          <AlternativeLogin onClick={googleSignIn}>{useAlternative}</AlternativeLogin>

          <h3>{dateOfBirthHeader}</h3>
          <p>{dateOfBirthNotation}</p>
        </TextContainer>
        <BirthdayContainer
          {...register('date', {
            validate: () => {
              if (
                checkIfValidYearPassed(
                  Number(getValues('day')),
                  Number(getValues('month')),
                  Number(getValues('year'))
                )
              ) {
                return true;
              } else {
                return 'You must be over 16 years old';
              }
            },
          })}
        >
          <BirtdaySelect
            control={control}
            name={'month'}
            optionsArr={monthIndex}
            placeholder={monthPlaceholder}
            width={'180px'}
            isDirty={dirtyFields?.month || false}
          />

          <BirtdaySelect
            control={control}
            name={'day'}
            optionsArr={daysArray}
            placeholder={dayPlaceholder}
            width={'100px'}
            isDirty={dirtyFields?.day || false}
          />

          <BirtdaySelect
            name="year"
            control={control}
            optionsArr={getYearsArray(1920)}
            placeholder={yearPlaceholder}
            width={'100px'}
            isDirty={dirtyFields?.year || false}
          />
        </BirthdayContainer>
        {/* Сломалось почему то */}
        {errors.date && <ErrorContainer>{errors.date?.message}</ErrorContainer>}

        <LoginButton disabled={!isValid} type="submit">
          Next
        </LoginButton>
      </StyledSignupForm>
    </AuthForm>
  );
};
