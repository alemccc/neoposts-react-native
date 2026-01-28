import {
  Text,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

import FollowUnfollowButton from '@/components/FollowUnfollowButton';

import COLORS from '@/constants/colors';
import type { UserShortData } from '@/constants/types';

import { useGetUserProfileQuery } from '@/store/apis/usersApi';
import { RootState } from '@/store/store';

interface UserProps {
  item: UserShortData;
}

const User = ({ item }: UserProps) => {
  const router = useRouter();
  const { userId } = useSelector((state: RootState) => state.auth);
  const isMyProfile = item.id === userId;

  const {
    data: userData,
    isFetching: isFetchingUserProfile,
  } = useGetUserProfileQuery({ userId: item.id });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.profileLink}
        onPress={() => router.push(`/User/${item.id}`)}
      >
        <Text
          style={styles.name}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text
          style={styles.email}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.email}
        </Text>
      </Pressable>

      {!isMyProfile && (
        <FollowUnfollowButton
          userId={item.id}
          following={userData?.followed}
          isLoadingUser={isFetchingUserProfile}
        />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  profileLink: {
    flex: 1,
    gap: 10,
    marginRight: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: COLORS.subtitle,
  },
});

export default User;
