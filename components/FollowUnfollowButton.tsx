import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import COLORS from '@/constants/colors';

import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '@/store/apis/usersApi';

interface UserProps {
  userId: number;
  following?: boolean;
  isLoadingUser?: boolean;
}

const FollowUnfollowButton = ({
  userId,
  following,
  isLoadingUser,
}: UserProps) => {
  const { t } = useTranslation();

  const [followUser, { isLoading: isLoadingFollow }] = useFollowUserMutation();

  const [unfollowUser, { isLoading: isLoadingUnfollow }] = useUnfollowUserMutation();

  const isLoading = isLoadingFollow || isLoadingUnfollow || isLoadingUser;

  return (
    following ? (
      <Pressable
        style={[styles.following, styles.button]}
        onPress={() => unfollowUser({ userId })}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.followingLabel}>
            {t('profile.following')}
          </Text>
        )}
      </Pressable>
    ) : (
      <Pressable
        style={[styles.follow, styles.button]}
        onPress={() => followUser({ userId })}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.followLabel}>
            {t('profile.follow')}
          </Text>
        )}
      </Pressable>
    )
  );
};

export const styles = StyleSheet.create({
  following: {
    backgroundColor: COLORS.blue,
    width: 80,
  },
  followingLabel: {
    color: COLORS.white,
  },
  followLabel: {
    color: COLORS.blue,
  },
  button: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    height: 30,
  },
  follow: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.blue,
    width: 60,
  },
});

export default FollowUnfollowButton;
