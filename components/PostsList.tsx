import { useEffect, useState } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import Post from '@/components/Post';

import type { PostData } from '@/constants/types';

import { useGetPostsQuery } from '@/store/apis/postsApi';

const PostsList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostData[]>([]);
  const { data, isFetching, isLoading, isError } = useGetPostsQuery({
    page,
  });
  const pagination = data?.pagination;

  const loadMore = () => {
    if (!pagination || isFetching || page >= pagination.totalPages) {
      return;
    }

    setPage((prev) => prev + 1);
  };

  const refresh = () => {
    setPage(1);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    setPosts((prev) => [...prev, ...data.posts]);
  }, [data]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text2: t('postsList.error'),
      });
    }
  }, [isError, t]);

  if (isLoading && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post item={item} />}
        ListEmptyComponent={<Text>{t('postsList.noPosts')}</Text>}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        refreshing={isFetching && page === 1}
        onRefresh={refresh}
        ListFooterComponent={
          isFetching && page > 1 ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : null
        }
      />
      <Toast />
    </View>
  );
};

export const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  activityIndicator: {
    marginVertical: 16,
  },
});

export default PostsList;
