import { LoginForm } from 'pages/Login/interfaces';
import { FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form';

interface Pattern {
  value: RegExp;
  message: string;
}
export interface AuthInputProps extends React.PropsWithRef<JSX.IntrinsicElements['input']> {
  placeholder: string;
  type: string;
  register: UseFormRegister<LoginForm>;
  error: FieldError | undefined;
  fieldName: keyof LoginForm;
  validatePattern?: Pattern;
  getValues: UseFormGetValues<LoginForm>;
}

export interface StyledAuthInputProps {
  error: FieldError | undefined;
}
