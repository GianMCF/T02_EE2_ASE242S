import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';

type Product = {
  id: string;
  name: string;
  category: string;
  stock: number;
  unitPrice: number;
  status: boolean;
  volumeMl: number;
  alcoholPercentage: number;
};

const API_URL = 'http://10.0.2.2:8088/v1/api/products';

export default function ProductsScreen() {
  const { favorites, toggleFavorite, addToCart } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'VINO' | 'PISCO'>('ALL');
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      const activeProducts = data.filter((item: Product) => item.status === true);
      setProducts(activeProducts);
    } catch (error) {
      console.log('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    const category = item.category?.toLowerCase() || '';
    const name = item.name?.toLowerCase() || '';
    const searchText = search.toLowerCase();

    const matchesCategory =
      filter === 'ALL' ||
      (filter === 'VINO' && category.includes('vino')) ||
      (filter === 'PISCO' && category.includes('pisco'));

    const matchesSearch =
      name.includes(searchText) || category.includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const renderProduct = ({ item }: { item: Product }) => {
    const isLowStock = item.stock <= 10;
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.card}>
        <Image
          source={
            item.category?.toLowerCase().includes('pisco')
              ? require('../../assets/images/wines2.png')
              : require('../../assets/images/wines.png')
          }
          style={styles.image}
        />

        <Pressable
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={styles.heartText}>{isFavorite ? '❤️' : '🤍'}</Text>
        </Pressable>

        {isLowStock && (
          <View style={styles.lowStockBadge}>
            <Text style={styles.lowStockText}>Stock bajo</Text>
          </View>
        )}

        <View style={styles.cardBody}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.category}>{item.category}</Text>

          <Text style={styles.price}>S/ {item.unitPrice}</Text>
          <Text style={styles.detail}>Stock: {item.stock}</Text>
          <Text style={styles.detail}>
            {item.volumeMl} ml · {item.alcoholPercentage}%
          </Text>

          <Pressable
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: '/product-detail/[id]',
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.buttonText}>Ver detalle</Text>
          </Pressable>

          <Pressable style={styles.cartButton} onPress={() => addToCart(item)}>
            <Text style={styles.cartButtonText}>Agregar</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      <Text style={styles.subtitle}>Catálogo de vinos y piscos disponibles.</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        {[
          { label: 'Todos', value: 'ALL' },
          { label: 'Vinos', value: 'VINO' },
          { label: 'Piscos', value: 'PISCO' },
        ].map((item) => (
          <Pressable
            key={item.value}
            style={[styles.filterBtn, filter === item.value && styles.filterActive]}
            onPress={() => setFilter(item.value as 'ALL' | 'VINO' | 'PISCO')}
          >
            <Text
              style={[
                styles.filterText,
                filter === item.value && styles.filterTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.reloadButton} onPress={loadProducts}>
        <Text style={styles.reloadText}>Actualizar productos</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator size="large" color="#b90000" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron productos.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    color: '#b90000',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#555',
    marginTop: 6,
    marginBottom: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b90000',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  filterActive: {
    backgroundColor: '#b90000',
  },
  filterText: {
    color: '#b90000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  filterTextActive: {
    color: '#fff',
  },
  reloadButton: {
    backgroundColor: '#410303',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
  },
  reloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 110,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    zIndex: 5,
  },
  heartText: {
    fontSize: 17,
  },
  lowStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffcc00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  lowStockText: {
    color: '#4a3200',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 10,
  },
  name: {
    color: '#b90000',
    fontWeight: 'bold',
    fontSize: 15,
    minHeight: 38,
  },
  category: {
    color: '#410303',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  price: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    color: '#555',
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: '#b90000',
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#410303',
    marginTop: 7,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#777',
    fontWeight: 'bold',
  },
});