"use client";

import React from 'react';
import { Box, Container, Paper, Typography, Tab, Tabs, Divider } from '@mui/material';
import ProfileUpdateForm from '@/components/forms/ProfileUpdateForm';
import PasswordUpdateForm from '@/components/forms/PasswordUpdateForm';

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: "2rem", md: "3rem" } }}>Account Settings</Typography>
        
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, overflow: 'hidden' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ px: 2, pt: 1, bgcolor: 'background.paper' }}
          >
            <Tab label="Edit Profile" sx={{ fontWeight: 600 }} />
            <Tab label="Security" sx={{ fontWeight: 600 }} />
            <Tab label="Notifications" sx={{ fontWeight: 600 }} />
          </Tabs>
          <Divider />
          
          <Box sx={{ p: { xs: 2.5, sm: 3, md: 6 }, bgcolor: 'background.paper' }}>
            {value === 0 && <ProfileUpdateForm />}
            {value === 1 && <PasswordUpdateForm />}
            {value === 2 && <Typography>Notification preferences coming soon...</Typography>}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
