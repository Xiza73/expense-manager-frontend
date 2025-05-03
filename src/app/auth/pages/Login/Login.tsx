import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ZodInputPassword from '@/components/ZodInputPassword';
import { commonValidators } from '@/contants/common-validators.constant';
import { useAuth } from '@/store/auth/useAuth';

const formSchema = z.object({
  token: commonValidators.token,
});
type FormData = z.infer<typeof formSchema>;

export const Login: React.FC = () => {
  const { t } = useTranslation();

  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    delayError: 100,
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    await signIn(data.token);
  };

  return (
    <PageContainer className="justify-center">
      <Card className="bg-gray-100 dark:bg-gray-900">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
              <h1 className="text-2xl font-bold dark:text-white">
                {t('login')}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('login_description')}
              </p>
              <ZodInputPassword
                register={register}
                name="token"
                placeholder="********"
                containerClassName="w-full"
                error={t(errors.token?.message || '')}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit(onSubmit)}
            >
              {t('login')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </PageContainer>
  );
};
