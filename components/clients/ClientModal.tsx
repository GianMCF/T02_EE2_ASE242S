import { View, Modal } from "react-native";
import ClientForm from "./ClientForm";
import { Client } from "../../models/Client";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  client?: Client | null;
}

export default function ClientModal({
  visible,
  onClose,
  onSave,
  client
}: Props) {

  return (
    <Modal visible={visible} animationType="fade" transparent>

      <View style={{
        flex: 1,
        backgroundColor: "#200000",
        justifyContent: "center",
        padding: 20
      }}>

        <View style={{
          backgroundColor: "#200000",
          borderRadius: 15,
          padding: 15
        }}>

          <ClientForm
            existingClient={client}
            onSave={onSave}
            onCancel={onClose}
          />

        </View>

      </View>

    </Modal>
  );
}