import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import Mapbox, {
    Camera,
    requestAndroidLocationPermissions,
    UserLocation,
    UserTrackingMode,
} from '@rnmapbox/maps';
import Config from 'react-native-config';

Mapbox.setAccessToken(Config.MAPBOX_PUPLIC_TOKEN || '');
const MAP_URL = 'mapbox://styles/lequy/ckssqzpz70mts17mq12pjkeo0';
const MapScreen = () => {
    const [haveLocationPermission, setHaveLocationPermission] = useState(
        Platform.OS === 'android' ? false : true,
    );
    const [isMapFinishLoading, setMapFinishLoading] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestAndroidLocationPermissions().then(havePermission =>
                setHaveLocationPermission(havePermission),
            );
        }
    }, []);

    return (
        <SafeAreaView style={[styles.container]}>
            <Mapbox.MapView
                styleURL={MAP_URL}
                logoEnabled
                onDidFinishLoadingMap={() => {
                    setTimeout(() => {
                        setMapFinishLoading(true);
                    }, 500);
                }}
                compassEnabled
                style={styles.map}>
                {isMapFinishLoading && (
                    <>
                        {haveLocationPermission && (
                            <UserLocation visible={true} minDisplacement={0} />
                        )}
                        <Camera
                            followUserLocation={true}
                            followUserMode={UserTrackingMode.Follow}
                            zoomLevel={5}
                            animationMode="flyTo"
                        />
                    </>
                )}
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
        flex: 1,
    },
});

export default MapScreen;
