import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Mapbox, {
    Camera,
    requestAndroidLocationPermissions,
    UserLocation,
    UserTrackingMode,
    PointAnnotation,
} from '@rnmapbox/maps';
import Config from 'react-native-config';
import { useUser } from '~hooks/useUser';
import { DISTANCE_THRESHOLD_METERS, haversineDistance, MAP_URL, TIME_THRESHOLD_MS } from '~constants/util';
import Icon from '@react-native-vector-icons/material-design-icons';
import { textStyles } from '~theme/components';
import colors from '~theme/colors';

Mapbox.setAccessToken(Config.MAPBOX_PUPLIC_TOKEN || '');



const MapScreen = () => {
    const [haveLocationPermission, setHaveLocationPermission] = useState(
        Platform.OS === 'android' ? false : true,
    );
    const [isMapFinishLoading, setMapFinishLoading] = useState(false);
    const hasFetchedInitially = useRef(false);
    const lastKnownLocation = useRef<{ lat: number; lng: number } | null>(null);


    const { nearbyUsers, fetchNearby } = useUser();

    const lastFetchTime = useRef<number | null>(null);
    const lastFetchLocation = useRef<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestAndroidLocationPermissions().then(setHaveLocationPermission);
        }
    }, []);

    const handleUserLocationUpdate = useCallback((location: Mapbox.Location) => {
        const coords = location.coords;
        const newLoc = {
            lat: coords.latitude,
            lng: coords.longitude,
        };

        lastKnownLocation.current = newLoc;

        const now = Date.now();
        const lastTime = lastFetchTime.current;
        const lastLoc = lastFetchLocation.current;

        const timeDiff = lastTime ? now - lastTime : Infinity;
        const distance = lastLoc
            ? haversineDistance(newLoc.lat, newLoc.lng, lastLoc.lat, lastLoc.lng)
            : Infinity;

        const shouldFetch = timeDiff > TIME_THRESHOLD_MS || distance > DISTANCE_THRESHOLD_METERS;

        // 🟢 Initial fetch logic
        if (!hasFetchedInitially.current && newLoc.lat && newLoc.lng) {
            hasFetchedInitially.current = true;
            lastFetchTime.current = now;
            lastFetchLocation.current = newLoc;

            fetchNearby({
                lat: newLoc.lat.toString(),
                lng: newLoc.lng.toString(),
                radius_km: '5',
            });
            return;
        }

        // 🔁 Debounced fetch logic
        if (shouldFetch) {
            lastFetchTime.current = now;
            lastFetchLocation.current = newLoc;

            fetchNearby({
                lat: newLoc.lat.toString(),
                lng: newLoc.lng.toString(),
                radius_km: '5',
            });
        }
    }, [fetchNearby]);
    
    return (
        <SafeAreaView style={styles.container}>
            <Mapbox.MapView
                styleURL={MAP_URL}
                logoEnabled
                compassEnabled
                onDidFinishLoadingMap={() =>
                    setTimeout(() => setMapFinishLoading(true), 500)
                }
                style={styles.map}>
                {isMapFinishLoading && (
                    <>
                        {haveLocationPermission && (
                            <UserLocation
                                visible={true}
                                minDisplacement={0}
                                onUpdate={handleUserLocationUpdate}
                            />
                        )}
                        <Camera
                            followUserLocation={true}
                            followUserMode={UserTrackingMode.Follow}
                            zoomLevel={12}
                            animationMode="flyTo"
                        />
                        {nearbyUsers?.map(user => (
                            <PointAnnotation
                                key={user.id}
                                id={user.id}
                                coordinate={[user.location.lng, user.location.lat]}>
                                <View collapsable={false} style={styles.locationPoint}>
                                    <Icon name='map-marker-account' size={30} color={colors.primary}/>
                                    <Text style={[textStyles.tag, { color: colors.primary }]}>
                                        {user.name}
                                    </Text>
                                </View>
                                
                            </PointAnnotation>
                        ))}
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
    map: {
        flex: 1,
    },
    locationPoint: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MapScreen;
