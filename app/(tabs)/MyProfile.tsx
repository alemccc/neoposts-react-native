import { useEffect } from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';

import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import Loader from '@/components/Loader';
import MyPost from '@/components/MyPost';

import COLORS from '@/constants/colors';

import { useGetMyProfileQuery } from '@/store/apis/usersApi';

const MyProfile = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetMyProfileQuery();

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text2: t('myProfile.error'),
      });
    }
  }, [isError, t]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{data?.name}</Text>
        <Text style={styles.email}>{data?.email}</Text>
      </View>
      <View style={styles.followersContainer}>
        <View style={styles.separator}>
          <Text style={styles.label}>{t('myProfile.followers')}</Text>
          <Text style={styles.number}>{data?.followers.length}</Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.label}>{t('myProfile.following')}</Text>
          <Text style={styles.number}>{data?.followees.length}</Text>
        </View>
      </View>

      <View style={styles.posts}>
        <FlatList
          data={data?.posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MyPost item={item} />}
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
    color: COLORS.subtitle,
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
    color: COLORS.subtitle,
    fontSize: 16,
  },
  posts: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
  },
});

export default MyProfile;
