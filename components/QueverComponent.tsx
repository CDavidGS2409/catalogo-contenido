//Componente que funciona como un carrusel en el HomeScreen que te recomienda todas las series disponibles.

//Importar hooks de React y componentes de React Native
import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { seriesQuevER } from '../services/supabase'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList,Serie} from '../types/Show';

export default function QueVerComponent() {
const [series, setSerie] = useState<Serie[]>([])
//Hook para navegar a la pantalla de detalle
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//Carga las series al montar el componente
useEffect(() => {
  seriesQuevER().then((data) => {
    console.log('Datos recibidos:', data)
    if (Array.isArray(data)) setSerie(data)
  })
}, [])

//Navega al detalle de la serie seleccionada
  const handlePress = (serie: Serie) => {
    navigation.navigate('Detail', { serie });
  };

//Si no hay series, no renderiza nada
  if (series.length === 0) return null

//Renderiza la seccion horizontal de series
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={styles.titulo}>Qué ver</Text>
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingRight: 16 }}
  style={{ height: 200 }}
>
  {series.map((serie) => (
    <TouchableOpacity
      key={serie.id}
      onPress={() => handlePress(serie)}
      style={styles.card}
    >
      {/*Se manda a llamar la imagen*/}
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
  )
}




//Estilos
const styles = StyleSheet.create({
  titulo: { fontSize: 20, color: '#fff', marginBottom: 8 },
  card: { marginRight: 12, width: 120 },
  poster: { width: 120, height: 180, borderRadius: 8 },
  nombre: { color: '#fff', marginTop: 4 }
})
