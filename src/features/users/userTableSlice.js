import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "../../services/userTableService";

export const fetchUserList = createAsyncThunk(
  "search/fetchUserList",
  async ({ token, query }, thunkAPI) => {
    try {
      const response = await fetchUserData(token, query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch userList"
      );
    }
  }
);

const userTableSlice = createSlice({
  name: "userTable",
  initialState: {
    userTableData: [],
    loading: false,
    error: null,
    success: false,
    totalCount: 0,
  },
  reducers: {
    resetUserTableState: (state) => {
      (state.userTableData = []), (state.loading = false);
      state.error = null;
      state.success = false;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userTableData = action.payload.users;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserTableState } = userTableSlice.actions;
export default userTableSlice.reducer;
