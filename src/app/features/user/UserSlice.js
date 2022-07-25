import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Login } from "./userService"



export const LoginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await Login(user);
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
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const authSlice = createSlice({
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
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.results;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })


  },
});


// login user

export const { reset } = authSlice.actions;
export default authSlice.reducer;
