import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { geteditUserById } from "../../services/userService";

export const getUser = createAsyncThunk(
  "get/editUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await geteditUserById(token, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update user"
      );
    }
  }
);

const getUserSlice = createSlice({
  name: "getUser",
  initialState: {
    loading: false,
    error: null,
    success: false,
    userData: {},
  },
  reducers: {
    resetgetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User Actions
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetgetUserState } = getUserSlice.actions;
export default getUserSlice.reducer;
