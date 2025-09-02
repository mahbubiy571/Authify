import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
