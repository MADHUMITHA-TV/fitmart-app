import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";

import App from "./App";
import theme from "./theme/theme";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import "@fontsource/poppins";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
          <Toaster
      position="top-right"
      reverseOrder={false}
    />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);