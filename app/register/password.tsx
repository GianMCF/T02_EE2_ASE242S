import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import ScreenWrapper from "../../components/ui/ScreenWrapper";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { typography } from "../../styles/typography";
import { register } from "../../services/AuthService";

export default function RegisterPassword() {
  const { name, email } = useLocalSearchParams();
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!password || password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const user = {
        username: name,
        email: email,
        password: password,
        role: "user",
        status: true,
      };

      await register(user);

      router.replace("/register/success");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Crea una contraseña</Text>

      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Registrarme" onPress={handleRegister} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.text,
    marginBottom: 30,
  },
});