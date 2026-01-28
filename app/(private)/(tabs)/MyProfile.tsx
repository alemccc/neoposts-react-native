import UserProfile from '@/components/UserProfile';

import { useGetMyProfileQuery } from '@/store/apis/usersApi';

const MyProfile = () => {
  const { data, isLoading, isError } = useGetMyProfileQuery();

  return (
    <UserProfile
      data={data}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default MyProfile;
