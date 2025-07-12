import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { AsyncStatus } from '~constants/type';
import { getDefaultAsyncStatus } from '~constants/util';
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
export type NearbyUser = {
    id: string;
    name: string;
    location: UserLocation;
    is_anonymous: boolean;
    main_sport?: {
        id: string;
        name: string;
    } | null;
};

interface UserState {
    user: User | null;
    status: AsyncStatus;
    pingStatus: AsyncStatus;
    nearbyUsers: NearbyUser[];
    nearbyStatus: AsyncStatus;
}



const initialState: UserState = {
    user: null,
    nearbyUsers: [],
    nearbyStatus: getDefaultAsyncStatus(),
    status: getDefaultAsyncStatus(),
    pingStatus: getDefaultAsyncStatus(),
};

// -------------------
// Async Thunks
// -------------------

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

export const pingUser = createAsyncThunk(
    'user/pingUser',
    async (_, {rejectWithValue}) => {
        try {
            await UserService.ping();
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    },
);
export const getNearByUser = createAsyncThunk(
    'user/getNearByUser',
    async (
        params: {
            lat: string;
            lng: string;
            radius_km?: string;
        },
        {rejectWithValue},
    ) => {
        try {
            const res = await UserService.getNearByUser(params);
            return res.users;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    },
);
// -------------------
// Slice
// -------------------

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state) {
            state.user = null;
            state.nearbyStatus = getDefaultAsyncStatus();
            state.status = getDefaultAsyncStatus();
            state.pingStatus = getDefaultAsyncStatus();
        },
    },
    extraReducers: builder => {
        const handleAsync = (
            statusKey: keyof Pick<
                UserState,
                'status' | 'pingStatus' | 'nearbyStatus'
            >,
            thunk: any,
            onFulfilled?: (state: UserState, action: any) => void,
        ) => {
            builder
                .addCase(thunk.pending, state => {
                    state[statusKey].loading = true;
                    state[statusKey].error = null;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state[statusKey].loading = false;
                    if (onFulfilled) {
                        onFulfilled(state, action);
                    }
                })
                .addCase(thunk.rejected, (state, action) => {
                    state[statusKey].loading = false;
                    state[statusKey].error = action.payload as string;
                });
        };

        handleAsync('status', registerAnonUser, (state, action) => {
            state.user = action.payload;
        });

        handleAsync('pingStatus', pingUser);
        handleAsync('nearbyStatus', getNearByUser, (state, action) => {
            state.nearbyUsers = action.payload;
        });
    },
});

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;
