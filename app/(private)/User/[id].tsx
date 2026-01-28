import { View, StyleSheet } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import UserProfile from '@/components/UserProfile';

import { useGetUserProfileQuery } from '@/store/apis/usersApi';

const User = () => {
  const { id } = useLocalSearchParams();
  const numberId = Number(id);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetUserProfileQuery({ userId: numberId });

  return (
    <View style={styles.container}>
      <UserProfile
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});

export default User;
