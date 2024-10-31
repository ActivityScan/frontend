import {  ClubInitialState } from '@/Types/types';
import { fetchClubInfoById } from '@/utils/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ClubInitialState = {

  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
  loading: false,
  data: null,
  chosenClubLongitude: 0,
  chosenClubLatitude: 0,  
};


const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    // setClub: (state, action: PayloadAction<ClubInitialState>) => {
    //     return { ...state, ...action.payload }; // Обновляем состояние клуба
    //   },

    setChosenClubCoordinates: (state, action: PayloadAction<{ longitude: number; latitude: number }>) => {
      state.chosenClubLongitude = action.payload.longitude;
      state.chosenClubLatitude = action.payload.latitude;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchClubInfoById.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchClubInfoById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        // return { ...state, ...action.payload };
        state.data = action.payload;
      })
      .addCase(fetchClubInfoById.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message || 'Произошла ошибка при получении данных о клубах';
      });
  },
});

export const { setChosenClubCoordinates } = clubSlice.actions;

export default clubSlice.reducer;