import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveUserDeatils,
  updateUserDeatil,
  deleteUserDeatil,
  resetUserPassword,
  activateUserDetail,
} from "../../services/userService";

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
  "put/editUser",
  async ({ token, id, body }, thunkAPI) => {
    try {
      const response = await updateUserDeatil(token, id, body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete/deleteUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await deleteUserDeatil(token, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete user"
      );
    }
  }
);

export const resetUser = createAsyncThunk(
  "update/resetUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await resetUserPassword(token, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete user"
      );
    }
  }
);

export const activateUser = createAsyncThunk(
  "update/activateUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await activateUserDetail(token, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to activate user"
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
      })

      // Save User Actions
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //reset user Addcase
      .addCase(resetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //activate user
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
