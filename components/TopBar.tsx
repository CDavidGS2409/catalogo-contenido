//Componente para mostrar la barra superior con el logo y las opciones de inicio, series y cuenta

//Hooks de React y componentes de React Native
import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
//Navegación entre pantallas
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
//Tipo de navegación
import { RootStackParamList } from '../types/Show'
import { supabase } from '../services/supabase'
import { useUserMenu } from '../Hook/useUserMenu'
import { SafeAreaView } from 'react-native'
import { StatusBar, Platform } from 'react-native'

//Props que recibe el componente
type Props = {
  selected: string //Opción actualmente seleccionada en la barra
  setSelected?: (option: string) => void //Función para actualizar la opción seleccionada
}

//Componente principal de la barra superior
export default function TopBar({ selected, setSelected }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
//Estado para guardar el correo del usuario autenticado
  const [email, setEmail] = useState('')
//Hook personalizado para controlar la visibilidad del menu y acciones
  const { visible, toggleMenu, goToSettings, logout } = useUserMenu()
//Obtiene el correo del usuario al montar el componente
  useEffect(() => {
    const fetchEmail = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user?.email) {
        setEmail(data.user.email)
      }
    }
    fetchEmail()
  }, [])
//Maneja la navegación y selección de opción
  const handlePress = (option: string) => {
    if (option === 'Inicio') {
//Reinicia la navegación a la pantalla principal
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    }
//Actualiza la opción seleccionada si se proporciona la función
    if (setSelected) {
      setSelected(option)
    }
  }
//Opciones disponibles
  const options = ['Inicio', 'Series']

return (
  <SafeAreaView style={styles.safeArea}>
  <View style={styles.header}>
    {/*Logo que redirige a 'Inicio'*/}
    <TouchableOpacity onPress={() => handlePress('Inicio')} activeOpacity={0.7}>
      <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
    </TouchableOpacity>
    {/*Sección central con opciones de navegación'*/}
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
    {/*Seción de usuario con menu desplegable*/}
    <View style={styles.greetingContainer}>
      <TouchableOpacity onPress={toggleMenu}>
        <Text style={styles.greeting}>Hola, {email}</Text>
      </TouchableOpacity>
    {/*Menú visible al seleccionar el saludo*/}
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

//Estilos
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
