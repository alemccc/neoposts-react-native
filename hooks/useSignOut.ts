import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { useAppDispatch } from '@/hooks/useTypedRedux';

import { useSignOutMutation } from '@/store/apis/authApi';
import { clearCredentials } from '@/store/slices/authSlice';

export const useSignOut = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signOut, { isSuccess, isError }] = useSignOutMutation();

  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    if (isSuccess) {
      AsyncStorage.clear().then(() => {
        dispatch(clearCredentials());

        router.replace('/(auth)/SignIn');
      });
    }
  }, [isSuccess, router, dispatch]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: t('error'),
      });
    }
  }, [isError, t]);

  return { handleSignOut };
};
