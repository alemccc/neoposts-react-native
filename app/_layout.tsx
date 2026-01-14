import { useEffect } from 'react';

import {
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import { Stack } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from '../store/store';

preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </Provider>
    </SafeAreaView>
  );
};

export default RootLayout;
