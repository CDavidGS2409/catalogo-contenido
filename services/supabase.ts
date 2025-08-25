// Cliente supabase para hacer consultas de los datos

//Pollyfill para compatibilidad con URL en entornos React Native
import 'react-native-url-polyfill/auto';

//Almacenamiento persistente para sesiones de dispositivos móviles
import AsyncStorage from '@react-native-async-storage/async-storage';
//Cliente supabase
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
//URL y clave pública del proyecto
const supabaseUrl = 'https://kqpqwgyexmqrovuqjqxi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcHF3Z3lleG1xcm92dXFqcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5OTc3MzAsImV4cCI6MjA3MTU3MzczMH0.BlB3n300oGCg_ZIqEhEgIHJL6MqZ9Iq_QaijSpxlCnQ';

//Inicializa el cliente Supabase con configuración específica
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/*
* Consulta que obtiene todas las series agrupadas por género.
*Ordenada alfabéticamente por el campo 'genero'
*/


export async function  fetchSeriesPorGenero() {
    const{data, error} = await supabase
        .from('series').select('*')
        .order('genero',{ascending:true})
        if (error) {
  console.error("Error al obtener series:", error)
  return {}
}

console.log("Series obtenidas desde Supabase:", data)

    const agrupadas = data.reduce((acc, serie) => {
    if (!acc[serie.genero]) acc[serie.genero] = []
    acc[serie.genero].push(serie)
    return acc
  }, {})

    return agrupadas
}
/**
* Consulta que obtiene todas las series sin agrupar ni filtrar
*
*
*/
export async function  seriesQuevER() {
    const{data, error} = await supabase
        .from('series').select('*')
        if (error) {
  console.error("Error al obtener series:", error)
  return {}
}

console.log("Series obtenidas desde Supabase:", data)
return data

}
/**
* Obtiene 4 series aleatorias para mostrar en el banner
*
*/
export async function Banner() {
  const { data, error } = await supabase
    .from('series')
    .select('*')

  if (error) {
    console.error("Error al obtener series:", error)
    return []
  }

  if (!data || data.length === 0) {
    console.warn("No se encontraron series")
    return []
  }

  const aleatorias = data.sort(() => Math.random() - 0.5).slice(0, 4)
  return aleatorias
}

/**
* Consulta que obtiene sinopsis, nombre, temporada, capitulos de las series
*
*/
export async function  Sinopsis() {
    const{data, error} = await supabase
        .from('series').select('nombre, sinopsis,temporada,capitulos')
 
        if (error) {
  console.error("Error al obtener series:", error)
  return {}
}


return data

}
