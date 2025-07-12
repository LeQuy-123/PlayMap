import {useCallback, useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {AppDispatch, RootState} from '~store/store';
import {useDispatch, useSelector} from 'react-redux';
import {
    haversineDistance,
    TIME_THRESHOLD_MS,
    DISTANCE_THRESHOLD_METERS,
} from '~constants/util';
import {fetchNearbyUsers} from '../usecases/fetchNearbyUsers';
import {NearbyUser} from '~store/slices/userSlice';

export const useMapController = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [haveLocationPermission, setHaveLocationPermission] = useState(
        Platform.OS === 'android' ? false : true,
    );
    const [isMapFinishLoading, setMapFinishLoading] = useState(false);

    const nearbyUsers = useSelector(
        (state: RootState) => state.user.nearbyUsers,
    ) as NearbyUser[];

    const hasFetchedInitially = useRef(false);
    const lastFetchTime = useRef<number | null>(null);
    const lastFetchLocation = useRef<{lat: number; lng: number} | null>(null);

    useEffect(() => {
        if (Platform.OS === 'android') {
            Mapbox.requestAndroidLocationPermissions().then(
                setHaveLocationPermission,
            );
        }
    }, []);

    const handleUserLocationUpdate = useCallback(
        async (location: Mapbox.Location) => {
            const coords = location.coords;
            const newLoc = {
                lat: coords.latitude,
                lng: coords.longitude,
            };

            const now = Date.now();
            const lastTime = lastFetchTime.current;
            const lastLoc = lastFetchLocation.current;

            const timeDiff = lastTime ? now - lastTime : Infinity;
            const distance = lastLoc
                ? haversineDistance(
                    newLoc.lat,
                    newLoc.lng,
                    lastLoc.lat,
                    lastLoc.lng,
                )
                : Infinity;

            const shouldFetch =
                timeDiff > TIME_THRESHOLD_MS ||
                distance > DISTANCE_THRESHOLD_METERS;

            if (!hasFetchedInitially.current && newLoc.lat && newLoc.lng) {
                hasFetchedInitially.current = true;
                lastFetchTime.current = now;
                lastFetchLocation.current = newLoc;
                await fetchNearbyUsers(
                    dispatch,
                    newLoc.lat.toString(),
                    newLoc.lng.toString(),
                );
                return;
            }

            if (shouldFetch) {
                lastFetchTime.current = now;
                lastFetchLocation.current = newLoc;
                await fetchNearbyUsers(
                    dispatch,
                    newLoc.lat.toString(),
                    newLoc.lng.toString(),
                );
            }
        },
        [dispatch],
    );

    return {
        isMapFinishLoading,
        setMapFinishLoading,
        haveLocationPermission,
        nearbyUsers,
        handleUserLocationUpdate,
    };
};
