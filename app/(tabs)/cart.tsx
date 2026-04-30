import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useApp();

  const total = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const confirmOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de continuar.');
      return;
    }

    Alert.alert('Compra simulada', 'Tu pedido fue registrado correctamente.');
    clearCart();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Carrito</Text>
      <Text style={styles.subtitle}>Productos agregados a tu compra.</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptyText}>
            Agrega vinos o piscos desde el catálogo.
          </Text>
        </View>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Cantidad: {item.quantity}</Text>
              <Text style={styles.detail}>Precio: S/ {item.unitPrice}</Text>
            </View>

            <View style={styles.rightBox}>
              <Text style={styles.price}>S/ {item.unitPrice * item.quantity}</Text>

              <Pressable
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeText}>Quitar</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>S/ {total}</Text>
      </View>

      <Pressable style={styles.buyButton} onPress={confirmOrder}>
        <Text style={styles.buyText}>Confirmar compra</Text>
      </Pressable>

      {cart.length > 0 && (
        <Pressable style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearText}>Vaciar carrito</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    color: '#b90000',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  subtitle: {
    color: '#555',
    marginTop: 5,
    marginBottom: 18,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 45,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  emptyIcon: {
    fontSize: 42,
  },
  emptyTitle: {
    marginTop: 10,
    color: '#410303',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  name: {
    color: '#410303',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    color: '#555',
    fontSize: 13,
    marginTop: 3,
  },
  rightBox: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#b90000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  removeButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#b90000',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  removeText: {
    color: '#b90000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  totalBox: {
    marginTop: 16,
    backgroundColor: '#410303',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  buyButton: {
    marginTop: 16,
    backgroundColor: '#b90000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  clearButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#b90000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 35,
  },
  clearText: {
    color: '#b90000',
    fontWeight: 'bold',
  },
});