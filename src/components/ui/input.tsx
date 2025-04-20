import * as React from 'react';

import { cn } from '@/lib/utils';

import { Label } from './label';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  containerClassName?: string;
}

function Input({
  className,
  type,
  error,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn('w-full', containerClassName)}>
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {error && <div className="text-xs text-red-500 mt-1">* {error}</div>}
    </div>
  );
}

interface InputLabelProps extends InputProps {
  label: string;
}

function InputLabel({ label, ...props }: InputLabelProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        className="font-semibold"
        htmlFor={props.name}
      >
        {label}
      </Label>
      <Input {...props} />
    </div>
  );
}

export { Input, InputLabel };
