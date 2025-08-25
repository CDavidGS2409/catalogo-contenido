import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Show'
import { supabase } from '../services/supabase'
import { useUserMenu } from '../Hook/useUserMenu'
import { SafeAreaView } from 'react-native'
import { StatusBar, Platform } from 'react-native'

type Props = {
  selected: string
  setSelected?: (option: string) => void
}

export default function TopBar({ selected, setSelected }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [email, setEmail] = useState('')
  const { visible, toggleMenu, goToSettings, logout } = useUserMenu()

  useEffect(() => {
    const fetchEmail = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user?.email) {
        setEmail(data.user.email)
      }
    }
    fetchEmail()
  }, [])

  const handlePress = (option: string) => {
    if (option === 'Inicio') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    }

    if (setSelected) {
      setSelected(option)
    }
  }

  const options = ['Inicio', 'Series']

return (
  <SafeAreaView style={styles.safeArea}>
  <View style={styles.header}>
    <TouchableOpacity onPress={() => handlePress('Inicio')} activeOpacity={0.7}>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
    </TouchableOpacity>

  <View style={styles.centerSection}>
    <View style={styles.optionRow}>
      {options.map((option) => (
        <TouchableOpacity key={option} onPress={() => handlePress(option)} activeOpacity={0.7}>
          <Text style={[styles.option, selected === option && styles.selected]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>

    <View style={styles.greetingContainer}>
      <TouchableOpacity onPress={toggleMenu}>
        <Text style={styles.greeting}>Hola, {email}</Text>
      </TouchableOpacity>

      {visible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={goToSettings}>
            <Text style={styles.menuItem}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.menuItem}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
  </SafeAreaView>
)
}
const styles = StyleSheet.create({
header: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 12,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  backgroundColor: '#1a1a1aff',
},
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginRight: 20,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 15,
  },
  option: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selected: {
    textDecorationLine: 'underline',
  },
  topbar: {
  padding: 16,
  backgroundColor: '#111',
  borderBottomWidth: 1,
  borderBottomColor: '#333',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
 rightSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

menu: {
  backgroundColor: '#222',
  padding: 8,
  borderRadius: 6,
  marginBottom: 8,
},
menuItem: {
  color: '#fff',
  paddingVertical: 4,
  fontSize: 14,
},
greetingContainer: {
  alignItems: 'flex-end',
  marginLeft: 'auto',
    paddingLeft: 10,
  paddingTop: 4,
},
greeting: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
centerSection: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
},
safeArea: {
  backgroundColor: '#000',
}

})