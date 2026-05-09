"use client";

import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  Box,
} from "@mui/material";

const countryCodes = [
  { code: "+880", label: "BD", flag: "🇧🇩" },
  { code: "+1", label: "US", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+966", label: "KSA", flag: "🇸🇦" },
];

const PhoneInputField = ({ 
  value, 
  onChange, 
  countryCode, 
  onCountryCodeChange, 
  error, 
  helperText,
  label = "Phone Number",
  ...props 
}) => {
  return (
    <TextField
      {...props}
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Select
              value={countryCode}
              onChange={(e) => onCountryCodeChange(e.target.value)}
              variant="standard"
              disableUnderline
              sx={{
                mr: 1,
                fontSize: "0.9rem",
                "& .MuiSelect-select": {
                  py: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                },
              }}
            >
              {countryCodes.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  <Box component="span" sx={{ mr: 0.5 }}>{c.flag}</Box>
                  {c.code}
                </MenuItem>
              ))}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PhoneInputField;
