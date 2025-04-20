import { ChildrenProps } from '@/domain/children-props.interface';

export interface ContainerProps extends ChildrenProps {
  title?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, title }) => {
  return (
    <div className="container">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};
