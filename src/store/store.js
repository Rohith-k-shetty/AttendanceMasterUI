import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import verticalReducer from "../features/vertical/verticalSlice";
import searchReducer from "../features/search/searchSlice";
import userReducer from "../features/users/userSlice";
import userTableReducer from "../features/users/userTableSlice";
import getUserReducer from "../features/users/getUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vertical: verticalReducer,
    search: searchReducer,
    users: userReducer,
    userTable: userTableReducer,
    getUser: getUserReducer,
  },
});

export default store;
