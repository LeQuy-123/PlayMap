import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

const ProductDetail = () => {
    return (
        <SafeAreaView style={[ styles.container]}>
            <Text>ProductDetail</Text>
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

export default ProductDetail;
