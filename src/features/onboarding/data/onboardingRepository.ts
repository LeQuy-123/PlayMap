import {AppDispatch} from '~store/store';
import {fetchSports} from '~store/slices/sportSlice';
import {pingUser, registerAnonUser} from '~store/slices/userSlice';
import {UserPayload} from '../types';
import { onboardingApi } from '../api/onboardingApi';

export const onboardingRepository = {
    init: async (dispatch: AppDispatch, userId?: string) => {
        await dispatch(fetchSports()).unwrap();
        if (userId) {
            await dispatch(pingUser()).unwrap();
            return false;
        }
        return true;
    },

    confirm: async (dispatch: AppDispatch, payload: UserPayload) => {
        const location = await onboardingApi.getLastLocation();
        return dispatch(
            registerAnonUser({
                ...payload,
                ...location,
            }),
        );
    },
};
