import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import SportSerivce from '~services/SportSerivce';

// Thunk to fetch sports
export const fetchSports = createAsyncThunk(
  'sports/fetchList',
  async (_, {rejectWithValue}) => {
    try {
      const data = await SportSerivce.getListSport();
      return data.sports;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Initial state
interface SportState {
  sports: any[]; // Replace `any` with your sport model if available
  loading: boolean;
  error: string | null;
}

const initialState: SportState = {
  sports: [],
  loading: false,
  error: null,
};

// Slice
const sportSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {
    clearSports(state) {
      state.sports = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSports.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSports.fulfilled, (state, action) => {
        state.loading = false;
        state.sports = action.payload;
      })
      .addCase(fetchSports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearSports} = sportSlice.actions;

export default sportSlice.reducer;
