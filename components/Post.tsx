import { View, Text, StyleSheet } from 'react-native';

import LikeButton from '@/components/LikeButton';

import COLORS from '@/constants/colors';
import type { PostData } from '@/constants/types';

interface PostProps {
  item: PostData;
}

const Post = ({ item }: PostProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.body}>{item.body}</Text>
    <Text style={styles.footer}>
      {typeof item.author === 'string' ? item.author : item.author?.name}
    </Text>
    <Text style={styles.footer}>
      {item.publishedAt
        ? new Date(item.publishedAt).toLocaleDateString('en-US')
        : ''}
    </Text>

    <LikeButton itemId={item.id} likesCount={item.likesCount} />
  </View>
);

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 2,
    gap: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    color: COLORS.subtitle,
  },
  footer: {
    color: COLORS.border,
    fontSize: 12,
  },
});

export default Post;
