/* eslint-disable react/prop-types */
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

const ThemeModeToggle = ({ mobile = false }) => {
  const { mode, systemMode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeMode =
    mode === "system" ? (systemMode ?? "light") : (mode ?? "light");
  const nextMode = activeMode === "dark" ? "light" : "dark";
  const label =
    activeMode === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const icon =
    activeMode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />;

  if (!mounted) {
    if (mobile) {
      return (
        <Button
          fullWidth
          disabled
          variant="outlined"
          sx={{ mt: 2, justifyContent: "center" }}
        >
          Loading theme
        </Button>
      );
    }

    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          display: "grid",
          placeItems: "center",
        }}
      >
        <CircularProgress size={18} />
      </Box>
    );
  }

  if (mobile) {
    return (
      <Button
        fullWidth
        variant="outlined"
        color="inherit"
        onClick={() => setMode(nextMode)}
        startIcon={icon}
        sx={{
          mt: 2,
          justifyContent: "center",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        {activeMode === "dark" ? "Light mode" : "Dark mode"}
      </Button>
    );
  }

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={() => setMode(nextMode)}
        color="inherit"
        aria-label={label}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          bgcolor: "background.paper",
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeModeToggle;
