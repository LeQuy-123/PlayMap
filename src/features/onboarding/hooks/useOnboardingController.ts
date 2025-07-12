import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '~store/store';
import {Sport} from '~store/slices/sportSlice';
import {initOnboarding} from '../usecases/initOnboarding';
import {confirmOnboarding} from '../usecases/confirmOnboarding';

export const useOnboardingController = () => {
    const dispatch = useDispatch<AppDispatch>();
    const sports = useSelector((state: RootState) => state.sport.sports);
    const status = useSelector((state: RootState) => state.user.status);
    const user = useSelector((state: RootState) => state.user.user);

    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('Anon');
    const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

    useEffect(() => {
        initOnboarding(dispatch, user?.id).then(setVisible);
    }, []);

    const handleConfirm = async () => {
        if (!selectedSport) return;
        try {
            await confirmOnboarding(dispatch, {
                name,
                main_sport_id: selectedSport.id,
            });
        } catch (error) {
            console.error('Error confirming onboarding:', error);
        } finally {
            setVisible(false);
        }
    };

    return {
        visible,
        name,
        setName,
        sports,
        selectedSport,
        setSelectedSport,
        handleConfirm,
        status,
    };
};
