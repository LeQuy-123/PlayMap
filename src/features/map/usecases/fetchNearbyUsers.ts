import {AppDispatch} from '~store/store';
import {getNearByUser} from '~store/slices/userSlice';

export const fetchNearbyUsers = async (
    dispatch: AppDispatch,
    lat: string,
    lng: string,
    radius_km = '5',
) => {
    await dispatch(getNearByUser({lat, lng, radius_km})).unwrap();
};
