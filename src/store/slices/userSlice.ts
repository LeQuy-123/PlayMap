// userSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '~services/UserService';

interface UserLocation {
    lat: number;
    lng: number;
}

export interface User {
    id: string;
    name: string;
    is_anonymous: boolean;
    location: UserLocation;
    token: string;
    refreshToken: string;
}

interface UserState {
    user: User | null;
    status: 'idle' | 'loading';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

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

            if (!user?.token || !user?.refreshToken) {
                throw new Error('Missing tokens in user object');
            }

            // return full user object for persist
            return {
                id: user.id,
                name: user.name,
                is_anonymous: user.is_anonymous,
                location: user.location,
                token: user.token,
                refreshToken: user.refreshToken,
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
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerAnonUser.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerAnonUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
            })
            .addCase(registerAnonUser.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload as string;
            });
    },
});

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;
