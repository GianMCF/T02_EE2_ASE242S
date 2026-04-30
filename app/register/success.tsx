import { View, Text, StyleSheet, Image } from "react-native";
import { router } from "expo-router";

import ScreenWrapper from "../../components/ui/ScreenWrapper";
import Button from "../../components/ui/Button";
import { typography } from "../../styles/typography";

export default function Success() {
  return (
    <ScreenWrapper>

      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/vawLogo.png')}
          style={styles.image}
        />
        <Text style={styles.brand}>
          VINUM AW
        </Text>
      </View>

      {/* CONTENIDO */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Su cuenta se ha creado exitosamente
        </Text>

        <Text style={styles.text}>
          Ahora puedes explorar la aplicación
        </Text>
      </View>

      {/* BOTÓN */}
      <View style={styles.footer}>
        <Button
          title="Continuar"
          onPress={() => router.replace("/login")}
        />
      </View>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  brand: {
    ...typography.title,
    fontSize: 28,
  },

  content: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    ...typography.title,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },

  text: {
    color: "#fff",
    textAlign: "center",
    maxWidth: 280,
  },

  image: {
    width: 180,
    height: 130,
    resizeMode: "contain",
    marginBottom: 10,
  },
});