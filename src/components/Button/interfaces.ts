export interface LoginButtonProps {
  title: string;
  iconSrc?: string;
  callback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  redirect?: string;
}
