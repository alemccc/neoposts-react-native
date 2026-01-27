import { useEffect, useState } from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';

import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import MyPost from '@/components/MyPost';
import Post from '@/components/Post';
import ProfileTabButtons from '@/components/ProfileTabButtons';
import Separator from '@/components/Separator';
import User from '@/components/User';
import UserProfileHeader from '@/components/UserProfileHeader';

import { type ProfileTabsType, PROFILE_TABS } from '@/constants/appConstants';
import COLORS from '@/constants/colors';
import type { PostData, UserShortData } from '@/constants/types';

import { RootState } from '@/store/store';

interface UserProfileProps {
  id?: number;
  followers?: UserShortData[];
  followees?: UserShortData[];
  name?: string;
  email?: string;
  posts: PostData[];
  isLoading?: boolean;
  isError?: boolean;
}

const UserProfile = ({
  id,
  followers,
  followees,
  name = '',
  email = '',
  posts,
  isLoading = false,
  isError = false,
}: UserProfileProps) => {
  const { t } = useTranslation();
  const { userId } = useSelector((state: RootState) => state.auth);
  const isMyProfile = id === userId;

  const [selectedTab, setSelectedTab] = useState<ProfileTabsType>(PROFILE_TABS.POSTS);

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
      <UserProfileHeader
        followers={followers?.length}
        followees={followees?.length}
        name={name}
        email={email}
        isMyProfile={isMyProfile}
      />

      <View style={styles.tabSection}>
        <ProfileTabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {selectedTab === PROFILE_TABS.POSTS && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.noItemsText}>
                {t('postsList.noPosts')}
              </Text>
            }
            style={styles.list}
            ItemSeparatorComponent={Separator}
          />
        )}

        {selectedTab === PROFILE_TABS.FOLLOWERS && (
          <FlatList
            data={followers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <User item={item} />}
            ListEmptyComponent={
              <Text style={styles.noItemsText}>
                {t('profile.notFollowers')}
              </Text>
            }
            style={styles.list}
            ItemSeparatorComponent={Separator}
          />
        )}

        {selectedTab === PROFILE_TABS.FOLLOWING && (
          <FlatList
            data={followees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <User item={item} />}
            ListEmptyComponent={
              <Text style={styles.noItemsText}>
                {t('profile.notFollowing')}
              </Text>
            }
            style={styles.list}
            ItemSeparatorComponent={Separator}
          />
        )}
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
  noItemsText: {
    paddingLeft: 10,
  },
  tabSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  list: {
    padding: 10,
  },
});

export default UserProfile;
