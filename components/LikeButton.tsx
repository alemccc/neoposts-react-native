import { useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import COLORS from '@/constants/colors';

import {
  useCheckIfPostIsLikedQuery,
  useLikePostMutation,
  useUnlikePostMutation,
 } from '@/store/apis/postsApi';

interface PostProps {
  itemId: number;
  likesCount?: number;
}

const LikeButton = ({ itemId, likesCount }: PostProps) => {
  const { t } = useTranslation();
  const { data } = useCheckIfPostIsLikedQuery({ postId: itemId });

  const [likePost, { isError: likeError }] = useLikePostMutation();
  const [unlikePost, { isError: unlikeError }] = useUnlikePostMutation();

  const likeUnlikePost = () => {
    if (data?.liked) {
      unlikePost({ postId: itemId });
    } else {
      likePost({ postId: itemId });
    }
  };

  useEffect(() => {
    if (likeError || unlikeError) {
      Toast.show({
        type: 'error',
        text2: t('error'),
      });
    }
  }, [likeError, unlikeError, t]);

  return (
    <View style={styles.likes}>
      <Ionicons
        name={data?.liked ? 'heart' : 'heart-outline'}
        size={18}
        color={COLORS.red}
        hitSlop={10}
        onPress={likeUnlikePost}
      />
      <Text>{likesCount}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  likes: {
    fontWeight: '600',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
});

export default LikeButton;
