import { Dispatch, SetStateAction } from 'react';

import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useTranslation } from 'react-i18next';

import { type ProfileTabsType, ProfileTabs } from '@/constants/appConstants';
import COLORS from '@/constants/colors';

interface UserProfileProps {
  selectedTab: ProfileTabsType;
  setSelectedTab: Dispatch<SetStateAction<ProfileTabsType>>;
}

const ProfileTabButtons = ({
  selectedTab,
  setSelectedTab,
}: UserProfileProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.tabContainer}>
      {ProfileTabs.map((tab) => (
        <Pressable
          key={tab}
          style={[
            styles.tabButton,
            selectedTab === tab && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text style={[
            styles.tabText,
            selectedTab === tab && styles.tabTextActive,
          ]}
          >
            {t(`profile.${tab}`)}
          </Text>
        </Pressable>
        ))}
    </View>
  );
};

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    borderTopStartRadius: 8,
    borderTopRightRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  tabText: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: COLORS.primary,
  },
});

export default ProfileTabButtons;
