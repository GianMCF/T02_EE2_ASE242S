import { View, ScrollView } from "react-native";
import ClientForm from "../components/clients/ClientForm";
import ClientList from "../components/clients/ClientList";
import { useState } from "react";

export default function ClientsScreen() {

  const [refresh, setRefresh] = useState(false);

  return (
    <ScrollView>

      {/* LISTA Y FORMULARIO OVERLAY*/}
      <ClientList key={refresh.toString()} />

    </ScrollView>
  );
}