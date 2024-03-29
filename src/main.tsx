import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeValueProvider } from "mui-layout-component";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";

import "./index.css";
import Style from "./style";
import "virtual:svg-icons-register";
import "./lang";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeValueProvider>
      <CssBaseline />
      <Style />
      <SnackbarProvider />
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </ThemeValueProvider>
  </React.StrictMode>
);
// "@mui/icons-material": "^5.4.2",
