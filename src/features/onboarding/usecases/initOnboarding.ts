import {AppDispatch} from '~store/store';
import {onboardingRepository} from '../data/onboardingRepository';

export const initOnboarding = async (
    dispatch: AppDispatch,
    userId?: string,
) => {
    try {
        const shouldShowModal = await onboardingRepository.init(
            dispatch,
            userId,
        );
        return shouldShowModal;
    } catch (e) {
        console.log('Init failed', e);
        return true;
    }
};
