import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PeliculasComponent = () => {
    return (
            <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la sección de peliculas</Text>
     
    </View>
    );
};

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

export default PeliculasComponent;