import { useState } from 'react';

import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import ProfileImagePicker from '@/components/ProfileImagePicker';

import COLORS from '@/constants/colors';

import defaultProfilePic from '@/assets/images/default-profile.png';

interface UserProfileProps {
  followers?: number;
  followees?: number;
  name?: string;
  email?: string;
  isMyProfile?: boolean;
}

const UserProfileHeader = ({
  followers = 0,
  followees = 0,
  name = '',
  email = '',
  isMyProfile = false,
}: UserProfileProps) => {
  const routes = useRouter();
  const { t } = useTranslation();
  const [profileImageUri, setProfileImageUri] = useState<string>('');

  return (
    <>
      <View style={styles.header}>
        <Image
          source={profileImageUri ?
              { uri: profileImageUri }
              : defaultProfilePic
            }
          style={styles.profileImage}
        />

        <View style={styles.userData}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      {isMyProfile && (
        <ProfileImagePicker
          onChange={setProfileImageUri}
        />
      )}

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
    </>
  );
};

export const styles = StyleSheet.create({
  header: {
    gap: 10,
    flexDirection: 'row',
  },
  userData: {
    alignItems: 'center',
    gap: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#eee',
    alignSelf: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
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
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    width: '50%',
    borderColor: COLORS.blue,
    borderWidth: 1,
    alignItems: 'center',
  },
});

export default UserProfileHeader;
