import { View, Text, StyleSheet } from 'react-native';

import COLORS from '@/constants/colors';
import type { MyPostsData } from '@/constants/types';

interface PostProps {
  item: MyPostsData;
}

const MyPost = ({ item }: PostProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.body}>{item.body}</Text>

    <Text style={styles.id}>{item.id}</Text>
  </View>
);

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    color: COLORS.subtitle,
    marginTop: 4,
  },
  id: {
    color: COLORS.border,
    marginTop: 8,
    fontSize: 12,
  },
});

export default MyPost;
