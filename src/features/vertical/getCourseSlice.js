import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourseDetail } from "../../services/verticalService";

// Thunk to fetch department details
export const getCourse = createAsyncThunk(
  "get/editCourse",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await getCourseDetail(token, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || `Failed to get Course data`
      );
    }
  }
);

const getCourseSlice = createSlice({
  name: "getCourse",
  initialState: {
    loading: false,
    error: null,
    success: false,
    courseData: {},
  },
  reducers: {
    resetgetCourseState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.courseData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Department Actions
      .addCase(getCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.courseData = action.payload;
      })
      .addCase(getCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetgetCourseState } = getCourseSlice.actions;
export default getCourseSlice.reducer;
