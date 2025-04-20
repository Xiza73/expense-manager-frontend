import { useModalStore } from './useModalStore';

export const useModal = () => {
  const {
    isOpen,
    component,
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
