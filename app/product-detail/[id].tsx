import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
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

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { favorites, toggleFavorite, addToCart } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProduct = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const selectedProduct = data.find((item: Product) => item.id === id);
      setProduct(selectedProduct);
    } catch (error) {
      console.log('Error al cargar detalle:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color="#b90000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text>Producto no encontrado</Text>
        <Pressable style={styles.smallButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert('Producto agregado', `${product.name} fue agregado al carrito.`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              product.category?.toLowerCase().includes('pisco')
                ? require('../../assets/images/wines2.png')
                : require('../../assets/images/wines.png')
            }
            style={styles.image}
          />

          <View style={styles.imageOverlay} />

          <View style={styles.customHeader}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.back}>←</Text>
            </Pressable>

            <Text style={styles.headerTitle}>Detalle del producto</Text>

            <Pressable
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(product.id)}
            >
              <Text style={styles.favoriteText}>{isFavorite ? '❤️' : '🤍'}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>

          <View style={styles.priceBox}>
            <Text style={styles.price}>S/ {product.unitPrice}</Text>
            <Text style={product.status ? styles.available : styles.unavailable}>
              {product.status ? 'Disponible' : 'No disponible'}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Información del producto</Text>
            <Text style={styles.info}>Stock: {product.stock} unidades</Text>
            <Text style={styles.info}>Volumen: {product.volumeMl} ml</Text>
            <Text style={styles.info}>Alcohol: {product.alcoholPercentage}%</Text>
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.infoTitle}>Descripción</Text>
            <Text style={styles.description}>
              Producto artesanal elaborado por Bodega Reyna de Lunahuaná, ideal
              para compartir en reuniones, visitas turísticas y experiencias
              gastronómicas.
            </Text>
          </View>

          <Pressable style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Volver a productos</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 290,
  },
  image: {
    width: '100%',
    height: 290,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  customHeader: {
    position: 'absolute',
    top: 42,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 20,
  },
  back: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: -2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    padding: 22,
  },
  name: {
    color: '#b90000',
    fontSize: 28,
    fontWeight: 'bold',
  },
  category: {
    color: '#410303',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  priceBox: {
    marginTop: 18,
    backgroundColor: '#fff',
    elevation: 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  price: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#111',
  },
  available: {
    marginTop: 5,
    color: '#1b7f2a',
    fontWeight: 'bold',
  },
  unavailable: {
    marginTop: 5,
    color: '#b90000',
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
  },
  infoTitle: {
    color: '#b90000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    color: '#333',
    fontSize: 15,
    marginTop: 5,
  },
  descriptionBox: {
    marginTop: 18,
  },
  description: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
  },
  cartButton: {
    marginTop: 25,
    backgroundColor: '#b90000',
    padding: 15,
    borderRadius: 9,
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#410303',
    padding: 15,
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 30,
  },
  smallButton: {
    marginTop: 20,
    backgroundColor: '#410303',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});