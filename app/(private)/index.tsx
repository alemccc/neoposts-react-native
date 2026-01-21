import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import COLORS from '@/constants/colors';
import { fonts } from '@/constants/fonts';

const Home = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('common.appWelcome')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.subtitle,
  },
});

export default Home;
