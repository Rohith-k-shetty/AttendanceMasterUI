import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchCourses,
  searchDepartments,
  searchSubjects,
} from "../../services/searchService";

// Async thunk for fetching users based on search query
export const searchVerticals = createAsyncThunk(
  "search/searchUsers",
  async ({ token, query, type }, thunkAPI) => {
    try {
      let response;
      switch (type) {
        case "Department":
          response = await searchDepartments(token, query);
          return response.data;
        case "Course":
          response = await searchCourses(token, query);
          return response.data;
        case "Subject":
          response = await searchSubjects(token, query);
          return response.data;
        default:
          break;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch verticals"
      );
    }
  }
);

// Search slice
const verticalSearchSlice = createSlice({
  name: "VerticalSearch",
  initialState: {
    verticals: [],
    loading: false,
    error: null,
    query: "", // Track search query in state
  },
  reducers: {
    clearVerticalSearch: (state) => {
      state.verticals = [];
      state.query = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVerticals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVerticals.fulfilled, (state, action) => {
        state.loading = false;
        state.verticals = action.payload;
      })
      .addCase(searchVerticals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions and reducer
export const { clearVerticalSearch } = verticalSearchSlice.actions;
export default verticalSearchSlice.reducer;
