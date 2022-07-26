import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThemeProvider } from "@mui/material";

import { theme } from "./component/config/theme";

import LoginPage from "./pages/LoginPage";
import { Homepages } from "./pages/Homepages";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <main>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/task" element={<Homepages />} />
              </Routes>
            </main>
          </div>
          <ToastContainer closeOnClick autoClose={3000} />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
