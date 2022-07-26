import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AssignUser } from "./userService";

export const FetchAssignUser = createAsyncThunk(
  "auth/assign user",
  async (_, thunkAPI) => {
    try {
      let company_Id = thunkAPI.getState().auth.user.company_id;
      let Token = thunkAPI.getState().auth.user.token;

      return await AssignUser(company_Id, Token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const fetchAssignUserSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(FetchAssignUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchAssignUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.results.data;
      })
      .addCase(FetchAssignUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.users = [];
        state.message = action.payload;
      });
  },
});

export const { reset } = fetchAssignUserSlice.actions;
export default fetchAssignUserSlice.reducer;
