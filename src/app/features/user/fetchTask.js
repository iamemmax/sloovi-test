import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {GetTask} from "./userService"



export const FetchTask = createAsyncThunk(
  "auth/fetch task",
  async (_, thunkAPI) => {
          try {
         let company_Id =thunkAPI.getState().auth.user.company_id
       let Token = thunkAPI.getState().auth.user.token
        

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


  const initialState = {
    task: [],
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
        
        // login user
        .addCase(FetchTask.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(FetchTask.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.task = action.payload.results;
        })
        .addCase(FetchTask.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.task = [];
          state.message = action.payload;
        })

  
    },
});
      
       
  // login user
  
  export const { reset } = fetchTaskSlice.actions;
  export default fetchTaskSlice.reducer;
  