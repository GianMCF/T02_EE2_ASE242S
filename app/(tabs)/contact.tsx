import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, Linking } from 'react-native';

export default function ContactScreen() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviar = () => {
    if (!nombre || !correo || !telefono || !mensaje) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    Alert.alert('Mensaje enviado', 'Gracias por contactarte con Bodega Reyna.');
    setNombre('');
    setCorreo('');
    setTelefono('');
    setMensaje('');
  };

  const abrirMapa = () => {
    Linking.openURL('https://www.google.com/maps/search/Bodega+Reina+de+Lunahuan%C3%A1');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contáctanos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Nº Telefónico"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Mensaje"
        value={mensaje}
        onChangeText={setMensaje}
        multiline
      />

      <Pressable style={styles.button} onPress={enviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </Pressable>

      <Pressable style={styles.mapButton} onPress={abrirMapa}>
        <Text style={styles.mapButtonText}>Ver ubicación en Google Maps</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#fff',
  },
  title: {
    color: '#b90000',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 7,
    padding: 13,
    marginBottom: 14,
    fontSize: 15,
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#b90000',
    padding: 14,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  mapButton: {
    marginTop: 15,
    padding: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#410303',
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#410303',
    fontWeight: 'bold',
  },
});