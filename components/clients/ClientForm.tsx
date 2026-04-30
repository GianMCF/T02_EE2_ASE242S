import { View, TextInput, Pressable, Text } from "react-native";
import { useState, useEffect } from "react";
import { createClient, updateClient  } from "../../services/ClientService";
import { Picker } from '@react-native-picker/picker';
import { useFonts, Federo_400Regular } from '@expo-google-fonts/federo';
import { Urbanist_400Regular, Urbanist_700Bold } from '@expo-google-fonts/urbanist';

interface Props {
  existingClient?: Client | null;
  onSave: () => void;
  onCancel: () => void;
  existingClient?: any;
}

export default function ClientForm({ onSave, onCancel, existingClient }: Props) {

const [fontsLoaded] = useFonts({
    Federo_400Regular,
    Urbanist_400Regular,
    Urbanist_700Bold
  });

  const [form, setForm] = useState({
    name: "",
    surname: "",
    phoneNum: "",
    email: "",
    age: "",
    docType: "DNI",
    docNum: ""
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
        if (existingClient) {
          setForm({
            name: existingClient.name || "",
            surname: existingClient.surname || "",
            phoneNum: existingClient.phoneNum || "",
            email: existingClient.email || "",
            age: String(existingClient.age || ""),
            docType: existingClient.docType || "DNI",
            docNum: existingClient.docNum || ""
          });
        }
      }, [existingClient]);

  const validate = () => {
    let newErrors: any = {};

    if (!form.name) newErrors.name = "Nombre requerido";
    if (!form.surname) newErrors.surname = "Apellidos requeridos";
    if (!/^\d{9}$/.test(form.phoneNum))
      newErrors.phoneNum = "Teléfono inválido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email inválido";
    if (!form.age || Number(form.age) <= 0)
      newErrors.age = "Edad inválida";
    if (!form.docNum)
      newErrors.docNum = "Documento requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      ...form,
      age: Number(form.age)
    };

    try {
      if (existingClient) {
        // UPDATE
        await updateClient({
          ...payload,
          id: existingClient.id
        });

        console.log("🟢 UPDATE OK", existingClient.id);

      } else {
        // CREATE
        await createClient(payload);
        console.log("CREATE OK");
      }

      onSave();

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

   const docRules: any = {
      DNI: {
        length: 8,
        regex: /^\d{8}$/
      },
      CE: {
        length: 15,
        regex: /^\d{9,15}$/ //
      }
    };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {existingClient ? "Actualizar Cliente" : "Registrar Cliente"}
      </Text>

      <View style={styles.card}>

        {/* Nombre */}
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Ej: Juan"
          placeholderTextColor="#BABABA"
          value={form.name}
          onChangeText={(v) => handleChange("name", v)}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        {/* Apellido */}
        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={[styles.input, errors.surname && styles.inputError]}
          placeholder="Ej: Pérez López"
          placeholderTextColor="#BABABA"
          value={form.surname}
          onChangeText={(v) => handleChange("surname", v)}
        />
        {errors.surname && <Text style={styles.error}>{errors.surname}</Text>}

        {/* Teléfono */}
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={[styles.input, errors.phoneNum && styles.inputError]}
          placeholder="9 dígitos"
          placeholderTextColor="#BABABA"
          keyboardType="numeric"
          maxLength={9}
          value={form.phoneNum}
          onChangeText={(v) => handleChange("phoneNum", v)}
        />
        {errors.phoneNum && <Text style={styles.error}>{errors.phoneNum}</Text>}

        {/* Email */}
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="correo@email.com"
          placeholderTextColor="#BABABA"
          value={form.email}
          onChangeText={(v) => handleChange("email", v)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        {/* Edad */}
        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={[styles.input, errors.age && styles.inputError]}
          placeholder="Ej: 25"
          placeholderTextColor="#BABABA"
          keyboardType="numeric"
          maxLength={2}
          value={form.age}
          onChangeText={(v) => handleChange("age", v)}
        />
        {errors.age && <Text style={styles.error}>{errors.age}</Text>}

        {/* Tipo Doc */}
        <Text style={styles.label}>Tipo de Documento</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.docType}
            onValueChange={(value) => handleChange("docType", value)}
          >
            <Picker.Item label="DNI" value="DNI" />
            <Picker.Item label="CE" value="CE" />
          </Picker>
        </View>

        {/* Documento */}
        <Text style={styles.label}>Número de Documento</Text>
        <TextInput
          placeholder="Número de Documento"
          placeholderTextColor="#BABABA"
          style={styles.input}
          keyboardType="numeric"
          maxLength={docRules[form.docType].length}
          value={form.docNum}
          onChangeText={(v) => handleChange("docNum", v.replace(/[^0-9]/g, ""))}
        />
        {errors.docNum && <Text style={styles.error}>{errors.docNum}</Text>}

        {/* Botón */}
        <View style={{marginTop: 10 }}>

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {existingClient ? "Actualizar" : "Guardar"}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "#555"}]}
            onPress={onCancel}
          >
            <Text style={styles.CancelText}>Cancelar</Text>
          </Pressable>

        </View>

      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#320509",
    padding: 40,
    fontFamily: "Urbanist_700Bold"
  },

  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Urbanist_700Bold"
  },

  card: {
    backgroundColor: "#320509",
    padding: 10,
    borderRadius: 15,
  },

  label: {
    color: "#ccc",
    marginBottom: 4,
    marginTop: 10,
    fontFamily: "Urbanist_700Bold",
    fontSize: 15
  },

  input: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444",
    fontFamily: "Urbanist_400Regular"
  },

  inputError: {
    borderColor: "red",
  },

  error: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 3,
    fontFamily: "Urbanist_700Bold"
  },

  pickerContainer: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444"
  },

  button: {
    backgroundColor: "#FCD240",
    padding: 14,
    borderRadius: 12,
    marginTop: 20
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold"
  },

  CancelText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }
};