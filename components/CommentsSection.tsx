import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import COLORS from '@/constants/colors';

interface PostProps {
  itemId: number;
  commentsCount: number;
}

const CommentSection = ({ itemId, commentsCount }: PostProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.commentsButton}
      onPress={() => router.push(`/Post/${itemId}`)}
    >
      <Text style={styles.commentsButtonText}>
        {commentsCount} {t('postsList.comment')}{commentsCount === 1 ? '' : 's'}
      </Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  commentsButton: {
    alignSelf: 'flex-start',
  },
  commentsButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default CommentSection;
