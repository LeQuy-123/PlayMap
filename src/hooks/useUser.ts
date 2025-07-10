import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {
    registerAnonUser,
    pingUser,
    getNearByUser,
    logoutUser,
} from '~store/slices/userSlice'; // adjust path as needed
import {RootState, AppDispatch} from '~store/store'; // adjust if needed

export const useUser = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {user, status, pingStatus, nearbyUsers, nearbyStatus} = useSelector(
        (state: RootState) => state.user,
    );

    // --------- Actions ---------

    const register = useCallback(
        (params: {
            name: string;
            latitude: number;
            longitude: number;
            main_sport_id: string;
        }) => dispatch(registerAnonUser(params)),
        [dispatch],
    );

    const ping = useCallback(() => dispatch(pingUser()), [dispatch]);

    const fetchNearby = useCallback(
        (params: {lat: string; lng: string; radius_km?: string}) =>
            dispatch(getNearByUser(params)),
        [dispatch],
    );

    const logout = useCallback(() => dispatch(logoutUser()), [dispatch]);

    // --------- Return all ---------

    return {
        user,
        status,
        pingStatus,
        nearbyUsers,
        nearbyStatus,
        register,
        ping,
        fetchNearby,
        logout,
    };
};
