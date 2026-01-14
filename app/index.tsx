import { StyleSheet, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

const Index = () => (
  <View style={styles.container}>
    <Ionicons name="checkmark-circle" size={36} color="green" />
    <Text style={styles.text}>Hello</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 24,
  },
});

export default Index;
