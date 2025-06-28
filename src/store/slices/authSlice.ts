import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {createTransform} from 'redux-persist';
import {User} from 'src/types/global';
import AuthService from '~services/AuthService';
import {toast} from '~utils/ToastProvider';

type LoginAPIRes = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
interface AsyncStatus {
  loading: boolean;
  error: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  login: AsyncStatus;
  register: AsyncStatus;
  createOtp: AsyncStatus;
  verifyOtp: AsyncStatus;
  forgotPassword: AsyncStatus;
}

const getDefaultAsyncState = (): AsyncStatus => ({loading: false, error: null});

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  login: getDefaultAsyncState(),
  register: getDefaultAsyncState(),
  createOtp: getDefaultAsyncState(),
  verifyOtp: getDefaultAsyncState(),
  forgotPassword: getDefaultAsyncState(),
};
//this config the data to save into AsyncStorage using redux-persist
export const authTransform = createTransform(
  (inboundState: any) => ({
    user: inboundState.user,
    token: inboundState.token,
    refreshToken: inboundState.refreshToken,
  }),
  outboundState => ({
    refreshToken: outboundState.refreshToken,
    user: outboundState.user,
    token: outboundState.token,
    login: getDefaultAsyncState(),
    register: getDefaultAsyncState(),
    createOtp: getDefaultAsyncState(),
    verifyOtp: getDefaultAsyncState(),
    forgotPassword: getDefaultAsyncState(),
  }),
  {whitelist: ['auth']},
);
// Thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({phone, password}: {phone: string; password: string}, thunkAPI) => {
    try {
      const res: LoginAPIRes = await AuthService.login(phone, password);
      if (res.accessToken) {
        return {
          user: res.user,
          token: res.accessToken,
          refreshToken: res.refreshToken,
        };
      } else {
        return thunkAPI.rejectWithValue('Login failed');
      }
    } catch (error: any) {
      toast({
        msg: error.response?.data?.error?.localizedMessage || 'Login failed',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(
        error.response?.data?.error?.localizedMessage || 'Login failed',
      );
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    {name, email, password}: {name: string; email: string; password: string},
    thunkAPI,
  ) => {
    try {
      const res = await AuthService.register(name, email, password);
      console.log('🚀 ~ res:', res.data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || 'Registration failed');
    }
  },
);

export const createOtp = createAsyncThunk(
  'auth/createOtp',
  async (userId: string, thunkAPI) => {
    try {
      return await AuthService.createOtp(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Create OTP failed',
      );
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({code, userId}: {code: string; userId: string}, thunkAPI) => {
    try {
      const data = await AuthService.verifyOtp(code, userId);
      localStorage.setItem('authUser', JSON.stringify(data));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'OTP verification failed',
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, thunkAPI) => {
    try {
      return await AuthService.forgotPassword(email);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Forgot password failed',
      );
    }
  },
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
    setAuth(
      state,
      action: PayloadAction<{user: User; token: string; refreshToken: string}>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    resetStatus(state) {
      state.login = getDefaultAsyncState();
      state.register = getDefaultAsyncState();
      state.createOtp = getDefaultAsyncState();
      state.verifyOtp = getDefaultAsyncState();
      state.forgotPassword = getDefaultAsyncState();
    },
  },
  extraReducers: builder => {
    const handleAsync = (
      type: keyof Omit<AuthState, 'user' | 'token' | 'refreshToken'>,
      thunk: any,
    ) => {
      builder
        .addCase(thunk.pending, state => {
          state[type].loading = true;
          state[type].error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state[type].loading = false;
          if (type === 'login') {
            state.user = action.payload.user;
            state.refreshToken = action.payload.refreshToken;
            state.token = action.payload.token;
          }
        })
        .addCase(thunk.rejected, (state, action) => {
          state[type].loading = false;
          state[type].error = action.payload as string;
        });
    };

    handleAsync('login', login);
    handleAsync('register', register);
    handleAsync('createOtp', createOtp);
    handleAsync('verifyOtp', verifyOtp);
    handleAsync('forgotPassword', forgotPassword);
  },
});

export const {logout, setAuth, resetStatus} = authSlice.actions;
export default authSlice.reducer;
