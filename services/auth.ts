import { supabase } from '../services/supabase'

export async function signUp({ email, password, name }: { email: string; password: string; name: string }) {
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
}

export async function signIn({ email, password }: { email: string; password: string }) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data?.user
}