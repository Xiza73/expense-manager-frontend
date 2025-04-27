import { Icon } from '@iconify/react/dist/iconify.js';

import { useModal } from '@/store/modal/useModal';
import { noopFunction } from '@/utils/noop-function.util';

import Backdrop from '../Backdrop';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Container } from './Container';

export interface ModalProps {
  open?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ open }) => {
  const {
    isOpen,
    component,
    title,
    description,
    primaryLabel,
    primaryAction,
    secondaryLabel = 'Cancel',
    secondaryAction = noopFunction,
    closeModal,
    showCloseIcon,
  } = useModal();

  if (!isOpen && !open) return null;

  if (component)
    return (
      <Backdrop>
        <Container>
          <button onClick={closeModal}>Close</button>
          {component}
        </Container>
      </Backdrop>
    );

  return (
    <Backdrop>
      <div className="w-auto max-w-full sm:max-w-[90%] md:max-w-[50%] flex flex-col relative bg-white border border-gray-200 rounded-md">
        {title && (
          <>
            <Text
              as="h2"
              className="py-2 px-5 sm:px-12 md:px-16 border-b border-gray-200 text-center"
            >
              {title}
            </Text>
          </>
        )}
        {description && (
          <Text
            as="p"
            className="p-5"
          >
            {description}
          </Text>
        )}
        <div className="flex justify-end gap-4 p-5">
          {primaryLabel && (
            <Button
              onClick={() => {
                primaryAction?.();
                closeModal();
              }}
            >
              {primaryLabel}
            </Button>
          )}
          {secondaryLabel && (
            <Button
              variant="destructive"
              onClick={() => {
                secondaryAction?.();
                closeModal();
              }}
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
        {showCloseIcon && (
          <div className="absolute top-2 right-3">
            <button onClick={closeModal}>
              <Icon
                icon="material-symbols:close"
                fontSize={20}
              />
            </button>
          </div>
        )}
      </div>
    </Backdrop>
  );
};
