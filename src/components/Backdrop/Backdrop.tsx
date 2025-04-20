import { ChildrenProps } from '@/domain/children-props.interface';

export const Backdrop: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="fixed z-[999] inset-0 text-black w-full h-screen">
      <div className="flex items-center justify-center overflow-hidden inset-0 bg-gray-700 bg-opacity-40 w-full h-screen">
        {children}
      </div>
    </div>
  );
};
