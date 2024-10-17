import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubjectDetail } from "../../services/verticalService";

// Thunk to fetch department details
export const getSubject = createAsyncThunk(
  "get/editSubject",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await getSubjectDetail(token, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || `Failed to get subject data`
      );
    }
  }
);

const getSubjectSlice = createSlice({
  name: "getSubject",
  initialState: {
    loading: false,
    error: null,
    success: false,
    subjectData: {},
  },
  reducers: {
    resetgetSubjectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.subjectData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Department Actions
      .addCase(getSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subjectData = action.payload;
      })
      .addCase(getSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetgetSubjectState } = getSubjectSlice.actions;
export default getSubjectSlice.reducer;
