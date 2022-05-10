import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./reducers/formReducer";

const store = configureStore({
  reducer: {
    FormReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
