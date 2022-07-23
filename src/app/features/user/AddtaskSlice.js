import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { AddTask, DeleteTask } from "./userService"
import axios from "axios";
const API_URL = "https://stage.api.sloovi.com"



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
export const UpdateUserTask = createAsyncThunk(
  "auth/update task",
  async (userData, thunkAPI) => {
    try {
      let company_Id = thunkAPI.getState().auth.user.company_id
      let Token = thunkAPI.getState().auth.user.token

      let { id, input } = userData

      var hms = input?.task_time;  // time input string
      var a = hms.split(':'); // split it at the colons
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var taskTimeSeconds = (+a[0]) * 60 * 60 + (+a[1]);

      const response = await axios.put(`${API_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_Id}`,
        { ...input, task_time: taskTimeSeconds }, {
        headers: {

          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Token,

        }
      }
      );
      return response.data;
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
  updatedTask: [],
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

      // add user task
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

      // update user task
      .addCase(UpdateUserTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateUserTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedTask = action.payload;

      })
      .addCase(UpdateUserTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.updatedTask = null;
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
