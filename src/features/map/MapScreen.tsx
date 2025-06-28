import React from 'react';
import { Text, SafeAreaView, useColorScheme, StyleSheet  } from 'react-native';
import Config from 'react-native-config';

const MapScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#323232' : '#fff',
    };
    return (
        <SafeAreaView style={[backgroundStyle, styles.container]}>
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
