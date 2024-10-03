import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authService";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await loginUser(credentials); // Calls the loginUser function in the service
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Login failed"
      ); // Handles error in case the API call fails
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Holds the logged-in user's data
    loading: false, // Tracks whether the login process is ongoing
    error: null, // Holds error messages, if any
    isAuthenticated: false, // Tracks if the user is logged in
  },
  reducers: {
    logout(state) {
      state.user = null; // Clear user data
      state.isAuthenticated = false; // Set authenticated to false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Set loading to true when the login request starts
        state.error = null; // Clear any existing errors
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false; // Stop loading when the login request is complete
        state.user = action.payload; // Set the user data in state
        state.isAuthenticated = true; // Mark the user as authenticated
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false; // Stop loading if the login request fails
        state.error = action.payload || "Something went wrong"; // Set the error message
      });
  },
});

export const { logout } = authSlice.actions; // Exporting logout action for use in other parts of the app

export default authSlice.reducer;
