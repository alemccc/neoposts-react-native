import { View, Text, StyleSheet } from 'react-native';

import LikeButton from '@/components/LikeButton';

import COLORS from '@/constants/colors';
import type { PostData } from '@/constants/types';

interface PostProps {
  item: PostData;
}

const MyPost = ({ item }: PostProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.body}>{item.body}</Text>

    <Text style={styles.id}>ID: {item.id}</Text>

    <LikeButton itemId={item.id} likesCount={item.likesCount} />
  </View>
);

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    gap: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    color: COLORS.subtitle,
  },
  id: {
    color: COLORS.border,
    fontSize: 12,
  },
});

export default MyPost;
