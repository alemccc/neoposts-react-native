import { useEffect } from 'react';

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

import { useGetPostsInfiniteQuery } from '@/store/apis/postsApi';

const PostsList = () => {
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetPostsInfiniteQuery({});

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text2: t('postsList.error'),
      });
    }
  }, [isError, t]);

  if (isLoading) {
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
        refreshing={isFetching}
        onRefresh={refetch}
        ListFooterComponent={
          isFetchingNextPage ? (
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
