import { cn } from '@/lib/utils';

export const PageContainer: React.FC<React.ComponentProps<'section'>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn(
        'w-full max-w-full min-h-full flex flex-col items-center justify-start py-8 px-4 md:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
