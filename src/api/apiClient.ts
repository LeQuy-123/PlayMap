import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import { store } from '~store/store';

const apiClient = axios.create({
    baseURL: Config.API_URL,
    timeout: 10000,
});
const getTokensFromRedux = () => {
    const state = store.getState();
    const accessToken = state.user.user?.token ?? null;
    const refreshToken = state.user.user?.refreshToken ?? null;
    return {accessToken, refreshToken};
};

// Attach access token to all requests
apiClient.interceptors.request.use(
    async config => {
        const {accessToken} = await getTokensFromRedux();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

// Auto-refresh logic
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Token expired? Try refresh
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const {refreshToken} = await getTokensFromRedux();

            if (!refreshToken) {
                return Promise.reject("No refresh token");
            }

            try {
                const res = await axios.post(`${Config.API_URL}/auth/refresh`, {
                    refresh_token: refreshToken,
                });

                const newAccess = res.data.access_token;
                const newRefresh = res.data.refresh_token;

                await AsyncStorage.setItem("access_token", newAccess);
                await AsyncStorage.setItem("refresh_token", newRefresh);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh failed → logout
                await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
