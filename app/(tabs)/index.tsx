import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

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

const slides = [
  require('../../assets/images/banner.jpg'),
  require('../../assets/images/wines2.png'),
  require('../../assets/images/tours.png'),
];

export default function HomeScreen() {
  const heroFade = useRef(new Animated.Value(1)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeaturedProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const activeProducts = data
        .filter((item: Product) => item.status === true)
        .slice(0, 3);

      setFeaturedProducts(activeProducts);
    } catch (error) {
      console.log('Error al cargar destacados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Animated.timing(contentFade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    loadFeaturedProducts();

    const interval = setInterval(() => {
      Animated.timing(heroFade, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }).start(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);

        Animated.timing(heroFade, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }).start();
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroWrapper}>
        <Animated.View style={[styles.heroAnimated, { opacity: heroFade }]}>
          <ImageBackground source={slides[currentSlide]} style={styles.hero}>
            <View style={styles.overlay} />
          </ImageBackground>
        </Animated.View>

        <Animated.View style={[styles.heroContent, { opacity: contentFade }]}>
          <Image
            source={require('../../assets/images/vawLogo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Bodega Reyna de Lunahuaná</Text>

          <Text style={styles.subtitle}>
            Experiencias, vinos y piscos artesanales con tradición.
          </Text>

          <Pressable
            style={styles.mainButton}
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.mainButtonText}>Explorar productos →</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.lines}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.line, currentSlide === index && styles.lineActive]}
            />
          ))}
        </View>
      </View>

      <View style={styles.quickActions}>
        <Pressable style={styles.quickButton} onPress={() => router.push('/explore')}>
          <Text style={styles.quickIcon}>🍷</Text>
          <Text style={styles.quickText}>Productos</Text>
        </Pressable>

        <Pressable style={styles.quickButton} onPress={() => router.push('/about')}>
          <Text style={styles.quickIcon}>🏛️</Text>
          <Text style={styles.quickText}>Nosotros</Text>
        </Pressable>

        <Pressable style={styles.quickButton} onPress={() => router.push('/contact')}>
          <Text style={styles.quickIcon}>📩</Text>
          <Text style={styles.quickText}>Contacto</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SOBRE LA BODEGA</Text>
        <Text style={styles.text}>
          En Bodega Reyna ofrecemos productos artesanales de calidad y una
          experiencia cercana para quienes desean conocer la tradición de
          Lunahuaná.
        </Text>
      </View>

      <View style={styles.benefits}>
        <View style={styles.benefitCard}>
          <Text style={styles.benefitIcon}>🍇</Text>
          <Text style={styles.benefitTitle}>Artesanal</Text>
          <Text style={styles.benefitText}>Productos elaborados con tradición.</Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitIcon}>🌄</Text>
          <Text style={styles.benefitTitle}>Turístico</Text>
          <Text style={styles.benefitText}>Experiencias guiadas en Lunahuaná.</Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitIcon}>⭐</Text>
          <Text style={styles.benefitTitle}>Calidad</Text>
          <Text style={styles.benefitText}>Atención cercana y productos confiables.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DESTACADOS</Text>
          <Pressable onPress={() => router.push('/explore')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#b90000" style={{ marginTop: 20 }} />
        ) : (
          featuredProducts.map((item) => (
            <Pressable
              key={item.id}
              style={styles.productCard}
              onPress={() =>
                router.push({
                  pathname: '/product-detail/[id]',
                  params: { id: item.id },
                })
              }
            >
              <Image
                source={
                  item.category?.toLowerCase().includes('pisco')
                    ? require('../../assets/images/wines2.png')
                    : require('../../assets/images/wines.png')
                }
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productCategory}>{item.category}</Text>
                <Text style={styles.productPrice}>S/ {item.unitPrice}</Text>
                <Text style={styles.productDetail}>
                  {item.volumeMl} ml · {item.alcoholPercentage}%
                </Text>
              </View>
            </Pressable>
          ))
        )}
      </View>

      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>¿Listo para conocer nuestros productos?</Text>
        <Text style={styles.ctaText}>
          Explora el catálogo de vinos y piscos disponibles.
        </Text>

        <Pressable style={styles.ctaButton} onPress={() => router.push('/explore')}>
          <Text style={styles.ctaButtonText}>Ir al catálogo</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  heroWrapper: {
    height: 520,
    position: 'relative',
    justifyContent: 'center',
  },
  heroAnimated: {
    ...StyleSheet.absoluteFillObject,
  },
  hero: {
    height: 520,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.58)',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 5,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 14,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#eee',
    marginTop: 12,
    textAlign: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
    lineHeight: 22,
  },
  mainButton: {
    marginTop: 24,
    backgroundColor: '#410303',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#220404',
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lines: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
    zIndex: 5,
  },
  line: {
    width: 55,
    height: 5,
    backgroundColor: '#ffffff80',
    borderRadius: 10,
  },
  lineActive: {
    backgroundColor: '#b90000',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: -34,
    zIndex: 5,
  },
  quickButton: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  quickIcon: {
    fontSize: 25,
    marginBottom: 5,
  },
  quickText: {
    color: '#410303',
    fontWeight: 'bold',
    fontSize: 13,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#b90000',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seeAll: {
    color: '#410303',
    fontWeight: 'bold',
  },
  text: {
    color: '#333',
    fontSize: 15,
    lineHeight: 23,
  },
  benefits: {
    paddingHorizontal: 18,
    gap: 12,
  },
  benefitCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  benefitTitle: {
    color: '#b90000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  benefitText: {
    color: '#555',
    marginTop: 4,
    lineHeight: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginTop: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  productImage: {
    width: 115,
    height: 120,
  },
  productInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  productName: {
    color: '#b90000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  productCategory: {
    color: '#410303',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  productPrice: {
    color: '#111',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },
  productDetail: {
    color: '#555',
    marginTop: 3,
  },
  cta: {
    margin: 20,
    marginBottom: 35,
    backgroundColor: '#410303',
    borderRadius: 16,
    padding: 20,
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
  },
  ctaText: {
    color: '#eee',
    marginTop: 8,
    lineHeight: 22,
  },
  ctaButton: {
    marginTop: 16,
    backgroundColor: '#b90000',
    paddingVertical: 13,
    borderRadius: 9,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});