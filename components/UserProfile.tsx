import { useEffect } from 'react';

import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import MyPost from '@/components/MyPost';
import Post from '@/components/Post';

import COLORS from '@/constants/colors';
import type { PostData } from '@/constants/types';

import { RootState } from '@/store/store';

interface UserProfileProps {
  id?: number;
  followers?: number;
  followees?: number;
  name?: string;
  email?: string;
  posts: PostData[];
  isLoading?: boolean;
  isError?: boolean;
}

const UserProfile = ({
  id,
  followers = 0,
  followees = 0,
  name = '',
  email = '',
  posts,
  isLoading = false,
  isError = false,
}: UserProfileProps) => {
  const routes = useRouter();
  const { t } = useTranslation();
  const { userId } = useSelector((state: RootState) => state.auth);
  const isMyProfile = id === userId;

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text2: t('profile.error'),
      });
    }
  }, [isError, t]);

  if (isLoading) {
    return <Loader />;
  }

  const renderItem = (
    { item }: { item: PostData },
  ) => isMyProfile ?
    <MyPost item={item} />
    : <Post item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.followersContainer}>
        <View style={styles.separator}>
          <Text style={styles.label}>{t('profile.followers')}</Text>
          <Text style={styles.number}>{followers}</Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.label}>{t('profile.following')}</Text>
          <Text style={styles.number}>{followees}</Text>
        </View>
      </View>

      {isMyProfile && (
        <Pressable
          style={styles.createPostButton}
          onPress={() => routes.push('/CreatePost')}
        >
          <Text>{t('profile.createNewPost')}</Text>
        </Pressable>
    )}

      <View style={styles.posts}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text>{t('postsList.noPosts')}</Text>}
        />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 30,
  },
  header: {
    gap: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  separator: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followersContainer: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  number: {
    fontSize: 16,
    color: COLORS.blue,
  },
  createPostButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    width: '50%',
    borderColor: COLORS.blue,
    borderWidth: 1,
    alignItems: 'center',
  },
  posts: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
});

export default UserProfile;
