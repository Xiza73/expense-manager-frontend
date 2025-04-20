import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button } from './button';
import { Input, InputProps } from './input';
import { Label } from './label';

export interface InputPasswordProps extends InputProps {
  disableShowPassword?: boolean;
}

function InputPassword({
  className,
  containerClassName,
  ...props
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled = props.disableShowPassword;

  return (
    <div className={cn('relative flex', containerClassName)}>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('hide-password-toggle rounded-r-none', className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="hover:bg-transparent cursor-pointer z-20 justify-self-start rounded-md border border-l-0 rounded-l-none"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.disableShowPassword}
      >
        {showPassword && !disabled ? (
          <EyeIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        ) : (
          <EyeOffIcon
            className="h-4 w-4"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {showPassword ? 'Hide password' : 'Show password'}
        </span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  );
}

interface InputPasswordLabelProps extends InputPasswordProps {
  label: string;
}

function InputPasswordLabel({ label, ...props }: InputPasswordLabelProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        className="font-semibold"
        htmlFor={props.name}
      >
        {label}
      </Label>
      <InputPassword {...props} />
    </div>
  );
}

export { InputPassword, InputPasswordLabel };
