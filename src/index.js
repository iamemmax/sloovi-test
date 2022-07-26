import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import { Toaster } from "react-hot-toast";

let persistor = persistStore(store);
ReactDOM.render(
  <React.StrictMode>
    {/* <Toaster position="top-center" reverseOrder={false} /> */}
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
