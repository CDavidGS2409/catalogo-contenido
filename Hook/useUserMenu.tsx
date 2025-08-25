import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Show'
import { signOut } from '../services/auth'

export function useUserMenu() {
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const toggleMenu = () => setVisible(prev => !prev)
  const closeMenu = () => setVisible(false)

  const goToSettings = () => {
    closeMenu()
    //navigation.navigate('Settings') // Asegúrate de tener esta ruta
  }

  const logout = async () => {
    closeMenu()
    await signOut()
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
  }

  return {
    visible,
    toggleMenu,
    goToSettings,
    logout,
  }
}