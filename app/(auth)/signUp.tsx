import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

import FormField from '@/components/formField';
import TEXT from '@/constants/textConstants';
import {
  signUpSchema,
  type SignUpFormValues,
} from '@/constants/validations';
import { useSignUpMutation } from '@/store/apis/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

import { styles } from './signUp.styles';

const signUpFormFields = [
  { name: 'name', label: 'Name', secureTextEntry: false },
  { name: 'email', label: 'Email', secureTextEntry: false },
  { name: 'password', label: 'Password', secureTextEntry: true },
  { name: 'confirmPassword', label: 'Confirm Password', secureTextEntry: true },
] as const;

const {
  title,
  subtitle,
  signUp: signUpText,
  error: errorMessage,
} = TEXT.signUp;

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState<string | null>(null);

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
      dispatch(setCredentials(data));

      router.replace('/');
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      setApiError(errorMessage);
    }
  }, [isError]);

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
      automaticallyAdjustKeyboardInsets
    >
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      {apiError && (
        <View style={styles.apiErrorContainer}>
          <Text style={styles.apiErrorText}>{apiError}</Text>
        </View>
      )}

      {signUpFormFields.map(({ name, label, secureTextEntry }) => (
        <FormField
          key={name}
          name={name}
          label={label}
          error={errors[name]}
          secureTextEntry={secureTextEntry}
          control={control}
        />
      ))}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.submitButton,
          isLoading && styles.submitButtonDisabled,
        ]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={{ fontSize: 18 }}>{signUpText}</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default SignUp;
