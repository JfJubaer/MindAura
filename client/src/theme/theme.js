"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", // Indigo
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#06b6d4", // Cyan
      contrastText: "#ffffff",
    },
    error: {
      main: "#f43f5e", // Rose
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12, // Rounded-xl
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          border: '1px solid #e2e8f0',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
  },
});

export default theme;
