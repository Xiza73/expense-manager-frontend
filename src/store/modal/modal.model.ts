import { HTMLAttributes } from 'react';

interface ModalStateOptions {
  minWidth?: number;
}

type ClassName = HTMLAttributes<HTMLDivElement>['className'];

export interface ModalState {
  isOpen: boolean;
  options: ModalStateOptions;
  showCloseIcon?: boolean;
  component?: React.ReactNode;
  componentClassName?: ClassName;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryAction?: () => void;
  secondaryLabel?: string;
  secondaryAction?: () => void;
}

interface SetModal {
  component?: React.ReactNode;
  children?: React.ReactNode;
  options?: ModalState['options'];
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryAction?: () => void;
  secondaryLabel?: string;
  secondaryAction?: () => void;
  showCloseIcon?: boolean;
}

export interface ModalStore extends ModalState {
  openModal: (data: SetModal) => void;
  closeModal: () => void;
  updateModal: (data: SetModal) => void;
}
