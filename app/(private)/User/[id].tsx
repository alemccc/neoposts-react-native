import { useLocalSearchParams } from 'expo-router';

import UserProfile from '@/components/UserProfile';

import { useGetUserProfileQuery } from '@/store/apis/usersApi';

const User = () => {
  const { id } = useLocalSearchParams();
  const numberId = Number(id);

  const { data, isLoading, isError } = useGetUserProfileQuery({ userId: numberId });

  return (
    <UserProfile
      id={numberId}
      name={data?.name}
      email={data?.email}
      followers={data?.followers.length}
      followees={data?.followees.length}
      posts={data?.posts || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default User;
