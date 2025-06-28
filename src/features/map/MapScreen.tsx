import React from 'react';
import { SafeAreaView, StyleSheet, View  } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoibGVxdXkiLCJhIjoiY2tzc2hpaDJlMGZ3ajMwcGg0eTZlYTVudCJ9.2DvsLCt5Z4o3ySQHThnq3w');

const MapScreen = () => {
    
    return (
        <SafeAreaView style={[ styles.container]}>
            <View style={styles.container}>
                <Mapbox.MapView style={styles.map} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    map: {
        flex: 1
      }
});

export default MapScreen;
