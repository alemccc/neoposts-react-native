import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
 } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { scrollToTop } from '@/utils/utils';

import Loader from '@/components/Loader';
import User from '@/components/User';

import COLORS from '@/constants/colors';
import type { UserData } from '@/constants/types';

import { useGetUsersInfiniteQuery } from '@/store/apis/usersApi';

const Users = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const flatListRef = useRef<FlatList<UserData>>(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetUsersInfiniteQuery({ search: debouncedSearch });

  const users = data?.pages.flatMap((page) => page.users) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);

      scrollToTop(flatListRef);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchValue]);

  useFocusEffect(
    useCallback(() => {
      scrollToTop(flatListRef);
    }, []),
  );

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text2: t('usersList.error'),
      });
    }
  }, [isError, t]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t('usersList.searchPlaceholder')}
        onChangeText={setSearchValue}
        value={searchValue}
        style={styles.searchInput}
      />

      <FlatList
        ref={flatListRef}
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <User item={item} />}
        ListEmptyComponent={!isLoading && !isFetching ? (
          <Text>{t('usersList.noUsers')}</Text>
        ) : null}
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
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 20,
  },
  activityIndicator: {
    marginVertical: 16,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default Users;
