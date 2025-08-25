import { useState } from 'react'
import { View, TextInput, Button, Alert, Image, StyleSheet } from 'react-native'
//Función de autenticación desde Supabase
import { signIn } from '../services/auth'
/**
*Pantalla de Login
*Permite al usuario ingresar su correo y contraseña para iniciar sesión
*/
export default function Login() {
//Estados de captura
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
//Valida si el correo tiene un dominio permitido
  const validateEmail = (email: string) => {
    const allowedDomains = ['.com', 'gmail.com', 'outlook.com', 'hotmail.com']
    return allowedDomains.some(domain => email.endsWith(domain))
  }
/*Valida si la contraseña tiene al menos una mayúscula  y 8 caracteres
* Para reforzar la seguridad de acceso 
*/
  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasMinLength = password.length >= 8
    return hasUppercase && hasMinLength
  }
// Maneja el proceso de Login realizando validaciones
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Correo inválido')
      return
    }

    if (!validatePassword(password)) {
      Alert.alert('Contraseña inválida', 'Debe tener al menos 8 caracteres y una mayúscula')
      return
    }

    const { error } = await signIn({ email, password })

    if (error) {
      Alert.alert('Error de inicio de sesión', error.message)
    } else {
      Alert.alert('Sesión iniciada', `Bienvenido ${email}`)
    }
  }

  return (
    <View style={styles.container}>
{/* Caja principal del login */}
      <View style={styles.loginBox}>
        <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
{/* Formulario de ingreso */}
        <View style={styles.form}>
          <TextInput
            placeholder="Correo"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />
          <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
      </View>
    </View>
  )
}
//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
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
