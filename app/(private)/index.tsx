import { StyleSheet, Text, View } from "react-native";

import { fonts } from "@/constants/fonts";
import TEXT from "@/constants/textConstants";

const { appWelcome } = TEXT;

const Home = () => (
  <View style={styles.container}>
    <Text style={styles.title}>{appWelcome}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default Home;
