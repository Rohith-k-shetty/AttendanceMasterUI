import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubjectData } from "../../services/verticalTableService";

export const fetchSubjectList = createAsyncThunk(
  "subject/fetchSubjectList",
  async ({ token, query }, thunkAPI) => {
    try {
      const response = await fetchSubjectData(token, query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch subject list"
      );
    }
  }
);

const subjectTableSlice = createSlice({
  name: "subjectTable",
  initialState: {
    subjectTableData: [],
    loading: false,
    error: null,
    success: false,
    totalCount: 0,
  },
  reducers: {
    resetSubjectTableState: (state) => {
      return {
        subjectTableData: [],
        loading: false,
        error: null,
        success: false,
        totalCount: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchSubjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subjectTableData = action.payload.subjects;
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchSubjectList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subject data";
      });
  },
});

export const { resetSubjectTableState } = subjectTableSlice.actions;
export default subjectTableSlice.reducer;
