import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveUserDeatils, updateUserDeatil } from "../../services/userService";

export const saveUser = createAsyncThunk(
  "post/saveUser",
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

export const editUser = createAsyncThunk(
  "post/editUser",
  async ({ token, body }, thunkAPI) => {
    try {
      const response = await updateUserDeatil(token, body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update user"
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
      // Save User Actions
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
      })

      // Edit User Actions
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
