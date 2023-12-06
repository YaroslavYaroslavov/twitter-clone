export interface AuthInputProps extends React.PropsWithRef<JSX.IntrinsicElements['input']> {
  placeholder: string;
  type: string;
  setState?: (state: string) => void;
}
