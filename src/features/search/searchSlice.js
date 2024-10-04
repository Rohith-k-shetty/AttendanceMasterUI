import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/searchService";

// Async thunk for fetching users based on search query
export const searchUsers = createAsyncThunk(
  "search/fetchUsers",
  async ({ token, query }, thunkAPI) => {
    try {
      const response = await fetchUsers(token, query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch users"
      );
    }
  }
);

// Search slice
const searchSlice = createSlice({
  name: "search",
  initialState: {
    users: [],
    loading: false,
    error: null,
    query: "", // Track search query in state
  },
  reducers: {
    clearSearch: (state) => {
      state.users = [];
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Store fetched users
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions and reducer
export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
