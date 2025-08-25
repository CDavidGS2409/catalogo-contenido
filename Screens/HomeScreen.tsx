import React, { useState } from 'react';
import { View, ScrollView, Text, Image,StyleSheet, TouchableOpacity } from 'react-native';

//Importación de componentes personalizados
import PeliculasComponent from '../components/PeliculasComponent';
import SeriesComponent from '../components/SeriesComponent';
import InicioComponent from '../components/InicioComponent';
import CarruselPorGenero from '../components/CarruselPorGenero';
import QueVerComponent from '../components/QueverComponent';
import DetailScreen from './DetailScreen';

//Cliente supabase y navegación
import { Sinopsis } from '../services/supabase';
import { RootStackParamList } from '../types/Show';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TopBar from '../components/TopBar'
import { getUser } from '../services/auth'
import { useEffect } from 'react'

/*
* Pantalla principal de la aplicación
* Muestra contenido dinámico según la opción seleccionada 
* Integra componentes como Inicio, series, carrusel por genero
*/
const HomeScreen = () => {
    //Estados para saber que opción esta seleccionada
const [selected, setSelected] = useState('Inicio');
// Estado para mostrar el nombre de usuario autenticado
const [nombreUsuario, setNombreUsuario] = useState('')
//Obtiene el nombre del usuario desde Supabase
useEffect(() => {
  const fetchNombre = async () => {
    const user = await getUser()
    const nombre = user?.user_metadata?.name ?? ''
    setNombreUsuario(nombre)
  }

  fetchNombre()
}, [])
  return (
    //Vista para encabezado
    <View style={{flex: 1}}>
      <TopBar selected={selected} setSelected={setSelected} />
        {/*Contenido principal con scroll*/}
    <ScrollView style={{ flex: 1, backgroundColor: '#000000ff' }}>
<View style={styles.content}>
  {selected === 'Inicio' && (
    <>
      <InicioComponent selected={selected}/>



      <QueVerComponent />

      <View style={{ paddingVertical: 16 }}>
        <Text style={{ fontSize: 24, color: '#fff', marginBottom: 16 }}>
          Catálogo de Series
        </Text>
        <CarruselPorGenero />
      </View>
    </>
  )}


  {selected === 'Series' && (<><SeriesComponent />
        <View style={{ paddingVertical: 16 }}>
        <Text style={{ fontSize: 24, color: '#fff', marginBottom: 16 }}>
          Catálogo de Series
        </Text>
        <CarruselPorGenero />
      </View></>)}
</View>
    </ScrollView>
    </View>

    
  );



};







//Estilos de encabezado, logo, opciones.
const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000',
    },
    logo:{
        width: 100,
        height: 40,
        resizeMode: 'contain',
        marginRight: 20,
    },
    optionRow:{
        flexDirection: 'row',
        gap: 15,
    },
    option: {
        color: '#fff',
        fontWeight: 'bold',
    },
    content:{
        padding:16,
        flex:1,
        backgroundColor: '#000000ff',



    }
});

export default HomeScreen;
