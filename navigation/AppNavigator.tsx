import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { supabase } from '../services/supabase'
import { Session } from '@supabase/supabase-js'

import LoginScreen from '../Screens/Login'
import HomeScreen from '../Screens/HomeScreen'
import DetailScreen from '../Screens/DetailScreen'
import { RootStackParamList } from '../types/Show'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        setSession(data.session)
      }
    }

    fetchSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription?.unsubscribe?.()
    }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="Login" component={LoginScreen} />
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
