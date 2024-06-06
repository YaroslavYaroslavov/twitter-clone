export const validatePatterns = {
    emailPattern: {
        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        message: 'The email should be in the form example@email.com ',
    },
    phonePattern: {
        value: /^\+\d+/,
        message: 'The phone should be in the form +1234567890 ',
    },
    namePattern: {
        value: /^[A-Za-z\sА-Яа-я]+$/,
        message: 'It must contain only the Latin or Cyrillic alphabet',
    },
};
