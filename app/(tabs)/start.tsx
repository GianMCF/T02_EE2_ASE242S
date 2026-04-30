import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { useFonts, Federo_400Regular } from '@expo-google-fonts/federo';
import { Urbanist_400Regular, Urbanist_700Bold } from '@expo-google-fonts/urbanist';
import { router } from "expo-router";

export default function Start() {

  const [fontsLoaded] = useFonts({
    Federo_400Regular,
    Urbanist_400Regular,
    Urbanist_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/images/vawLogo.png')}
        style={styles.image}
      />

      <Text style={styles.title}>
        VINUM AW
      </Text>

      <Text style={styles.description}>
        Conoce nuestros horarios y descubre la tradición artesanal del vino y pisco de Lunahuaná.
      </Text>

      <Pressable style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#320505',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  image: {
    width: 220,
    height: 160,
    borderRadius: 10,
    marginBottom: 20
  },

  title: {
    fontFamily: "Federo_400Regular",
    fontSize: 40,
    color: '#ffffff',
    textAlign: 'center'
  },

  description: {
    fontSize: 16,
    fontFamily: "Urbanist_400Regular",
    textAlign: 'center',
    marginVertical: 15,
    color: '#fff'
  },

  button: {
    backgroundColor: '#FCD240',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8
  },

  buttonText: {
    color: '#000',
    fontFamily: "Urbanist_700Bold",
    fontSize: 16
  }

});