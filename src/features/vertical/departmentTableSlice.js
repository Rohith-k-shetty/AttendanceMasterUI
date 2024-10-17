import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchdepartmentData } from "../../services/verticalTableService";

export const fetchDepartmentList = createAsyncThunk(
  "search/fetchDepartmentList",
  async ({ token, query }, thunkAPI) => {
    try {
      const response = await fetchdepartmentData(token, query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch departments"
      );
    }
  }
);

const departmentTableSlice = createSlice({
  name: "departmentTable",
  initialState: {
    departmentTableData: [],
    loading: false,
    error: null,
    success: false,
    totalCount: 0,
  },
  reducers: {
    resetDepartmentTableState: (state) => {
      // Reset all state properties to their initial values
      return {
        departmentTableData: [],
        loading: false,
        error: null,
        success: false,
        totalCount: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchDepartmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.departmentTableData = action.payload.departments;
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchDepartmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch department data";
      });
  },
});

export const { resetDepartmentTableState } = departmentTableSlice.actions;
export default departmentTableSlice.reducer;
