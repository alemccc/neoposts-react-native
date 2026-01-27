import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useSignOut } from '@/hooks/useSignOut';

const PrivateLayout = () => {
  const { handleSignOut } = useSignOut();

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={handleSignOut} style={styles.logOutButton}>
            <Ionicons name="log-out" size={24} color="black" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Posts List' }} />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  logOutButton: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivateLayout;
