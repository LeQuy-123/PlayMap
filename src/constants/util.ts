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