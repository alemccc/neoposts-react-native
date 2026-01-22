import { useEffect } from 'react';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import SecureStorage from 'react-native-fast-secure-storage';
import Toast from 'react-native-toast-message';

import { useAppDispatch } from '@/hooks/useTypedRedux';

import { useSignOutMutation } from '@/store/apis/api';
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
      SecureStorage.clearStorage().then(() => {
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
