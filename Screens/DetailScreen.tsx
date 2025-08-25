//Pantalla que muestra detalles de cada serie con sus capitulos, temporadas y sinopsis.

//Importar componentes de React Native 
import {View,Text,Image,ImageBackground,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'

//Importar herramientas de navegación para acceder a parametros
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types/Show'

//Importar hooks de React
import { useEffect, useState } from 'react'
//Componentes personalizados
import TopBar from '../components/TopBar'
import CarruselPorGenero from '../components/CarruselPorGenero'

//Componente de selección de temporada
import { Picker } from '@react-native-picker/picker'

//Tipado estricto para acceder a los parametros de navegación
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>

/*
* Pantalla de detalle de una serie
* Permite cambiar entre secciones: Detalle, series, inicio,etc
*
*/
export default function DetailScreen() {
//Obtiene parámetros de navegación
  const route = useRoute<DetailScreenRouteProp>()
  const { serie } = route.params
//Estado para controlar la sección activa
  const [selected, setSelected] = useState('Detalle')
//Estado para controlar la temporada seleccionada
  const [temporadaSeleccionada, setTemporadaSeleccionada] = useState<number>(1)
//Muestra en consola los datos de la serie al montar el componente
  useEffect(() => {
    console.log('Serie recibida:', JSON.stringify(serie, null, 2))
  }, [])
//Genera un array con los números de temporadas disponibles
  const temporadas = Array.from({ length: serie.temporadas }, (_, i) => i + 1)

  return (
    <View style={styles.container}>
      <TopBar selected={selected} setSelected={setSelected} />

      {selected === 'Detalle' && (
        <ScrollView>
          <ImageBackground
            source={{ uri: serie.fondo || serie.poster_url }}
            style={styles.banner}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{serie.nombre}</Text>
              <Text style={styles.sinopsis}>{serie.sinopsis}</Text>
            </View>
          </ImageBackground>

          {/* Temporadas como dropdown */}
          <View style={styles.temporadas}>
            <Text style={styles.sectionTitle}>Selecciona temporada:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={temporadaSeleccionada}
                onValueChange={(value) => setTemporadaSeleccionada(value)}
                dropdownIconColor="#fff"
                style={styles.picker}
              >
                {temporadas.map((num) => (
                  <Picker.Item key={num} label={`Temporada ${num}`} value={num} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Capítulos con imagen y texto */}
          <View style={styles.capitulos}>
            <Text style={styles.sectionTitle}>
              Capítulos de la temporada {temporadaSeleccionada}:
            </Text>
            {serie.capitulos.map((cap) => (
              <View key={cap.numero} style={styles.capituloItem}>
                <Image source={{ uri: serie.poster_url }} style={styles.capituloImg} />
                <View style={styles.capituloInfo}>
                  <Text style={styles.capituloTitulo}>
                    Episodio {cap.numero}: {cap.titulo}
                  </Text>
                  <Text style={styles.capituloSinopsis}>{serie.sinopsis}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {selected === 'Películas' && (
        <View style={styles.centered}>
          <Text style={{ color: '#fff' }}>Sección de Películas</Text>
        </View>
      )}

      {selected === 'Series' && <CarruselPorGenero />}
    </View>
  )
}

//Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  banner: { height: 250, resizeMode: 'cover' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 16 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  emmy: { fontSize: 14, color: '#ccc' },
  sectionTitle: { fontSize: 18, color: '#fff', marginTop: 20, marginBottom: 10, paddingHorizontal: 16 },
  temporadas: { paddingHorizontal: 16 },
  pickerContainer: {
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden'
  },
  picker: {
    color: '#444343ff',
    height: 50
  },
  capitulos: { padding: 16 },
  capituloItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden'
  },
  capituloImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
  capituloInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  capituloTitulo: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4
  },
  capituloSinopsis: {
    color: '#ccc',
    fontSize: 13
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  sinopsis: {
  fontSize: 14,
  color: '#ccc',
  marginTop: 8
}
})
