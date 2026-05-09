"use client";

import React from 'react';
import { Card, CardContent, Skeleton, Box, Stack } from '@mui/material';

const CourseSkeleton = () => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
      }}
      elevation={0}
    >
      <Skeleton variant="rectangular" height={200} />
      <CardContent sx={{ p: 3 }}>
        <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />
        
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="80%" sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={100} />
          </Box>
          <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 2 }} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseSkeleton;
