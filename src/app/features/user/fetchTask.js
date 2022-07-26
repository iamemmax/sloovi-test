import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetTask, GetSingleTask } from "./userService";

export const FetchTask = createAsyncThunk(
  "auth/fetch all tasks",
  async (_, thunkAPI) => {
    try {
      let company_Id = thunkAPI.getState().auth.user.company_id;
      let Token = thunkAPI.getState().auth.user.token;

      return await GetTask(company_Id, Token);
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
export const FetchSingleTask = createAsyncThunk(
  "auth/fetch single task",
  async (id, thunkAPI) => {
    try {
      let company_Id = thunkAPI.getState().auth.user.company_id;
      let Token = thunkAPI.getState().auth.user.token;

      return await GetSingleTask(id, company_Id, Token);
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
  tasks: [],
  singleTask: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const fetchTaskSlice = createSlice({
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

      // fetch all tasks
      .addCase(FetchTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload.results;
      })
      .addCase(FetchTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // fetch single tasks
      .addCase(FetchSingleTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchSingleTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleTask = action.payload.results;
      })
      .addCase(FetchSingleTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// login user

export const { reset } = fetchTaskSlice.actions;
export default fetchTaskSlice.reducer;
