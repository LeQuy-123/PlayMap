import {AppDispatch} from '~store/store';
import {UserPayload} from '../types';
import {onboardingRepository} from '../data/onboardingRepository';

export const confirmOnboarding = async (
    dispatch: AppDispatch,
    payload: UserPayload,
) => {
    return onboardingRepository.confirm(dispatch, payload);
};
