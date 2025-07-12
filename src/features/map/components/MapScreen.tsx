import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Mapbox, { Camera, UserLocation, UserTrackingMode, PointAnnotation } from '@rnmapbox/maps';
import Config from 'react-native-config';
import { useMapController } from '../hooks/useMapController';
import colors from '~theme/colors';
import { MAP_URL } from '~constants/util';
import { textStyles } from '~theme/components';
import Icon from '@react-native-vector-icons/material-design-icons';
import ChallengeModal from '../components/ChallengeModal';
import { useChallengeModal } from '../hooks/useChallengeModal';

Mapbox.setAccessToken(Config.MAPBOX_PUPLIC_TOKEN || '');

const MapScreen = () => {
    const {
        isMapFinishLoading,
        setMapFinishLoading,
        haveLocationPermission,
        nearbyUsers,
        handleUserLocationUpdate,
    } = useMapController();
    const {
        modalVisible,
        selectedUser,
        openModal,
        closeModal,
        confirmChallenge,
    } = useChallengeModal();
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Mapbox.MapView
                    styleURL={MAP_URL}
                    logoEnabled
                    compassEnabled
                    onDidFinishLoadingMap={() => setTimeout(() => setMapFinishLoading(true), 500)}
                    style={styles.map}
                >
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
                            {nearbyUsers?.map((user) => (
                                <PointAnnotation
                                    key={user.id}
                                    id={user.id}
                                    onSelected={() => openModal(user)}
                                    coordinate={[user.location.lng, user.location.lat]}
                                >
                                    <View collapsable={false} style={styles.locationPoint}>
                                        <Icon name="map-marker-account" size={30} color={colors.primary} />
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
            <ChallengeModal
                visible={modalVisible}
                username={selectedUser?.name || ''}
                onConfirm={confirmChallenge}
                onCancel={closeModal}
            />
        </>
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
    },
});

export default MapScreen;
