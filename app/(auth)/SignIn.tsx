import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useLocalAuth } from '@/hooks/useLocalAuth';
import { useAppDispatch } from '@/hooks/useTypedRedux';

import AuthFooter from '@/components/AuthFooter';
import Form from '@/components/Form';

import { signInSchema, type SignInFormValues } from '@/constants/validations';

import { useSignInMutation } from '@/store/apis/api';
import { saveSession } from '@/store/slices/authSlice';

const SignIn = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<string | null>(null);
  const { authenticate, isAuthenticating, error: localAuthError } = useLocalAuth();

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

  // Only require Face ID on email focus, not on submit
  const onSubmit = async (data: SignInFormValues) => {
    signIn({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveSession(data.data));

      router.replace('/(private)/(tabs)');
    }
  }, [isSuccess, data, dispatch, router]);

  useEffect(() => {
    if (isError) {
      setApiError(t('signIn.error'));
    }
  }, [isError, t]);

  const handleEmailFocus = async () => {
    await authenticate('Authenticate to sign in');
  };

  return (
    <Form<SignInFormValues>
      errorMessage={apiError || localAuthError}
      formFields={signInFormFields}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading || isAuthenticating}
      errors={errors}
      buttonText={t('signIn.signIn')}
      control={control}
      onEmailFocus={handleEmailFocus}
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
