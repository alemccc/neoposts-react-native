import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  impactAsync,
  ImpactFeedbackStyle,
} from 'expo-haptics';

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

  const unfollow = () => {
    impactAsync(ImpactFeedbackStyle.Soft);
    unfollowUser({ userId });
  };

  const follow = () => {
    impactAsync(ImpactFeedbackStyle.Soft);
    followUser({ userId });
  };

  const isLoading = isLoadingFollow || isLoadingUnfollow || isLoadingUser;

  return (
    following ? (
      <Pressable
        style={[styles.following, styles.button]}
        onPress={unfollow}
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
        onPress={follow}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} />
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
    backgroundColor: COLORS.primary,
  },
  followingLabel: {
    color: COLORS.white,
  },
  followLabel: {
    color: COLORS.primary,
  },
  button: {
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 80,
  },
  follow: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },
});

export default FollowUnfollowButton;
