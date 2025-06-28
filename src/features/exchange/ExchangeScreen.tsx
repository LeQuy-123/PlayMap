import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

const ExchangeScreen = () => {
    return (
        <SafeAreaView style={[ styles.container]}>
            <Text>ExchangeScreen</Text>
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

export default ExchangeScreen;
