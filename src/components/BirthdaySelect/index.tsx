import { monthsArray } from 'helpers/dateHelper';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { SelectProps } from './interface';
import { StyledSelect } from './styled';

export const BirtdaySelect: FC<SelectProps> = (props) => {
  const { optionsArr, placeholder, width, isDirty, control, name } = props;

  return (
    <Controller
      name={name}
      rules={{
        required: true,
      }}
      control={control}
      render={({ field }) => (
        <StyledSelect
          width={width}
          onChange={(e) => {
            field.onChange(parseInt(e.target.value)); // to fix
          }}
        >
          {!isDirty && <option value="">{placeholder}</option>}

          {optionsArr.map((option) => {
            if (placeholder === 'Month') {
              return (
                <option value={option} key={option}>
                  {monthsArray[option]}
                </option>
              );
            } else {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            }
          })}
        </StyledSelect>
      )}
    />
  );
};
