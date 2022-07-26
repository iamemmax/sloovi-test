import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/user/UserSlice";
import taskReducer from "./features/user/AddtaskSlice";
import UsertaskReducer from "./features/user/fetchTask";
import AssignUser from "./features/user/AssignUserSlice";
// import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";
import {
  // persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const allReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  AllTask: UsertaskReducer,
  users: AssignUser,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, allReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
