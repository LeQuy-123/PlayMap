import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, SafeAreaView, useColorScheme, StyleSheet  } from 'react-native';
import Config from 'react-native-config';
import { useAuth } from '~hooks/useAuth';

const HomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const { t } = useTranslation();
    const { user } = useAuth();
    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#323232' : '#fff',
    };
    return (
        <SafeAreaView style={[backgroundStyle, styles.container]}>
            <Text>ENV = {Config.ENV}</Text>
            <Text>API = {Config.API_URL}</Text>
            <Text>{t('greeting', { name: user?.fullname })}</Text>
           
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

export default HomeScreen;
