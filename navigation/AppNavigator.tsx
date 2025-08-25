//Controla la navegación entre pantallas dependiendo si el usuario está autenticado

//Importar hooks de React
import { useEffect, useState } from 'react'
//Importar el contenedor de navegación y el stack nativo
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//Cliente y sesión de supabase
import { supabase } from '../services/supabase'
import { Session } from '@supabase/supabase-js'

//Screens que forman parte del stack de navegación
import LoginScreen from '../Screens/Login'
import HomeScreen from '../Screens/HomeScreen'
import DetailScreen from '../Screens/DetailScreen'
import Registro from '../components/Registro'
//Tipos para las rutas del stack
import { RootStackParamList } from '../types/Show'
//Se crea el stack de navegación con los tipos definidos
const Stack = createNativeStackNavigator<RootStackParamList>()
//Componente principal que gestiona la navegación según el estado de sesión
export default function AppNavigator() {
//Estado local para guardar la sesión del usuario
  const [session, setSession] = useState<Session | null>(null)
//Efecto que se ejecuta al montar el componente
  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        setSession(data.session)
      }
    }

    fetchSession()
//Escucha los cambios en el estado de autenticación
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
//Limpia el listener al desmontar el componente
    return () => {
      listener?.subscription?.unsubscribe?.()
    }
  }, [])
//Renderiza el contenedor de navegación
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/*Si no hay sesión, muestra la pantalla de Login, caso contrario muestra la pantalla principal*/}
        {!session ? (
          <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={Registro} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
