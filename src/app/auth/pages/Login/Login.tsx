import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ZodInputPassword from '@/components/ZodInputPassword';
import { useAuth } from '@/store/auth/useAuth';

const formSchema = z.object({
  token: z
    .string({ message: '' })
    .min(1, 'Token is required')
    .max(36, 'Token must be 36 characters long'),
});
type FormData = z.infer<typeof formSchema>;

export const Login: React.FC = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    delayError: 100,
    mode: 'onChange',
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = async (data: FormData) => {
    await signIn(data.token);
  };

  return (
    <PageContainer className="justify-center">
      <Card className="bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="text-sm text-gray-500">
                Please enter a valid token to access the application.
              </p>
              <ZodInputPassword
                register={register}
                name="token"
                placeholder="********"
                containerClassName="w-full"
                error={errors.token?.message}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </PageContainer>
  );
};
