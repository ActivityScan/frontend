import { SportsState } from "@/Types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetFilters } from "./searchSlice";

export const initialState: SportsState = {
  selectedSports: [],
  allSportsSelected: false,
  hoveredSport: null,
  suggestions: [],
  // selectAllSports:{}
  isAllParentSportsSelected: false,
  // loading: false,
  isOpen: false,
};

const sportSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {
    toggleSetSportSelector(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.isOpen = action.payload.isOpen;
    },
    // selectSport: (state, action: PayloadAction<string>) => {
    //   const sport = action.payload;
    //   const index = state.selectedSports.indexOf(sport);
    //   if (index > -1) {
    //     state.selectedSports.splice(index, 1);
    //   } else {
    //     state.selectedSports.push(sport);
    //   }
    //   state.allSportsSelected = false;
    //   console.log(JSON.stringify(state.selectedSports));
    // },
    selectSport: (state, action: PayloadAction<{ name: string } | string>) => {
      const sport =
        typeof action.payload === "string"
          ? action.payload
          : action.payload.name;
      const index = state.selectedSports.indexOf(sport);
      if (index > -1) {
        state.selectedSports.splice(index, 1);
      } else {
        state.selectedSports.push(sport);
      }
      state.allSportsSelected = false;
      console.log(JSON.stringify(state.selectedSports));
    },
    toggleAllSports: (state) => {
      state.allSportsSelected = !state.allSportsSelected;
      state.selectedSports = state.allSportsSelected ? ["Все виды спорта"] : [];
    },
    setHoveredSport: (state, action: PayloadAction<string | null>) => {
      state.hoveredSport = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    removeSports: (state, action: PayloadAction<string[]>) => {
      const sportNamesToRemove = action.payload;
      // Фильтруем selectedSports, удаляя из него все виды спорта, которые есть в sportNamesToRemove
      state.selectedSports = state.selectedSports.filter(
        (sport) => !sportNamesToRemove.includes(sport)
      );

      // Если были удалены все виды спорта, сбрасываем флаг allSportsSelected
      if (sportNamesToRemove.includes("Все виды спорта")) {
        state.allSportsSelected = false;
      }
    },
    // removeSport: (state, action: PayloadAction<string>) => {
    //   const index = state.selectedSports.indexOf(action.payload);
    //   if (index > -1) {
    //     state.selectedSports.splice(index, 1);
    //   }
    //   if (action.payload === 'Все виды спорта') {
    //     state.allSportsSelected = false;
    //   }
    // },
    // selectSubSport: (state, action) => {
    //   state.selectedSubSport = action.payload;
    // },
    selectAllSports: (
      state,
      action: PayloadAction<{ parentSport: string; sports: string[] }>
    ) => {
      const {
        // parentSport,
        sports,
      } = action.payload;

      sports.forEach((sport) => {
        if (!state.selectedSports.includes(sport)) {
          state.selectedSports.push(sport);
        }
      });
      // state.isAllParentSportsSelected = !state.isAllParentSportsSelected
      //     console.log(state.isAllParentSportsSelected)
    },
    selectAllParentSports: (state) => {
      state.isAllParentSportsSelected = !state.isAllParentSportsSelected;
      console.log(state.isAllParentSportsSelected);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetFilters, (state) => {
      state.selectedSports = []; // Сброс конкретного поля в этом слайсе
    });
  }
});

export const {
  selectSport,
  toggleAllSports,
  setHoveredSport,
  setSuggestions,
  removeSports,
  selectAllSports,
  selectAllParentSports,
  toggleSetSportSelector,
} = sportSlice.actions;

export default sportSlice.reducer;
