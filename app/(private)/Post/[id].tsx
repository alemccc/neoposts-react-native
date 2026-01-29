import { useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

import CommentsList from '@/components/CommentsList';
import Loader from '@/components/Loader';

import COLORS from '@/constants/colors';

import { useGetPostQuery } from '@/store/apis/postsApi';

const PostScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: post, isLoading, isError } = useGetPostQuery({ postId: Number(id) });

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load post.',
      });
    }
  }, [isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.postContainer}>
        <Text style={styles.title}>{post?.title}</Text>
        <Text style={styles.body}>{post?.body}</Text>
        <Text style={styles.footer}>{post?.author?.name}</Text>
        <Text style={styles.footer}>
          {post?.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US') : ''}
        </Text>
      </View>

      <CommentsList post={post} isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 12,
    backgroundColor: COLORS.white,
  },
  postContainer: {
    borderRadius: 8,
    gap: 12,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  body: {
    color: COLORS.subtitle,
    fontSize: 18,
  },
  footer: {
    color: COLORS.border,
    fontSize: 14,
  },
});

export default PostScreen;
