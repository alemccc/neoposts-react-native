import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { useSignOut } from '@/hooks/useSignOut';

const PrivateLayout = () => {
  const { handleSignOut } = useSignOut();

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={handleSignOut} style={styles.logOutButton}>
            <Ionicons name="log-out" size={24} color="black" />
          </Pressable>
        ),
        title: 'Home',
      }}
    />
  );
};

const styles = StyleSheet.create({
  logOutButton: {
    marginLeft: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivateLayout;
