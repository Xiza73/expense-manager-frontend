import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';
import { useModal } from '@/store/modal/useModal';
import { noopFunction } from '@/utils/noop-function.util';

import Backdrop from '../Backdrop';
import { Button } from '../ui/button';
import { Text } from '../ui/text';

export interface ModalProps {
  open?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ open }) => {
  const { t } = useTranslation();

  const {
    isOpen,
    component,
    componentClassName,
    children,
    title,
    description,
    primaryLabel,
    primaryAction,
    secondaryLabel = t('cancel'),
    secondaryAction = noopFunction,
    closeModal,
    showCloseIcon,
  } = useModal();

  if (!isOpen && !open) return null;

  if (component)
    return (
      <Backdrop>
        <div
          className={cn(
            'w-auto max-w-full sm:max-w-[90%] md:max-w-[50%] flex flex-col relative',
            'bg-white border border-gray-200 rounded-md',
            'dark:bg-gray-800 dark:border-gray-700',
            'dark:text-gray-200',
            componentClassName || '',
          )}
        >
          {component}
        </div>
      </Backdrop>
    );

  return (
    <Backdrop>
      <div
        className={cn(
          'w-auto max-w-full sm:max-w-[90%] md:max-w-[50%] flex flex-col relative',
          'bg-white border border-gray-200 rounded-md',
          'dark:bg-gray-800 dark:border-gray-700',
          'dark:text-gray-200',
        )}
      >
        {title && (
          <Text
            as="h2"
            className="py-2 px-5 sm:px-12 md:px-16 border-b border-gray-200 text-center"
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            as="p"
            className="p-5"
          >
            {description}
          </Text>
        )}
        {children && <>{children}</>}
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
