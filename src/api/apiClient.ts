import axios from 'axios';
import Config from 'react-native-config';


const apiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

// Attach access token to requests
apiClient.interceptors.request.use(
  async config => {
    // const state = store.getState();
    // const token = state.auth.token;

    // const netInfo = await NetInfo.fetch();
    // if (!netInfo.isConnected) {
    //   toast({
    //     msg: 'No internet connection',
    //     type: 'error',
    //   });
    //   return Promise.reject({__handled: true});
    // }

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  error => Promise.reject(error),
);

// Refresh token handling
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {prom.reject(error);}
//     else {prom.resolve(token);}
//   });
//   failedQueue = [];
// };

// Response Interceptor
apiClient.interceptors.response.use(
  response => response,
  async error => {

    // const originalRequest = error.config;
    // const status = error.response?.status;
    // const state = store.getState();

    // const shouldTryRefresh =
    //   status === 401 && !originalRequest._retry && state.auth.refreshToken;

    // if (shouldTryRefresh) {
    //   originalRequest._retry = true;

    //   if (isRefreshing) {
    //     return new Promise((resolve, reject) => {
    //       failedQueue.push({
    //         resolve: (token: string) => {
    //           originalRequest.headers.Authorization = 'Bearer ' + token;
    //           resolve(apiClient(originalRequest));
    //         },
    //         reject: (err: any) => reject(err),
    //       });
    //     });
    //   }

    //   isRefreshing = true;

    //   try {
    //     // const res = await  AuthService.refreshTokenApi(state.auth.refreshToken!);
    //     const { data } = await apiClient.post('/auth/refresh', {
    //       refreshToken: state.auth.refreshToken,
    //     });
    //     const {accessToken, refreshToken, user} = data;

    //     store.dispatch(setAuth({user, token: accessToken, refreshToken}));
    //     processQueue(null, accessToken);

    //     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    //     return apiClient(originalRequest);
    //   } catch (refreshErr: any) {
    //     processQueue(refreshErr, null);
    //     store.dispatch(logout());
    //     toast({
    //       msg: 'Session expired. Please log in again.',
    //       type: 'error',
    //     });
    //     return Promise.reject({...refreshErr, __handled: true});
    //   } finally {
    //     isRefreshing = false;
    //   }
    // }
 

    return Promise.reject(error);
  },
);

export default apiClient;
