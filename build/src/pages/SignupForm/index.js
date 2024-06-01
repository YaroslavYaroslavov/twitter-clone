var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthForm } from 'components/AuthForm';
import { AuthInput } from 'components/AuthInput';
import { BirtdaySelect } from 'components/BirthdaySelect';
import { paths } from 'constants/paths';
import { validatePatterns } from 'constants/validatePatterns';
import { createUserWithEmailAndPassword, linkWithPhoneNumber } from 'firebase/auth';
import { onValue, ref, set } from 'firebase/database';
import { checkOTP } from 'helpers/checkOTP';
import { checkIfValidYearPassed, getDaysArray, getYearsArray, monthIndex, } from 'helpers/dateHelper';
import { googleSignIn } from 'helpers/googleSignIn';
import { LoginButton } from 'pages/Login/styled';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { configSignupForm } from './config';
import { AlternativeLogin, BirthdayContainer, ErrorContainer, StyledSignupForm, TextContainer, } from './styled';
const { feed } = paths;
const { namePlaceholder, emailPlaceholder, passwordPlaceholder, dayPlaceholder, monthPlaceholder, yearPlaceholder, dateOfBirthNotation, dateOfBirthHeader, phonePlaceholder, useAlternative, headerText, } = configSignupForm;
export const SignupForm = () => {
    var _a;
    const { register, handleSubmit, formState: { errors, dirtyFields, isValid }, control, watch, getValues, } = useForm({
        mode: 'onChange',
        defaultValues: { year: new Date().getUTCFullYear().toString(), month: '0' },
    });
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const db = useSelector((state) => state.db);
    const dbUserReference = useSelector((state) => state.dbUserReference);
    const [daysArray, setDaysArray] = useState(getDaysArray(Number(getValues('month')), Number(getValues('year'))));
    useEffect(() => {
        const subscription = watch(({ month, year }) => setDaysArray(getDaysArray(Number(month), Number(year))));
        return () => subscription.unsubscribe();
    }, [watch]);
    const handleRegister = ({ email, password, phone, name, month, year, day, }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => __awaiter(void 0, void 0, void 0, function* () {
            const appVerify = window.recaptchaVerifier;
            linkWithPhoneNumber(user, phone, appVerify)
                .then((confirmationResult) => {
                confirmationResult
                    .confirm(checkOTP())
                    .then(() => {
                    onValue(dbUserReference, (snapshot) => {
                        const data = snapshot.val();
                        const usersCount = Object.keys(data).length;
                        set(ref(db, `users/${user.uid}`), {
                            username: name,
                            avatar: null,
                            userId: user.uid,
                            userlink: `id${usersCount + 1}`,
                            description: '',
                            phone: phone,
                            month,
                            day,
                            year,
                        });
                        navigate(feed);
                    });
                })
                    .catch((err) => {
                    user.delete();
                    console.error(err);
                });
            })
                .catch(() => {
                user.delete();
            });
        }))
            .catch(console.error);
    };
    return (React.createElement(AuthForm, { headerText: headerText },
        React.createElement(StyledSignupForm, { onSubmit: handleSubmit(handleRegister) },
            React.createElement(AuthInput, { placeholder: namePlaceholder, type: "name", register: register, error: errors.name, fieldName: "name", validatePattern: validatePatterns.namePattern, getValues: getValues }),
            React.createElement(AuthInput, { placeholder: phonePlaceholder, type: "phone", register: register, error: errors.phone, validatePattern: validatePatterns.phonePattern, fieldName: "phone", getValues: getValues }),
            React.createElement(AuthInput, { placeholder: emailPlaceholder, type: "email", register: register, error: errors.email, getValues: getValues, validatePattern: validatePatterns.emailPattern, fieldName: "email" }),
            React.createElement(AuthInput, { placeholder: passwordPlaceholder, type: "password", register: register, getValues: getValues, error: errors.password, fieldName: "password" }),
            React.createElement(TextContainer, null,
                React.createElement(AlternativeLogin, { onClick: googleSignIn }, useAlternative),
                React.createElement("h3", null, dateOfBirthHeader),
                React.createElement("p", null, dateOfBirthNotation)),
            React.createElement(BirthdayContainer, Object.assign({}, register('date', {
                validate: () => {
                    if (checkIfValidYearPassed(Number(getValues('day')), Number(getValues('month')), Number(getValues('year')))) {
                        return true;
                    }
                    else {
                        return 'You must be over 16 years old';
                    }
                },
            })),
                React.createElement(BirtdaySelect, { control: control, name: 'month', optionsArr: monthIndex, placeholder: monthPlaceholder, width: '180px', isDirty: (dirtyFields === null || dirtyFields === void 0 ? void 0 : dirtyFields.month) || false }),
                React.createElement(BirtdaySelect, { control: control, name: 'day', optionsArr: daysArray, placeholder: dayPlaceholder, width: '100px', isDirty: (dirtyFields === null || dirtyFields === void 0 ? void 0 : dirtyFields.day) || false }),
                React.createElement(BirtdaySelect, { name: "year", control: control, optionsArr: getYearsArray(1920), placeholder: yearPlaceholder, width: '100px', isDirty: (dirtyFields === null || dirtyFields === void 0 ? void 0 : dirtyFields.year) || false })),
            errors.date && React.createElement(ErrorContainer, null, (_a = errors.date) === null || _a === void 0 ? void 0 : _a.message),
            React.createElement(LoginButton, { disabled: !isValid, type: "submit" }, "Next"))));
};
