import { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { seriesQuevER } from '../services/supabase'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList,Serie} from '../types/Show';

export default function QueVerComponent() {
const [series, setSerie] = useState<Serie[]>([])
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

useEffect(() => {
  seriesQuevER().then((data) => {
    console.log('Datos recibidos:', data)
    if (Array.isArray(data)) setSerie(data)
  })
}, [])

  const handlePress = (serie: Serie) => {
    navigation.navigate('Detail', { serie });
  };


  if (series.length === 0) return null

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





const styles = StyleSheet.create({
  titulo: { fontSize: 20, color: '#fff', marginBottom: 8 },
  card: { marginRight: 12, width: 120 },
  poster: { width: 120, height: 180, borderRadius: 8 },
  nombre: { color: '#fff', marginTop: 4 }
})