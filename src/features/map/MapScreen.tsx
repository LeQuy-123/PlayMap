import React from 'react';
import { Text, SafeAreaView, StyleSheet  } from 'react-native';
import Config from 'react-native-config';

const MapScreen = () => {
    
    return (
        <SafeAreaView style={[ styles.container]}>
            <Text>ENV = {Config.ENV}</Text>
            <Text>API = {Config.API_URL}</Text>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapScreen;
