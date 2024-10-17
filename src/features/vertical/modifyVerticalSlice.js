import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  activateVerticalDeatil,
  deleteVerticalDeatil,
  saveVerticalDetail,
  updateVerticalDeatil,
} from "../../services/verticalService";

export const saveVertical = createAsyncThunk(
  "post/saveVertical",
  async ({ token, body, type }, thunkAPI) => {
    try {
      const response = await saveVerticalDetail(token, body, type);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || `Failed to create ${type}`
      );
    }
  }
);

export const updateVertical = createAsyncThunk(
  "put/updateVertical",
  async ({ token, id, body, type }, thunkAPI) => {
    try {
      const response = await updateVerticalDeatil(token, id, body, type);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || `Failed to update ${type}`
      );
    }
  }
);

export const deleteVertical = createAsyncThunk(
  "delete/deleteVertical",
  async ({ token, id, type }, thunkAPI) => {
    try {
      const response = await deleteVerticalDeatil(token, id, type);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || `Failed to delete ${type}`
      );
    }
  }
);

export const activateVertical = createAsyncThunk(
  "update/activateVertical",
  async ({ token, id, type }, thunkAPI) => {
    try {
      const response = await activateVerticalDeatil(token, id, type);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || `Failed to activate ${type}`
      );
    }
  }
);

const modifyVerticalSlice = createSlice({
  name: "modifyVertical",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetModifyVerticalState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save User Actions
      .addCase(saveVertical.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveVertical.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveVertical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit User Actions
      .addCase(updateVertical.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateVertical.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateVertical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save User Actions
      .addCase(deleteVertical.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteVertical.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteVertical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //activate user
      .addCase(activateVertical.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(activateVertical.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(activateVertical.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetModifyVerticalState } = modifyVerticalSlice.actions;
export default modifyVerticalSlice.reducer;
