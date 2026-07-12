import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: colors.primary,

    secondary: colors.secondary,

    background: colors.background,

    text: colors.text,

    error: colors.error,

    warning: colors.warning,

    success: colors.success,
  },

  typography: {
    fontFamily: "Poppins, Roboto, sans-serif",

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});

export default theme;