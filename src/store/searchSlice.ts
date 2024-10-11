import { SearchState } from "@/Types/types";
import { createAsyncThunk, createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchClubs } from "@/utils/api";
import { object } from "yup";
import { ClubsType } from './../Types/types';

const initialState: SearchState = {
  // sport: state.sports.selectedSports,
  age: undefined,
  address: "",
  modeWork: '' as SearchState['modeWork'],
  weekdayTimes: [],
  clubs: [],
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
};
export const setModes = createAction<SearchState['modeWork']>('search/setModes');
export const setTimes = createAction<SearchState['weekdayTimes']>('search/setWeekdayTimes');

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setAge: (state, action: PayloadAction<string>) => {
      state.age = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setMode: (state, action: PayloadAction<SearchState['modeWork']>) => {
      state.modeWork = action.payload;
    },
    setWeekdayTimes: (state, action: PayloadAction<SearchState['weekdayTimes']>) => {
      state.weekdayTimes = action.payload;
    },
    // Добавим редьюсер для обновления спорта
    updateSport: (state, action: PayloadAction<string[]>) => {
      state.sport = action.payload;
      console.log(JSON.stringify(state.sport))
    },
    resetSearch: (state) => {
      return initialState;
    },

    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        // state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        // state.loading = false;
        state.status = 'succeeded';
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        // state.loading = false;
        state.status = 'failed';
        state.error = action.error.message || 'Произошла ошибка при получении данных о клубах';
      });
  },
});

export const { setAge, setAddress, setMode, updateSport,setWeekdayTimes, resetSearch } = searchSlice.actions;
export const selectSportsFromSearch = (state: RootState) => state.sports.selectedSports;
export const clubs = (state: RootState) => state.search.clubs;

// console.log(selectSportsFromSearch)
export default searchSlice.reducer;

