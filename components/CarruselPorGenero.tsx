import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, StyleSheet,TouchableOpacity } from 'react-native'
import { fetchSeriesPorGenero } from '../services/supabase'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList,Serie} from '../types/Show';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


export default function CarruselPorGeneroNative() {
  const [SeriesPorGenero, setSeriesPorGenero] = useState<Record<string, Serie[]>>({})
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
//Se manda a llamar la consulta de la series
    fetchSeriesPorGenero().then(setSeriesPorGenero)
  }, [])

  return (
  {/*Scrollview para el catalogo de series dividido por genero*/}
    <ScrollView style={styles.container}>
      {Object.entries(SeriesPorGenero).map(([genero, series]) => (
        <View key={genero} style={styles.seccion}>
          <Text style={styles.titulo}>{genero}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {series.map((serie) => (
              <TouchableOpacity
                key={serie.id}
                style={styles.card}
  {/*Al presionar la imagen de la serie se redireccionara a la información*/}
                onPress={() => navigation.navigate('Detail', { serie })}
              >
  {/*Se manda a llamar la imagen de cada serie*/}
                <Image
                  source={{ uri: serie.poster_url }}
                  style={styles.poster}
                  resizeMode="cover"
                />
                <Text style={styles.nombre}>{serie.nombre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  )
}
  {/*Estilos*/}
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#000000ff' },
  seccion: { marginBottom: 24 },
  titulo: { fontSize: 20, color: '#fff', marginBottom: 8 },
  card: { marginRight: 12, width: 120 },
  poster: { width: 120, height: 180, borderRadius: 8 },
  nombre: { color: '#fff', marginTop: 4 }
})
