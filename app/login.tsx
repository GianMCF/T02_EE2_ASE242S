import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import ScreenWrapper from "../components/ui/ScreenWrapper";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { typography } from "../styles/typography";
import { login } from "../services/AuthService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  if (!email || !password) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const data = await login(email, password);

    console.log("Usuario:", data);

    router.replace("/client");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <ScreenWrapper>
      <Text style={styles.title}>VINUM AW</Text>

      <Input
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.options}>
        <Text style={styles.text}>Recordarme</Text>

        <Pressable onPress={() => router.push("/forgot")}>
          <Text style={styles.link}>¿Olvidó la contraseña?</Text>
        </Pressable>
      </View>

      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <Pressable onPress={() => router.push("/register/name")}>
        <Text style={styles.register}>Registrarse</Text>
      </Pressable>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    textAlign: "center",
    marginBottom: 30,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  text: {
    color: "#fff",
  },
  link: {
    color: "#FCD240",
  },
  register: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
});