import { monthsArray } from 'helpers/dateHelper';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyledSelect } from './styled';
export const BirtdaySelect = (props) => {
    const { optionsArr, placeholder, width, isDirty, control, name } = props;
    return (React.createElement(Controller, { name: name, rules: {
            required: true,
        }, control: control, render: ({ field }) => (React.createElement(StyledSelect, { width: width, onChange: (e) => {
                field.onChange(parseInt(e.target.value)); // to fix
            } },
            !isDirty && React.createElement("option", { value: "" }, placeholder),
            optionsArr.map((option) => {
                if (placeholder === 'Month') {
                    return (React.createElement("option", { value: option, key: option }, monthsArray[option]));
                }
                else {
                    return (React.createElement("option", { value: option, key: option }, option));
                }
            }))) }));
};
