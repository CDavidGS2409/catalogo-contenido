//Componente que funciona para mandar a llamar el catalogo de series
//Importa REACT y componentes básicos de React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Componente funcional que muestra un mensaje de bienvenida
const SeriesComponent = () => {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la sección de series</Text>
     
    </View>
    );
};

//Estilos
const styles = StyleSheet.create({
    container:
    {
        padding:16,
    },
    title:
    {
        color: '#ffffffff',
        fontSize: 20,
        fontWeight: 'bold',

    },
})

export default SeriesComponent;
