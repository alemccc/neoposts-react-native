import { Pressable, StyleSheet, Text, View } from 'react-native';

import COLORS from '@/constants/colors';

interface AuthFooterProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

const AuthFooter = ({ text, linkText, onPress }: AuthFooterProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>

    <Pressable
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={styles.link}>{linkText}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: COLORS.subtitle,
  },
  link: {
    fontSize: 16,
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
});

export default AuthFooter;
