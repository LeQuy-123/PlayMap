import {locationManager} from '@rnmapbox/maps';

export const onboardingApi = {
    getLastLocation: async () => {
        const location = await locationManager.getLastKnownLocation();
        if (!location?.coords) throw new Error('Location not available');
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
    },
};
