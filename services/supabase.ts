import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = 'https://kqpqwgyexmqrovuqjqxi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcHF3Z3lleG1xcm92dXFqcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5OTc3MzAsImV4cCI6MjA3MTU3MzczMH0.BlB3n300oGCg_ZIqEhEgIHJL6MqZ9Iq_QaijSpxlCnQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

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

  // Mezclar aleatoriamente y tomar 4
  const aleatorias = data.sort(() => Math.random() - 0.5).slice(0, 4)
  return aleatorias
}


export async function  Sinopsis() {
    const{data, error} = await supabase
        .from('series').select('nombre, sinopsis,temporada,capitulos')
 
        if (error) {
  console.error("Error al obtener series:", error)
  return {}
}


return data

}
