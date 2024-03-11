import { configureStore } from "@reduxjs/toolkit";
import coffeeReducer from "./coffeeSlice";

export const store = configureStore({
  reducer: {
    coffee: coffeeReducer,
    // tea: teaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
