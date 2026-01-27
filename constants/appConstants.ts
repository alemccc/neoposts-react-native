export const PROFILE_TABS = {
  POSTS: 'posts',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
} as const;

export const ProfileTabs = Object.values(PROFILE_TABS);

export type ProfileTabsType = typeof PROFILE_TABS[keyof typeof PROFILE_TABS];
