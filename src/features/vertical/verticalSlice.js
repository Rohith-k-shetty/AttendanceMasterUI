import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCourses,
  fetchDepartments,
  fetchYears,
} from "../../services/verticalService";
// Import your API service functions

// Async thunks for fetching data
export const getDepartments = createAsyncThunk(
  "vertical/getDepartments",
  async (token, thunkAPI) => {
    try {
      const response = await fetchDepartments(token);
      // Call your API function
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Department fetch failed"
      );
    }
  }
);

export const getYears = createAsyncThunk(
  "vertical/getYears",
  async (token, thunkAPI) => {
    try {
      const response = await fetchYears(token); // Call your API function
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Year fetch failed"
      );
    }
  }
);

export const getCourses = createAsyncThunk(
  "vertical/getCourses",
  async (token, thunkAPI) => {
    try {
      const response = await fetchCourses(token); // Call your API function
      return response.data; // Assuming the API returns data in this structure
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Courses fetch failed"
      );
    }
  }
);

// Create the data slice
const verticalSlice = createSlice({
  name: "vertical",
  initialState: {
    departments: [],
    courses: [],
    years: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle departments
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch departments";
      })
      // Handle courses
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload; // Store fetched courses
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch courses";
      })
      // Handle years
      .addCase(getYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getYears.fulfilled, (state, action) => {
        state.loading = false;
        state.years = action.payload; // Store fetched years
      })
      .addCase(getYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch years";
      });
  },
});

// Export the async actions for use in your components
export const {} = verticalSlice.actions; // You can add reducers here if necessary

export default verticalSlice.reducer;
