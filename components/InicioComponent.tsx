import { useEffect, useRef, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet,ScrollView, Dimensions, FlatList } from 'react-native'
import { Banner } from '../services/supabase'
import { useNavigation } from '@react-navigation/native'
import { Serie,RootStackParamList} from '../types/Show';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'



const { width } = Dimensions.get('window')

type Props = {
  selected: string
}

export default function InicioComponent({ selected }: Props) {
  const [series, setSeries] = useState<Serie[]>([])
  const scrollRef = useRef<ScrollView>(null)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const currentIndex = useRef(0)

  useEffect(() => {
    if (selected !== 'Inicio') return

    const cargarSeries = async () => {
      const data = await Banner()
      if (data) setSeries(data)
    }

    cargarSeries()
  }, [selected])

  useEffect(() => {
    if (series.length === 0) return

    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % series.length
      scrollRef.current?.scrollTo({ x: currentIndex.current * width, animated: true })
    }, 8000)

    return () => clearInterval(interval)
  }, [series])

  if (series.length === 0) return null

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={(e) => {
        const x = e.nativeEvent.contentOffset.x
        currentIndex.current = Math.round(x / width)
      }}
    >
      {series.map((serie) => (
        <TouchableOpacity
          key={serie.id}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Detail', { serie })}
          style={{ width }}
        >
          <ImageBackground
            source={{ uri: serie.poster_url }}
            style={{ width, height: 300 }}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <Text style={styles.titulo}>{serie.nombre}</Text>
              <Text style={styles.sinopsis} numberOfLines={3}>{serie.sinopsis}</Text>
              <View style={styles.botones}>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => navigation.navigate('Detail', { serie })}
                >
                  <Text style={styles.botonTexto}>Ver ahora</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boton, styles.botonSecundario]}>
                  <Text style={styles.botonTexto}>Más info</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    justifyContent: 'flex-end',
    height: '100%',
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sinopsis: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 12,
  },
  botones: {
    flexDirection: 'row',
  },
  boton: {
    backgroundColor: '#968586ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 12,
  },
  botonSecundario: {
    backgroundColor: '#333',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
})