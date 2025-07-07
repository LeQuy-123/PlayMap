import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '~services/UserService';

interface UserState {
    user: any; // Ideally, define a proper User type
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
            const data = await UserService.registerAnonUser(
                name,
                latitude,
                longitude,
                main_sport_id,
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state) {
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
