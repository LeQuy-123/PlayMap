import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
    createOtp,
    forgotPassword,
    login,
    logout,
    register,
    resetStatus,
    verifyOtp,
} from '~store/slices/authSlice';
import {AppDispatch, RootState} from '~store/store';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        user,
        token,
        login: loginState,
        register: registerState,
        verifyOtp: verifyOtpState,
        createOtp: createOtpState,
        forgotPassword: forgotPasswordState,
    } = useSelector((state: RootState) => state.auth);

    const isAuthenticated = !!token;

    // Actions
    const loginUser = (phone: string, password: string) =>
        dispatch(login({phone, password}));

    const registerUser = (name: string, email: string, password: string) =>
        dispatch(register({name, email, password}));

    const sendOtp = (userId: string) => dispatch(createOtp(userId));

    const verifyUserOtp = (code: string, userId: string) =>
        dispatch(verifyOtp({code, userId}));

    const sendForgotPassword = (email: string) =>
        dispatch(forgotPassword(email));

    const logoutUser = async () => {
        await AsyncStorage.removeItem('persist:auth');
        dispatch(logout());
    };

    const resetAuthStatus = () => dispatch(resetStatus());

    return {
        // State
        user,
        token,
        isAuthenticated,
        loginState,
        registerState,
        verifyOtpState,
        createOtpState,
        forgotPasswordState,

        // Actions
        loginUser,
        registerUser,
        sendOtp,
        verifyUserOtp,
        sendForgotPassword,
        logoutUser,
        resetAuthStatus,
    };
};
