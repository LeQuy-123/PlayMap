import {useState} from 'react';
import {NearbyUser} from '~store/slices/userSlice';
import {sendChallenge} from '../usecases/sendChallenge';
import {useSelector} from 'react-redux';
import {RootState} from '~store/store';
import { Alert } from 'react-native';

export const useChallengeModal = () => {
    const [visible, setVisible] = useState(false);
    const [targetUser, setTargetUser] = useState<NearbyUser | null>(null);
    const currentUser = useSelector((state: RootState) => state.user.user);

    const openModal = (user: NearbyUser) => {
        setTargetUser(user);
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
        setTargetUser(null);
    };

    const confirmChallenge = async () => {
        if (!targetUser || !currentUser) return;
        try {
            await sendChallenge({
                to_user_id: targetUser.id,
                sport_id: targetUser.main_sport?.id || '', // or use user's sport
            });
            Alert.alert('Challenge sent!');
        } catch (e) {
            console.log("🚀 ~ confirmChallenge ~ e:", e)
            Alert.alert('Failed to challenge');
        } finally {
            closeModal();
        }
    };

    return {
        modalVisible: visible,
        selectedUser: targetUser,
        openModal,
        closeModal,
        confirmChallenge,
    };
};
