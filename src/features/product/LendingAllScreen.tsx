import React from 'react';
import { Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import useMainNavigation from '~hooks/useMainNavigation';

const LendingAllScreen = () => {
    const {navigation} = useMainNavigation();
    const handleGoToCreateLending = () => {
        navigation.navigate('ProductDetail');
    };
    return (
        <SafeAreaView style={[ styles.container]}>
            <Text>LendingAllScreen</Text>
            <Text>Under Construction</Text>
            <Pressable style={styles.button} onPress={handleGoToCreateLending}>
                <Text style={styles.buttonText}>Go to Create Lending</Text>
            </Pressable>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default LendingAllScreen;
