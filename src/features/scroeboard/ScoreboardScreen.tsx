import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

const ScoreboardScreen = () => {
    return (
        <SafeAreaView style={[ styles.container]}>
            <Text>ScoreboardScreen</Text>
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

export default ScoreboardScreen;
