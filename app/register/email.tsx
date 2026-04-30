import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import ScreenWrapper from "../../components/ui/ScreenWrapper";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { typography } from "../../styles/typography";

export default function RegisterEmail() {
  const { name } = useLocalSearchParams();
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!email) {
      alert("Ingresa tu correo");
      return;
    }

    router.push({
      pathname: "/register/password",
      params: { name, email },
    });
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>¿Cuál es tu correo?</Text>

      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />

      <Button title="Siguiente" onPress={handleNext} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    marginBottom: 30,
  },
});