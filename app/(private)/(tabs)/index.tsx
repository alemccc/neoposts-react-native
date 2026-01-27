import { useEffect } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import Loader from '@/components/Loader';
import Post from '@/components/Post';

import COLORS from '@/constants/colors';

import { useGetPostsInfiniteQuery } from '@/store/apis/postsApi';

const PostsList = () => {
  const { t } = useTranslation();
  const router = useRouter();

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
    return <Loader />;
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

      <Pressable
        style={styles.createPostButton}
        onPress={() => router.push('/CreatePost')}
        accessibilityLabel={t('postsList.createPost')}
        hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
      >
        <Text style={styles.createPostButtonLabel}>+</Text>
      </Pressable>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  createPostButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 100,
  },
  createPostButtonLabel: {
    color: COLORS.white,
    fontSize: 26,
    marginBottom: 3,
  },
  activityIndicator: {
    marginVertical: 16,
  },
});

export default PostsList;
