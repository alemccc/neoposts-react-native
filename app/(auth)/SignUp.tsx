import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/hooks/useTypedRedux';

import AuthFooter from '@/components/AuthFooter';
import Form from '@/components/Form';

import { signUpSchema, type SignUpFormValues } from '@/constants/validations';

import { useSignUpMutation } from '@/store/apis/api';
import { saveSession } from '@/store/slices/authSlice';

const SignUp = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<string | null>(null);

  const signUpFormFields = [
    { name: 'name', label: t('signUp.fields.name'), secureTextEntry: false },
    { name: 'email', label: t('signUp.fields.email'), secureTextEntry: false },
    {
      name: 'password',
      label: t('signUp.fields.password'),
      secureTextEntry: true,
    },
    {
      name: 'confirmPassword',
      label: t('signUp.fields.confirmPassword'),
      secureTextEntry: true,
    },
  ] as const;

  const [signUp, { data, isError, isLoading, isSuccess }] = useSignUpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    signUp({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
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
      setApiError(t('signUp.error'));
    }
  }, [isError, t]);

  return (
    <Form<SignUpFormValues>
      errorMessage={apiError}
      formFields={signUpFormFields}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      errors={errors}
      control={control}
      buttonText={t('signUp.signUp')}
    >
      <AuthFooter
        text={t('signUp.alreadyRegistered')}
        linkText={t('signIn.signIn')}
        onPress={() => router.push('/SignIn')}
      />
    </Form>
  );
};

export default SignUp;
