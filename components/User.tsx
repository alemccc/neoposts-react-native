import { View, Text, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import COLORS from '@/constants/colors';
import type { UserData } from '@/constants/types';

interface UserProps {
  item: UserData;
}

const User = ({ item }: UserProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      {item.followed && (
        <Text style={styles.followed}>
          {t('usersList.following')}
        </Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 12,
    gap: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: COLORS.subtitle,
  },
  followed: {
    color: COLORS.border,
    marginTop: 8,
    fontSize: 12,
  },
});

export default User;
