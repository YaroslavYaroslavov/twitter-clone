import { LoginForm } from 'components/pages/Login/interfaces';
import { Control } from 'react-hook-form';

export interface SelectProps {
  optionsArr: number[];
  placeholder: string;
  width: string;
  isDirty: boolean;
  control: Control<LoginForm>;
  name: keyof LoginForm;
}
export interface StyledSelectProps {
  width: string;
}
