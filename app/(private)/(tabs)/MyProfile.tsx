import UserProfile from '@/components/UserProfile';

import { useGetMyProfileQuery } from '@/store/apis/usersApi';

const MyProfile = () => {
  const { data, isLoading, isError } = useGetMyProfileQuery();

  return (
    <UserProfile
      id={data?.id}
      followers={data?.followers.length}
      followees={data?.followees.length}
      name={data?.name}
      email={data?.email}
      posts={data?.posts || []}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default MyProfile;
