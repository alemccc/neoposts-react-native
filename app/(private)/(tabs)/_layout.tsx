import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

const PrivateLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: t('tabs.posts') }} />
      <Tabs.Screen name="MyProfile" options={{ title: t('tabs.myProfile') }} />
    </Tabs>
  );
};

export default PrivateLayout;
