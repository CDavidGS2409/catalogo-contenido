import { supabase } from '../services/supabase'

/**
* Registra un nuevo usuario en Supabase con email y contraseña, guarda el nombre como metadata del usuario
*
*
*
*
*
*/

export async function signUp({ email, password, name }: { email: string; password: string; name: string }) {
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }, //Guarda el nombre en los metadatos
  })
}

/**
*  Inicia sesión con email y contraseña
*  @param{Object} params - Credenciales del usuario
*  @param{string} params.email - Correo electrónico
*  @param{string} params.password - Contraseña
*  @param{Promise} - Resultado de la operación de inicion de sesion
*/
export async function signIn({ email, password }: { email: string; password: string }) {
  return await supabase.auth.signInWithPassword({ email, password })
}

/**
* Cierra la sesión del usuario actual
* @return {Promise} - Resultado de la operación de cierre de sesión
*/
export async function signOut() {
  return await supabase.auth.signOut()
}
/**
* Obtiene los datos del usuario actualmente autenticado
*
*@returns {Promise<User | null>} - Objeto de usuario si hay sesión activa o no
*/
export async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data?.user
}
