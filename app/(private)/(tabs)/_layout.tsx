import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

const PrivateLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: t('tabs.posts') }} />
      <Tabs.Screen name="MyProfile" options={{ title: t('tabs.myProfile') }} />
      <Tabs.Screen name="UsersList" options={{ title: t('tabs.users') }} />
    </Tabs>
  );
};

export default PrivateLayout;
