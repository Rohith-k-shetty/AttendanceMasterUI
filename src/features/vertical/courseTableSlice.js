import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCourseData } from "../../services/verticalTableService";

export const fetchCourseList = createAsyncThunk(
  "course/fetchCourseList",
  async ({ token, query }, thunkAPI) => {
    try {
      const response = await fetchCourseData(token, query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch course list"
      );
    }
  }
);

const courseTableSlice = createSlice({
  name: "courseTable",
  initialState: {
    courseTableData: [],
    loading: false,
    error: null,
    success: false,
    totalCount: 0,
  },
  reducers: {
    resetCourseTableState: (state) => {
      return {
        courseTableData: [],
        loading: false,
        error: null,
        success: false,
        totalCount: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchCourseList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.courseTableData = action.payload.courses;
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchCourseList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch course data";
      });
  },
});

export const { resetCourseTableState } = courseTableSlice.actions;
export default courseTableSlice.reducer;
