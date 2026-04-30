import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useApp } from '@/context/AppContext';

export default function ProfileScreen() {
  const { favorites, cart } = useApp();

  const user = {
    name: 'Alejandro',
    surname: 'Soto Cárdenas',
    email: 'alejandro.soto@gmail.com',
    phoneNum: '936568272',
    age: 22,
    docType: 'DNI',
    docNum: '73144231',
  };

  const purchases = [
    {
      id: '001',
      product: 'Cañete Afro',
      date: '15/04/2026',
      quantity: 2,
      total: 14,
      status: 'Completado',
    },
    {
      id: '002',
      product: 'Borgoña del Sur',
      date: '18/04/2026',
      quantity: 1,
      total: 7,
      status: 'Completado',
    },
    {
      id: '003',
      product: 'Pisco Rondon',
      date: '22/04/2026',
      quantity: 3,
      total: 27,
      status: 'Pendiente',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/vawLogo.png')}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user.name} {user.surname}
        </Text>

        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{purchases.length}</Text>
            <Text style={styles.statLabel}>Compras</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{cart.length}</Text>
            <Text style={styles.statLabel}>Carrito</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.value}>{user.phoneNum}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Edad</Text>
          <Text style={styles.value}>{user.age} años</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Documento</Text>
          <Text style={styles.value}>
            {user.docType} - {user.docNum}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen de actividad</Text>

        <View style={styles.activityBox}>
          <Text style={styles.activityIcon}>❤️</Text>
          <View>
            <Text style={styles.activityTitle}>Productos favoritos</Text>
            <Text style={styles.activityText}>
              Tienes {favorites.length} producto(s) guardado(s).
            </Text>
          </View>
        </View>

        <View style={styles.activityBox}>
          <Text style={styles.activityIcon}>🛒</Text>
          <View>
            <Text style={styles.activityTitle}>Carrito actual</Text>
            <Text style={styles.activityText}>
              Tienes {cart.length} producto(s) en el carrito.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Historial de Compras</Text>
          <Text style={styles.seeAll}>Ver todo</Text>
        </View>

        {purchases.map((item) => (
          <View key={item.id} style={styles.purchaseCard}>
            <View style={styles.purchaseTop}>
              <View>
                <Text style={styles.purchaseProduct}>{item.product}</Text>
                <Text style={styles.purchaseDate}>{item.date}</Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  item.status === 'Completado' ? styles.completed : styles.pending,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === 'Completado'
                      ? styles.completedText
                      : styles.pendingText,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.purchaseBottom}>
              <Text style={styles.purchaseInfo}>Cantidad: {item.quantity}</Text>
              <Text style={styles.purchaseTotal}>S/ {item.total}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opciones</Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </Pressable>

        <Pressable style={styles.logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#410303',
    paddingTop: 45,
    paddingBottom: 28,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    color: '#eee',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 22,
    paddingHorizontal: 16,
    gap: 10,
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    minWidth: 92,
  },
  statNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 3,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#b90000',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  seeAll: {
    color: '#410303',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    color: '#777',
    fontSize: 12,
  },
  value: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 3,
  },
  activityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activityIcon: {
    fontSize: 28,
  },
  activityTitle: {
    color: '#410303',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activityText: {
    color: '#555',
    marginTop: 2,
  },
  purchaseCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  purchaseTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purchaseProduct: {
    color: '#410303',
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchaseDate: {
    color: '#777',
    fontSize: 12,
    marginTop: 3,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  completed: {
    backgroundColor: '#e8f5e9',
  },
  pending: {
    backgroundColor: '#fff4d6',
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  completedText: {
    color: '#1b7f2a',
  },
  pendingText: {
    color: '#9a6a00',
  },
  purchaseBottom: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  purchaseInfo: {
    color: '#555',
    fontSize: 13,
  },
  purchaseTotal: {
    color: '#b90000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#b90000',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logout: {
    borderWidth: 1,
    borderColor: '#b90000',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 35,
  },
  logoutText: {
    color: '#b90000',
    fontWeight: 'bold',
  },
});