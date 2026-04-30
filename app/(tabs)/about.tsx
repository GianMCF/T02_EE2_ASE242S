import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/images/banner.jpg')}
        style={styles.header}
      >
        <View style={styles.overlay} />
        <Text style={styles.headerSmall}>Conoce nuestra historia</Text>
        <Text style={styles.headerTitle}>Bodega Reyna</Text>
        <Text style={styles.headerText}>
          Tradición, calidad y sabor artesanal en Lunahuaná.
        </Text>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>SOBRE NOSOTROS</Text>
        <Text style={styles.paragraph}>
          En Bodega Reyna de Lunahuaná nos dedicamos a ofrecer productos
          artesanales de calidad, elaborados con compromiso y tradición. Nuestro
          objetivo es brindar una experiencia cercana al cliente, combinando el
          sabor de nuestros vinos y piscos con la calidez del turismo local.
        </Text>

        <Image
          source={require('../../assets/images/tours.png')}
          style={styles.mainImage}
        />

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.icon}>🍷</Text>
            <Text style={styles.cardTitle}>Tradición</Text>
            <Text style={styles.cardText}>
              Conservamos procesos artesanales para mantener el sabor auténtico.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.icon}>⭐</Text>
            <Text style={styles.cardTitle}>Calidad</Text>
            <Text style={styles.cardText}>
              Buscamos ofrecer productos confiables y una buena atención.
            </Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Misión</Text>
          <Text style={styles.paragraph}>
            Brindar vinos, piscos y experiencias turísticas de calidad,
            promoviendo la tradición artesanal de Lunahuaná.
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Visión</Text>
          <Text style={styles.paragraph}>
            Ser una bodega reconocida por su calidad, atención y aporte al
            turismo local.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>¿POR QUÉ ELEGIRNOS?</Text>

        <View style={styles.reason}>
          <Text style={styles.reasonNumber}>01</Text>
          <View>
            <Text style={styles.reasonTitle}>Productos artesanales</Text>
            <Text style={styles.reasonText}>
              Vinos y piscos elaborados con dedicación y cuidado.
            </Text>
          </View>
        </View>

        <View style={styles.reason}>
          <Text style={styles.reasonNumber}>02</Text>
          <View>
            <Text style={styles.reasonTitle}>Atención cercana</Text>
            <Text style={styles.reasonText}>
              Buscamos que cada visitante tenga una experiencia agradable.
            </Text>
          </View>
        </View>

        <View style={styles.reason}>
          <Text style={styles.reasonNumber}>03</Text>
          <View>
            <Text style={styles.reasonTitle}>Experiencia turística</Text>
            <Text style={styles.reasonText}>
              Promovemos recorridos y actividades vinculadas a la producción.
            </Text>
          </View>
        </View>

        <View style={styles.finalBox}>
          <Text style={styles.finalTitle}>Experiencia en Lunahuaná</Text>
          <Text style={styles.finalText}>
            Nuestra bodega forma parte de una propuesta que une tradición,
            turismo y gastronomía, permitiendo que los visitantes conozcan más
            sobre la cultura vitivinícola local.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.58)',
  },
  headerSmall: {
    color: '#eee',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    color: '#eee',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#b90000',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 10,
  },
  paragraph: {
    color: '#333',
    fontSize: 15,
    lineHeight: 23,
  },
  mainImage: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    marginTop: 18,
    marginBottom: 18,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    fontSize: 28,
    marginBottom: 6,
  },
  cardTitle: {
    color: '#b90000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#444',
    fontSize: 13,
    lineHeight: 19,
  },
  box: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fafafa',
    borderLeftWidth: 5,
    borderLeftColor: '#b90000',
  },
  boxTitle: {
    color: '#b90000',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  reason: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reasonNumber: {
    color: '#b90000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  reasonTitle: {
    color: '#410303',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reasonText: {
    color: '#555',
    marginTop: 3,
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 260,
  },
  finalBox: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: '#410303',
    borderRadius: 14,
    padding: 18,
  },
  finalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  finalText: {
    color: '#eee',
    fontSize: 14,
    lineHeight: 22,
  },
});