import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { AddTask, DeleteTask } from "./userService"



export const AddUserTask = createAsyncThunk(
  "auth/add task",
  async (userData, thunkAPI) => {
    try {
      let company_Id = thunkAPI.getState().auth.user.company_id
      let Token = thunkAPI.getState().auth.user.token


      return await AddTask(userData, company_Id, Token);
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

export const DeleteUserTask = createAsyncThunk(
  "auth/delete task",
  async (userData, thunkAPI) => {
    try {
      let company_Id = thunkAPI.getState().auth.user.company_id
      let Token = thunkAPI.getState().auth.user.token


      return await DeleteTask(userData, company_Id, Token);
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
  task: [],
  deletedTask: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const taskSlice = createSlice({
  name: "auth",
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

      // login user
      .addCase(AddUserTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddUserTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task.push(action.payload);

      })
      .addCase(AddUserTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.task = null;
        state.message = action.payload;
      })

      // delete task
      .addCase(DeleteUserTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteUserTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedTask = action.payload;

      })
      .addCase(DeleteUserTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.deletedTask = null;
        state.message = action.payload;
      })

  },
});


// login user

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
