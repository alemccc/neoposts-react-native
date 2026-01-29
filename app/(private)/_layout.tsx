import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { useSignOut } from '@/hooks/useSignOut';

const PrivateLayout = () => {
  const { handleSignOut } = useSignOut();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={handleSignOut} style={styles.logOutButton}>
            <Ionicons name="log-out" size={24} color="black" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="(tabs)" options={{ title: '' }} />
      <Stack.Screen name="CreatePost" options={{ title: '' }} />
      <Stack.Screen name="User/[id]" options={{ title: '' }} />
      <Stack.Screen name="Post/[id]" options={{ title: '' }} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  logOutButton: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivateLayout;
