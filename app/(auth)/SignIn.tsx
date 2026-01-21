import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AuthFooter from '@/components/AuthFooter';
import Form from '@/components/Form';

import { signInSchema, type SignInFormValues } from '@/constants/validations';

import { useSignInMutation } from '@/store/apis/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<string | null>(null);

  const signInFormFields = [
    {
      name: 'email',
      label: t('signIn.fields.email'),
      secureTextEntry: false,
    },
    {
      name: 'password',
      label: t('signIn.fields.password'),
      secureTextEntry: true,
    },
  ] as const;

  const [signIn, { data, isError, isLoading, isSuccess }] = useSignInMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    signIn({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      setApiError(t('signIn.error'));
    }
  }, [isError, t]);

  return (
    <Form<SignInFormValues>
      errorMessage={apiError}
      formFields={signInFormFields}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      errors={errors}
      buttonText={t('signIn.signIn')}
      control={control}
    >
      <AuthFooter
        text={t('signIn.notRegistered')}
        linkText={t('signUp.signUp')}
        onPress={() => router.push('/SignUp')}
      />
    </Form>
  );
};

export default SignIn;
