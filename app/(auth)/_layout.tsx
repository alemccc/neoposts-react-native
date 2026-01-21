import { Stack } from 'expo-router';

const AuthLayout = () => (
  <Stack screenOptions={{ headerShown: false }} initialRouteName="SignIn">
    <Stack.Screen name="SignIn" />
    <Stack.Screen name="SignUp" />
  </Stack>
);

export default AuthLayout;
