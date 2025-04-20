import { cn } from '@/lib/utils';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'li';
type StyleVariant = 'lead' | 'muted';

export type TextProps = {
  id?: string;
  as?: Variant;
  styleVariant?: StyleVariant;
  className?: string;
  children: React.ReactNode;
};

const variantStyles: Record<Variant, string> = {
  h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold tracking-tight',
  p: '',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  li: 'my-6 ml-6 list-disc mt-2',
};

const styleVariants: Record<StyleVariant, string> = {
  lead: 'text-xl text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
};

export const Text: React.FC<TextProps> = ({
  id,
  as: Component = 'p',
  styleVariant,
  className,
  children,
}) => {
  return (
    <Component
      id={id}
      className={cn(
        variantStyles[Component],
        styleVariant ? styleVariants[styleVariant] : '',
        className,
      )}
    >
      {children}
    </Component>
  );
};
