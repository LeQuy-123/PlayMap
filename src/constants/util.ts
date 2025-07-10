import colors from '~theme/colors';
import {AsyncStatus, NotificationType} from './type';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const SCREEN = {
    width,
    height,
};
export const getTypeColor = (type: NotificationType) => {
    switch (type) {
        case 'success':
            return colors.success;
        case 'error':
            return colors.error;
        case 'warning':
            return colors.warning;
        case 'info':
            return colors.info;
        default:
            return colors.info;
    }
};
export const getIcon = (type: NotificationType) => {
    switch (type) {
        case 'success':
            return 'check-circle';
        case 'error':
            return 'close-circle';
        case 'warning':
            return 'alert-circle';
        case 'info':
            return 'information';
        default:
            return 'information';
    }
};
export const getDefaultAsyncStatus = (): AsyncStatus => ({
    loading: false,
    error: null,
});

export const MAP_URL = 'mapbox://styles/lequy/ckssqzpz70mts17mq12pjkeo0';
export const DISTANCE_THRESHOLD_METERS = 500;
export const TIME_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

export const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
};