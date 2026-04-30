import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Alert,
  RefreshControl,
  Modal
} from "react-native";
import { useEffect, useState } from "react";
import {
  getClients,
  deleteClient,
  restoreClient
} from "../../services/ClientService";
import ClientForm from "./ClientForm";
import { Client } from "../../models/Client";
import { useFonts, Federo_400Regular } from '@expo-google-fonts/federo';
import { Urbanist_400Regular, Urbanist_700Bold } from '@expo-google-fonts/urbanist';

export default function ClientList() {

const [fontsLoaded] = useFonts({
    Federo_400Regular,
    Urbanist_400Regular,
    Urbanist_700Bold
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);


  const [confirmVisible, setConfirmVisible] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "restore" | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);


  // FILTRO POR ESTADO
  const [showDeleted, setShowDeleted] = useState(false);
  // CARGAR CLIENTES
  const loadClients = async () => {
    const data = await getClients();

    const filtered = showDeleted
      ? data.filter(c => !c.status)
      : data.filter(c => c.status);

    setClients(filtered);
    setFilteredClients(filtered);
  };

  useEffect(() => {
    loadClients();
  }, [showDeleted]);



  // BUSCADOR
  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = clients.filter(c =>
      `${c.name} ${c.surname}`.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredClients(filtered);
  };

  // REFRESH
  const onRefresh = async () => {
    setRefreshing(true);
    await loadClients();
    setRefreshing(false);
  };

  // CREAR
  const openCreate = () => {
    setSelectedClient(null);
    setModalVisible(true);
  };

  // EDITAR
  const openEdit = (client: Client) => {
    setSelectedClient(client);
    setModalVisible(true);
  };

  // ELIMINAR - RESTAURAR
  const openConfirm = (id: string, type: "delete" | "restore") => {
    setTargetId(id);
    setActionType(type);
    setConfirmVisible(true);
  };


    const handleConfirmAction = async () => {
      if (!targetId || !actionType) return;

      try {
        if (actionType === "delete") {
          await deleteClient(targetId);
        } else {
          await restoreClient(targetId);
        }

        await loadClients();
      } catch (error) {
        console.log("ERROR:", error);
      }

      setConfirmVisible(false);
      setTargetId(null);
      setActionType(null);
    };
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Clientes</Text>

      {/* BOTÓN CREAR */}
      <Pressable style={styles.createButton} onPress={openCreate}>
        <Text style={styles.createText}>+ Nuevo Cliente</Text>
      </Pressable>

      {/* BUSCADOR */}
      <TextInput
        placeholder="Buscar cliente..."
        placeholderTextColor="#888"
        style={styles.search}
        value={search}
        onChangeText={handleSearch}
      />

      <Pressable onPress={() => setShowDeleted(!showDeleted)}>
          <Text style={{ color: "#FCD240", fontFamily: "Urbanist_700Bold", fontSize: 20, textAlign: "center", marginBottom: 10}}>
            {showDeleted ? "Ver activos" : "Ver eliminados"}
          </Text>
      </Pressable>

      {/* LISTA */}
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }

        ListEmptyComponent={
          <Text style={styles.empty}>
            No hay clientes a listar.
          </Text>
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={[
                           styles.name,
                           !item.status && { textDecorationLine: "line-through", color: "#d10000" }
                         ]}>
              {item.name} {item.surname}
            </Text>

            <Text style={styles.info}>{item.email}</Text>
            <Text style={styles.info}>{item.phoneNum}</Text>
            <Text style={styles.info}>
              {item.docType}: {item.docNum}
            </Text>
            <Text style={styles.info}>{item.status}</Text>

            {/* ACCIONES */}
            <View style={styles.actions}>

              {/* EDITAR SOLO SI ESTÁ ACTIVO */}
              {item.status && (
                <Pressable
                  style={styles.editButton}
                  onPress={() => openEdit(item)}
                >
                  <Text style={styles.editText}>Editar</Text>
                </Pressable>
              )}

              {/* SI ESTÁ ACTIVO → ELIMINAR */}
              {item.status ? (
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => openConfirm(item.id, "delete")}
                >
                  <Text style={styles.deleteText}>Desactivar</Text>
                </Pressable>
              ) : (
                // SI ESTÁ ELIMINADO → RESTAURAR
                <Pressable
                  style={styles.restoreButton}
                  onPress={() => openConfirm(item.id, "restore")}
                >
                  <Text style={styles.restoreText}>Restaurar</Text>
                </Pressable>
              )}

            </View>

          </View>
        )}
      />

      {/* MODAL FORMULARIO */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <ClientForm
              existingClient={selectedClient}
              onSave={() => {
                setModalVisible(false);
                loadClients();
              }}
              onCancel={() => setModalVisible(false)}
            />

          </View>
        </View>
      </Modal>

      {/* MODAL CONFIRMACIÓN */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={{ color: "#fff", fontSize: 25, marginBottom: 10, fontFamily: "Urbanist_700Bold", textAlign: "center" }}>
              {actionType === "delete"
                ? "¿Desactivar cliente?"
                : "¿Restaurar cliente?"}
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>

              <Pressable
                style={[styles.buttonConfirm, { backgroundColor: "#555" }]}
                onPress={() => setConfirmVisible(false)}
              >
                <Text style={styles.textConfirm}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.buttonConfirm,
                  { backgroundColor: actionType === "delete" ? "#d10000" : "#3bd100" }
                ]}
                onPress={handleConfirmAction}
              >
                <Text style={styles.textConfirm}>
                  {actionType === "delete" ? "Desactivar" : "Restaurar"}
                </Text>
              </Pressable>

            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#320509",
    padding: 15
  },

  title: {
    fontFamily: "Urbanist_700Bold",
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center"
  },

  search: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#2e0509",
    fontFamily: "Urbanist_400Regular",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#2e0509",
    fontFamily: "Urbanist_400Regular",
  },

  name: {
    color: "#3f0400",
    fontSize: 20,
    fontFamily: "Urbanist_700Bold"
  },

  info: {
    color: "#000",
    fontSize: 16,
    marginTop: 2,
    fontFamily: "Urbanist_400Regular"
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  editButton: {
    backgroundColor: "#FCD240",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 5
  },

  editText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Urbanist_700Bold"
  },

  deleteButton: {
    backgroundColor: "#d10000",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5
  },

  deleteText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Urbanist_700Bold"
  },

  restoreButton: {
    backgroundColor: "#3bd100",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5
  },

  restoreText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Urbanist_700Bold"
  },

  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 30
  },

createButton: {
  backgroundColor: "#FCD240",
  padding: 10,
  borderRadius: 10,
  marginBottom: 10
},

createText: {
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "Urbanist_700Bold"
},

modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.7)",
  justifyContent: "center",
  padding: 20
},

modalContent: {
  backgroundColor: "#1E1E1E",
  borderRadius: 15,
  padding: 15
},

buttonConfirm: {
  flex: 1,
  padding: 10,
  borderRadius: 8
},

textConfirm: {
  color: "#fff",
  textAlign: "center",
  fontFamily: "Urbanist_700Bold"
}

};