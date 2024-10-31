// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export const initialState: = {
//   selectedSports: [],
//   allSportsSelected: false,
//   hoveredSport: null,
//   suggestions: [],
//   // selectAllSports:{}
//   isAllParentSportsSelected:false,
//   // loading: false,
// };

// const sportSlice = createSlice({
//   name: 'sports',
//   initialState,
//   reducers: {
//     selectSport: (state, action: PayloadAction<string>) => {
//       const sport = action.payload;
//       const index = state.selectedSports.indexOf(sport);
//       if (index > -1) {
//         state.selectedSports.splice(index, 1);
//       } else {
//         state.selectedSports.push(sport);
//       }
//       state.allSportsSelected = false;
//       console.log(JSON.stringify(state.selectedSports));
//     },
//     toggleAllSports: (state) => {
//       state.allSportsSelected = !state.allSportsSelected;
//       state.selectedSports = state.allSportsSelected ? ['Все виды спорта'] : [];
//     },
//     setHoveredSport: (state, action: PayloadAction<string | null>) => {
//       state.hoveredSport = action.payload;
//     },
//     setSuggestions: (state, action: PayloadAction<string[]>) => {
//       state.suggestions = action.payload;
//     },
//     removeSport: (state, action: PayloadAction<string>) => {
//       const index = state.selectedSports.indexOf(action.payload);
//       if (index > -1) {
//         state.selectedSports.splice(index, 1);
//       }
//       if (action.payload === 'Все виды спорта') {
//         state.allSportsSelected = false;
//       }
//     },
//     // selectSubSport: (state, action) => {
//     //   state.selectedSubSport = action.payload;
//     // },
//     selectAllSports: (state, action: PayloadAction<{ parentSport: string, sports: string[] }>) => {
//       const { 
//         // parentSport,
//          sports } = action.payload;

//       sports.forEach(sport => {
//         if (!state.selectedSports.includes(sport)) {
//           state.selectedSports.push(sport);
//         }
        
//       });
//       // state.isAllParentSportsSelected = !state.isAllParentSportsSelected
//       //     console.log(state.isAllParentSportsSelected)
//     },
//     selectAllParentSports: (state) => {
//       state.isAllParentSportsSelected = !state.isAllParentSportsSelected
//       console.log(state.isAllParentSportsSelected)
//     }
//   },
// });

// export const { selectSport, toggleAllSports, setHoveredSport, setSuggestions, removeSport, selectAllSports, selectAllParentSports } = sportSlice.actions;

// export default sportSlice.reducer;