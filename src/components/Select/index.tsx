import React, { FC } from 'react';

import { CustomSelectProps } from './interface';
import { StyledCustomSelect } from './styled';

export const CustomSelect: FC<CustomSelectProps> = ({ optionsArr, placeholder, width }) => {
  return (
    <StyledCustomSelect width={width}>
      <option value="">{placeholder}</option>

      {optionsArr.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </StyledCustomSelect>
  );
};
