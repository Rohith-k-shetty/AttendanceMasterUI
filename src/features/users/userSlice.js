import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveUserDeatils } from "../../services/userService";

export const saveUser = createAsyncThunk(
  "search/fetchUsers",
  async ({ token, body }, thunkAPI) => {
    try {
      const response = await saveUserDeatils(token, body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to create user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
