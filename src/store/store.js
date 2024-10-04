import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import verticalReducer from "../features/vertical/verticalSlice";
import searchReducer from "../features/search/searchSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    vertical: verticalReducer,
    search: searchReducer,
  },
});

export default store;
