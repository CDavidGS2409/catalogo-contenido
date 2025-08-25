//Componente que renderiza un carrusel horizontal de series en el menu principal. Se actualiza cada 8 segundos y permite
//navegar a la pantalla

import { useEffect, useRef, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet,ScrollView, Dimensions, FlatList } from 'react-native'
import { Banner } from '../services/supabase'
import { useNavigation } from '@react-navigation/native'
import { Serie,RootStackParamList} from '../types/Show';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'



const { width } = Dimensions.get('window')

type Props = {
  selected: string //Indica si la pestaña actual es "Inicio". Carga el contenido si selected == 'Inicio'
}

export default function InicioComponent({ selected }: Props) {
  const [series, setSeries] = useState<Serie[]>([]) //Lista de series obtenidas de Supabase
  const scrollRef = useRef<ScrollView>(null) //Scrollview para el control manual del scroll
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>() //Permite navegar a la pantalla 'Detail' de DetailScreen' pasando el objeto serie como parametro
  const currentIndex = useRef(0) //Indice actual del carrusel
//Bloque que funciona solo si la pestaña es "Inicio"/"HomeScreen"
  useEffect(() => {
    if (selected !== 'Inicio') return

    const cargarSeries = async () => {
      const data = await Banner() //Llama la función Banner() para obtener las series destacadas
      if (data) setSeries(data)
    }

    cargarSeries()
  }, [selected])

//Bloque para que cada 8 segundos avanza automáticamente al siguiente banner
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
    {/*Renderiza cada serie como un banner con imagen de fondo*/}
      {series.map((serie) => (
        <TouchableOpacity
          key={serie.id}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Detail', { serie })}
          style={{ width }}
        >
    {/*Imagen de fondo con overlay oscuro*/}
          <ImageBackground
            source={{ uri: serie.poster_url }}
            style={{ width, height: 300 }}
            resizeMode="cover"
          >
    {/*Titulo y sinopsis*/}
            <View style={styles.overlay}>
              <Text style={styles.titulo}>{serie.nombre}</Text>
              <Text style={styles.sinopsis} numberOfLines={3}>{serie.sinopsis}</Text>
              <View style={styles.botones}>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => navigation.navigate('Detail', { serie })}
                >
    {/*Botones de accion*/}
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


//Estilos
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
