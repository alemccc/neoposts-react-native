import { useEffect } from 'react';

import { useRouter } from 'expo-router';
import { deleteItemAsync } from 'expo-secure-store';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { useAppDispatch } from '@/hooks/useTypedRedux';

import { useSignOutMutation , api } from '@/store/apis/api';
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
      Promise.all([
        deleteItemAsync('access-token'),
        deleteItemAsync('uid'),
        deleteItemAsync('client'),
        deleteItemAsync('user-id'),
      ]).then(() => {
        dispatch(clearCredentials());
        dispatch(api.util.resetApiState());

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
