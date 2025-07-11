import { useModalStore } from './useModalStore';

export const useModal = () => {
  const {
    isOpen,
    component,
    componentClassName,
    children,
    title,
    description,
    primaryLabel,
    primaryAction,
    secondaryLabel,
    secondaryAction,
    openModal,
    closeModal,
    showCloseIcon,
  } = useModalStore((state) => state);

  return {
    isOpen,
    component,
    componentClassName,
    children,
    title,
    description,
    primaryLabel,
    primaryAction,
    secondaryLabel,
    secondaryAction,
    openModal,
    closeModal,
    showCloseIcon,
  };
};
