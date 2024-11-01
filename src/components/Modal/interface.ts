export interface ModalProps {
  active: boolean;
  setActive: (state: boolean) => void;
  children: React.ReactNode;
}

export interface ModalContainerProps {
  active: boolean;
}
