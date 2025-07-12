import {useSelector} from 'react-redux';
import {RootState} from '~store/store';

export const useProfileController = () => {
    const user = useSelector((state: RootState) => state.user.user);

    // Demo data
    const numberOfMatches = 12;
    const score = 1340;

    return {
        user,
        numberOfMatches,
        score,
    };
};
