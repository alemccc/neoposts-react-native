import { View, StyleSheet } from 'react-native';

import COLORS from '@/constants/colors';

const Separator = () => (
  <View style={styles.separatorLine} />
);

const styles = StyleSheet.create({
  separatorLine: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
});

export default Separator;
