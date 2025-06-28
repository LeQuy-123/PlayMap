import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import Mapbox, { Camera, requestAndroidLocationPermissions, UserLocation, UserTrackingMode } from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoibGVxdXkiLCJhIjoiY2tzc2hpaDJlMGZ3ajMwcGg0eTZlYTVudCJ9.2DvsLCt5Z4o3ySQHThnq3w');

const MapScreen = () => {
    const [haveLocationPermission, setHaveLocationPermission] = useState(Platform.OS === 'android' ? false : true);

    useEffect(() => {
        Platform.OS === 'android' ? requestAndroidLocationPermissions().then((havePermission) => setHaveLocationPermission(havePermission)) : null
    }, [])
    const onLocationUpdate = (location: Mapbox.Location) => {
        console.log('MAPBOX-LOCATION:', location);
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <Mapbox.MapView
                styleURL={'mapbox://styles/lequy/ckssqzpz70mts17mq12pjkeo0'}
                logoEnabled
                compassEnabled
                style={styles.map} >
                {haveLocationPermission && <UserLocation visible={true} minDisplacement={0} onUpdate={onLocationUpdate} />}
                <Camera
                    followUserLocation={true}
                    followUserMode={UserTrackingMode.Follow}
                    zoomLevel={5}
                    animationMode='flyTo'
                />

            </Mapbox.MapView>
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
