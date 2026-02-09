import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import {
  notificationAsync,
  NotificationFeedbackType,
} from 'expo-haptics';

import Loader from '@/components/Loader';

import COLORS from '@/constants/colors';
import type { CommentData, PostData } from '@/constants/types';

import { useCommentPostMutation } from '@/store/apis/postsApi';

interface CommentsListProps {
  post?: PostData;
  isLoading: boolean;
}

const CommentsList = ({
  post,
  isLoading,
}: CommentsListProps) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const [commentPost, { isLoading: isCommenting, isError }] = useCommentPostMutation();

  const handleComment = async () => {
    if (!comment.trim() || !post) {
      return;
    }

    commentPost({ postId: post.id, body: comment });
    notificationAsync(NotificationFeedbackType.Success); 
    setComment('');
  };

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: t('comment.error'),
      });
    }
  }, [isError, t]);

  if (isLoading) {
    return <Loader />;
  }

  const renderComment = ({ item }: { item: CommentData }) => (
    <View style={styles.comment}>
      <Text style={styles.commentUser}>
        {item.author?.name}
      </Text>
      <Text>{item.comment}</Text>
    </View>
  );

  return (
    <>
      <Text style={styles.commentsTitle}>{t('comment.comments')}</Text>

      <FlatList
        data={post?.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderComment({ item })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder={t('comment.addComment')}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleComment}
          disabled={isCommenting}
        >
          <Text style={styles.buttonText}>
            {isCommenting ? '...' : t('comment.submit')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 18,
  },
  comment: {
    borderRadius: 6,
    padding: 8,
    gap: 10,
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  inputContainer: {
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default CommentsList;
