import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import LendingService from '~services/LendingService';

type Lending = any;

interface AsyncStatus {
  loading: boolean;
  error: string | null;
}

interface LendingState {
  lendings: Lending[];
  lendingDetails: Lending | null;
  listStatus: AsyncStatus;
  detailsStatus: AsyncStatus;
}

const getDefaultAsyncState = (): AsyncStatus => ({
  loading: false,
  error: null,
});

const initialState: LendingState = {
  lendings: [],
  lendingDetails: null,
  listStatus: getDefaultAsyncState(),
  detailsStatus: getDefaultAsyncState(),
};

// Thunks

export const getLendings = createAsyncThunk(
  'lending/getList',
  async (params: URLSearchParams, thunkAPI) => {
    try {
      const res = await LendingService.getAll(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.message || 'Failed to fetch lendings',
      );
    }
  },
);

export const getLendingDetails = createAsyncThunk(
  'lending/getDetails',
  async (id: string, thunkAPI) => {
    try {
      const res = await LendingService.getById(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.message || 'Failed to fetch lending details',
      );
    }
  },
);

// Slice

const lendingSlice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    resetLendingStatus(state) {
      state.listStatus = getDefaultAsyncState();
      state.detailsStatus = getDefaultAsyncState();
    },
    clearLendingDetails(state) {
      state.lendingDetails = null;
    },
  },
  extraReducers: builder => {
    const handleAsync = (
      statusKey: keyof Pick<LendingState, 'listStatus' | 'detailsStatus'>,
      thunk: any,
    ) => {
      builder
        .addCase(thunk.pending, state => {
          state[statusKey].loading = true;
          state[statusKey].error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state[statusKey].loading = false;
          if (statusKey === 'listStatus') {
            state.lendings = action.payload;
          }
          if (statusKey === 'detailsStatus') {
            state.lendingDetails = action.payload;
          }
        })
        .addCase(thunk.rejected, (state, action) => {
          state[statusKey].loading = false;
          state[statusKey].error = action.payload as string;
        });
    };

    handleAsync('listStatus', getLendings);
    handleAsync('detailsStatus', getLendingDetails);
  },
});

export const {resetLendingStatus, clearLendingDetails} = lendingSlice.actions;
export default lendingSlice.reducer;
