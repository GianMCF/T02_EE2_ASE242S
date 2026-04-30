import { View, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export default function ScreenWrapper({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
});