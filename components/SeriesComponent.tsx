import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SeriesComponent = () => {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la sección de series</Text>
     
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

export default SeriesComponent;