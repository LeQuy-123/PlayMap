import {useDispatch, useSelector} from 'react-redux';
import {
    clearLendingDetails,
    getLendingDetails,
    getLendings,
    resetLendingStatus,
} from '~store/slices/lendingSlice';
import {AppDispatch, RootState} from '~store/store';

export const useProducts = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {lendings, lendingDetails, listStatus, detailsStatus} = useSelector(
        (state: RootState) => state.lending,
    );

    // Actions
    const fetchLendingList = (params: URLSearchParams) =>
        dispatch(getLendings(params));

    const fetchLendingDetails = (id: string) => dispatch(getLendingDetails(id));

    const resetStatus = () => dispatch(resetLendingStatus());

    const clearDetails = () => dispatch(clearLendingDetails());

    return {
        // State
        lendings,
        lendingDetails,
        listStatus,
        detailsStatus,

        // Actions
        fetchLendingList,
        fetchLendingDetails,
        resetStatus,
        clearDetails,
    };
};
