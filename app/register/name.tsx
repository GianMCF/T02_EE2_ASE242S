import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import ScreenWrapper from "../../components/ui/ScreenWrapper";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { typography } from "../../styles/typography";

export default function RegisterName() {
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name) {
      alert("Ingresa tu nombre");
      return;
    }

    router.push({
      pathname: "/register/email",
      params: { name },
    });
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>¿Cómo te llamas?</Text>

      <Input
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
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