import { configureStore, Store } from "@reduxjs/toolkit";

// import searchReducer from "./searchSlice";
import sportReducer from './sportSlice';
import searchReducer from './searchSlice';
import clubReducer from './clubSlice';
// import { sportMiddleware } from "./middlewares/sportMiddleware";

export const store: Store = configureStore({
  reducer: {
    search: searchReducer,
    sports: sportReducer, 
    club: clubReducer,
  },
  //middleware: (getDefaultMiddleware) =>
   // getDefaultMiddleware().concat(sportMiddleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
