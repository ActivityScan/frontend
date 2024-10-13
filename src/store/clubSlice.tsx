import {  ClubInitialState } from '@/Types/types';
import { fetchClubInfoById } from '@/utils/api';
import { createSlice } from '@reduxjs/toolkit';

export // Initial state for the specific club data slice

// const initialState: Club={
//     clubInfo: {},
// }
const initialState: ClubInitialState = {
//   id: 0,
//   name: '',
//   franchise: {
//     id: 0,
//     name: '',
//   },
//   company: {
//     id: 0,
//     inn: 0,
//     ogrn: '',
//     name: '',
//     companyType: '',
//     city: {
//       id: 0,
//       name: '',
//       country: {
//         id: 0,
//         name: '',
//       },
//     },
//   },
//   city: {
//     id: 0,
//     name: '',
//     country: {
//       id: 0,
//       name: '',
//     },
//   },
//   sport: {
//     id: 0,
//     name: '',
//   },
//   customInfo: {
//     sport: '',
//     trackLength: 0,
//   },
//   address: '',
//   longitude: 0,
//   latitude: 0,
//   sportFederation: {
//     id: 0,
//     name: '',
//     sportFederationType: 'FEDERAL', // This is a placeholder value
//   },
//   basicInfo: '',
//   ageMin: 0,
//   ageMax: 0,
//   adultGroups: false,
//   parentParticipation: false,
//   differentLevels: false,
//   phoneNumbers: [
//     {
//       id: 0,
//       phoneNumber: '',
//       description: '',
//       priority: 0,
//     },
//   ],
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
  loading: false,
  data: null,
};


const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    // setClub: (state, action: PayloadAction<ClubInitialState>) => {
    //     return { ...state, ...action.payload }; // Обновляем состояние клуба
    //   },
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

// export const { setClub } = clubSlice.actions;

export default clubSlice.reducer;