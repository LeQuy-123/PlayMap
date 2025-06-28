/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { toast } from './ToastProvider';

export const useConnectionListener = () => {
    const isConnectedRef = useRef<boolean | null>(null);
    const hasShownLostConnection = useRef(false);
    const hasMounted = useRef(false);

    const checkAgain = () => {
        NetInfo.fetch().then(state => {
            const isOnline = !!(state.isConnected && state.isInternetReachable);
            if (isOnline) {
                toast('Back online', 'success');
                hasShownLostConnection.current = false;
                isConnectedRef.current = true;
            } else {
                toast('Still no internet', 'error', {
                    label: 'Retry',
                    onPress: checkAgain,
                });
            }
        });
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const isOnline = !!(state.isConnected && state.isInternetReachable);

            // Set initial connection status silently
            if (!hasMounted.current) {
                isConnectedRef.current = isOnline;
                hasMounted.current = true;
                return;
            }

            // Lost connection
            if (isConnectedRef.current && !isOnline && !hasShownLostConnection.current) {
                hasShownLostConnection.current = true;
                toast('No internet connection', 'error', {
                    label: 'Reconnect',
                    onPress: checkAgain,
                });
            }

            // Reconnected
            if (!isConnectedRef.current && isOnline) {
                toast('Back online', 'success');
                hasShownLostConnection.current = false;
            }

            isConnectedRef.current = isOnline;
        });

        return () => unsubscribe();
    }, []);
};
