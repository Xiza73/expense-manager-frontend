import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Input, InputProps } from '../ui/input';
import { Label } from '../ui/label';

export interface ZodInputProps<TFieldValues extends FieldValues>
  extends InputProps {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
}

export const ZodInput = <TFieldValues extends FieldValues>({
  register,
  name,
  ...props
}: ZodInputProps<TFieldValues>) => {
  return (
    <Input
      {...props}
      {...register(name)}
      onChange={(e) => {
        register(name).onChange(e);
      }}
    />
  );
};

export interface ZodInputLabelProps<TFieldValues extends FieldValues>
  extends ZodInputProps<TFieldValues> {
  label: string;
}

export const ZodInputLabel = <TFieldValues extends FieldValues>({
  label,
  ...props
}: ZodInputLabelProps<TFieldValues>) => {
  return (
    <div className="flex flex-col gap-2">
      <Label
        className="font-semibold"
        htmlFor={props.name}
      >
        {label}
      </Label>
      <ZodInput {...props} />
    </div>
  );
};
