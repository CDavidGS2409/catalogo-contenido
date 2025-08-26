import { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/Show'
import { signUp } from '../services/auth'

export default function Registro() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  // Validación básica de correo
  const validateEmail = (email: string) => {
    const allowedDomains = ['.com', 'gmail.com', 'outlook.com', 'hotmail.com']
    return allowedDomains.some(domain => email.endsWith(domain))
  }

  // Validación de contraseña: mínimo 8 caracteres y una mayúscula
  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasMinLength = password.length >= 8
    return hasUppercase && hasMinLength
  }

  // Maneja el registro del usuario
  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert('Nombre requerido')
      return
    }

    if (!validateEmail(email)) {
      Alert.alert('Correo inválido')
      return
    }

    if (!validatePassword(password)) {
      Alert.alert('Contraseña inválida', 'Debe tener al menos 8 caracteres y una mayúscula')
      return
    }

    const { error } = await signUp({ email, password, name })

  if (error) {
    Alert.alert('Error al registrar', error.message)
  } else {
    Alert.alert('Registro exitoso', `Bienvenido ${name}`)
    navigation.navigate('Login') 
  }
  }

  return (
    <View style={styles.container}>
      <View style={styles.registerBox}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />

        <View style={styles.form}>
          <TextInput
            placeholder="Nombre"
            onChangeText={setName}
            value={name}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Correo"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Button title="Registrarse" onPress={handleRegister} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 12,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
})