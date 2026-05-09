"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Stack,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import imageCompression from "browser-image-compression";
import axiosInstance from "@/lib/axios/axiosInstance";

const ImageUploadInput = ({ label, value, onChange, error, helperText }) => {
  const [mode, setMode] = useState("file"); // 'file' or 'url'
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();
      formData.append("file", compressedFile);

      const response = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        onChange(response.data.body.url);
      }
    } catch (err) {
      setUploadError("Upload failed. Try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setUploadError("");
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
        {label}
      </Typography>

      <Stack spacing={2}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          size="small"
          aria-label="upload mode"
          sx={{ alignSelf: "flex-start" }}
        >
          <ToggleButton value="file" aria-label="file upload">
            <CloudUploadIcon sx={{ mr: 1, fontSize: 18 }} />
            File
          </ToggleButton>
          <ToggleButton value="url" aria-label="direct url">
            <LinkIcon sx={{ mr: 1, fontSize: 18 }} />
            URL
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ 
          p: 2, 
          border: '2px dashed', 
          borderColor: error || uploadError ? 'error.main' : 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': { borderColor: 'primary.main' }
        }}>
          {mode === "file" ? (
            <Stack alignItems="center" spacing={1}>
              {value ? (
                <Box sx={{ position: 'relative', width: '100%', maxWidth: 200 }}>
                  <Box 
                    component="img" 
                    src={value} 
                    sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 1 }} 
                  />
                  <IconButton 
                    size="small" 
                    onClick={handleClear}
                    sx={{ 
                      position: 'absolute', 
                      top: -10, 
                      right: -10, 
                      bgcolor: 'error.main', 
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="text"
                  component="label"
                  disabled={uploading}
                  sx={{ 
                    width: '100%', 
                    py: 3, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1,
                    textTransform: 'none',
                    color: 'text.secondary'
                  }}
                >
                  {uploading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <>
                      <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.7 }} />
                      <Typography variant="body2">Click to upload or drag and drop</Typography>
                      <Typography variant="caption" color="text.disabled">PNG, JPG up to 10MB</Typography>
                    </>
                  )}
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
              )}
            </Stack>
          ) : (
            <Stack spacing={2}>
              <TextField
                size="small"
                fullWidth
                label="Image URL"
                placeholder="https://example.com/image.jpg"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={!!error || !!uploadError}
              />
              {value && (
                <Box sx={{ position: 'relative', width: '100%', maxWidth: 200, alignSelf: 'center' }}>
                  <Box 
                    component="img" 
                    src={value} 
                    sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 1 }} 
                    onError={() => setUploadError("Invalid image URL")}
                  />
                  <IconButton 
                    size="small" 
                    onClick={handleClear}
                    sx={{ 
                      position: 'absolute', 
                      top: -10, 
                      right: -10, 
                      bgcolor: 'error.main', 
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Stack>
          )}
        </Box>
        {(error || uploadError || helperText) && (
          <Typography variant="caption" color={error || uploadError ? "error" : "text.secondary"}>
            {error?.message || uploadError || helperText}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ImageUploadInput;
