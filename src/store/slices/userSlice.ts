import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '~services/UserService';

interface UserLocation {
    lat: number;
    lng: number;
}

interface User {
    id: string;
    name: string;
    is_anonymous: boolean;
    location: UserLocation;
}

interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

// Thunk to register anonymous user
export const registerAnonUser = createAsyncThunk(
    'user/registerAnonUser',
    async (
        {
            name,
            latitude,
            longitude,
            main_sport_id,
        }: {
            name: string;
            latitude: number;
            longitude: number;
            main_sport_id: string;
        },
        {rejectWithValue},
    ) => {
        try {
            const res = await UserService.registerAnonUser(
                name,
                latitude,
                longitude,
                main_sport_id,
            );

            const {user} = res;

            if (!user?.token || !user?.refresh_token) {
                throw new Error('Missing tokens in user object');
            }

            // Save tokens to AsyncStorage
            await AsyncStorage.setItem('access_token', user.token);
            await AsyncStorage.setItem('refresh_token', user.refresh_token);

            // Return simplified user object
            return {
                id: user.id,
                name: user.name,
                is_anonymous: user.is_anonymous,
                location: user.location,
            };
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: state => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
            AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerAnonUser.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerAnonUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerAnonUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;
