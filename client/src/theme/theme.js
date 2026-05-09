"use client";

import { alpha, extendTheme } from "@mui/material/styles";

const primaryLight = "#6366f1";
const primaryDark = "#818cf8";
const secondaryLight = "#06b6d4";
const secondaryDark = "#22d3ee";
const errorLight = "#f43f5e";
const errorDark = "#fb7185";
const successLight = "#22c55e";
const successDark = "#4ade80";

const theme = extendTheme({
  cssVarPrefix: "wisdora",
  colorSchemeSelector: '[data-mui-color-scheme="%s"]',
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: primaryLight,
          contrastText: "#ffffff",
        },
        secondary: {
          main: secondaryLight,
          contrastText: "#ffffff",
        },
        error: {
          main: errorLight,
        },
        success: {
          main: successLight,
        },
        background: {
          default: "#f8fafc",
          paper: "#ffffff",
        },
        text: {
          primary: "#0f172a",
          secondary: "#64748b",
        },
        divider: alpha("#94a3b8", 0.28),
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: primaryDark,
          contrastText: "#0f172a",
        },
        secondary: {
          main: secondaryDark,
          contrastText: "#082f49",
        },
        error: {
          main: errorDark,
        },
        success: {
          main: successDark,
        },
        background: {
          default: "#020617",
          paper: "#0f172a",
        },
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
        },
        divider: alpha("#94a3b8", 0.18),
      },
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          colorScheme: "light dark",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme: appTheme }) => ({
          padding: "8px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow:
              appTheme.palette.mode === "dark"
                ? "0 10px 24px rgba(15, 23, 42, 0.38)"
                : "0 10px 24px rgba(15, 23, 42, 0.12)",
          },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme: appTheme }) => ({
          backgroundColor:
            appTheme.palette.mode === "dark"
              ? alpha("#0f172a", 0.72)
              : appTheme.palette.common.white,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme: appTheme }) => ({
          backgroundImage: "none",
          border: `1px solid ${appTheme.palette.divider}`,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme: appTheme }) => ({
          boxShadow:
            appTheme.palette.mode === "dark"
              ? "0 18px 45px rgba(2, 6, 23, 0.42)"
              : "0 8px 28px rgba(15, 23, 42, 0.08)",
          border: `1px solid ${appTheme.palette.divider}`,
          backgroundImage: "none",
          "&:hover": {
            boxShadow:
              appTheme.palette.mode === "dark"
                ? "0 22px 50px rgba(2, 6, 23, 0.5)"
                : "0 16px 32px rgba(15, 23, 42, 0.12)",
          },
        }),
      },
    },
  },
});

export default theme;
