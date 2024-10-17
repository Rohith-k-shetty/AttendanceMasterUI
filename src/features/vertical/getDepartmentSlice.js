import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDepartmentDetail } from "../../services/verticalService";

// Thunk to fetch department details
export const getDepartment = createAsyncThunk(
  "get/editDepartment",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await getDepartmentDetail(token, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || `Failed to get Department data`
      );
    }
  }
);

const getDepartmentSlice = createSlice({
  name: "getDepartment",
  initialState: {
    loading: false,
    error: null,
    success: false,
    departmentData: {},
  },
  reducers: {
    resetgetDepartmentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.departmentData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Department Actions
      .addCase(getDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.departmentData = action.payload;
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetgetDepartmentState } = getDepartmentSlice.actions;
export default getDepartmentSlice.reducer;
