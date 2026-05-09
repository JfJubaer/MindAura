"use client";

import React from 'react';
import { Box, Container, Grid2 as Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import CertificateIcon from '@mui/icons-material/CardMembership';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Features = () => {
  const features = [
    {
      title: 'Expert-Led Courses',
      description: 'Learn from experienced engineers, product leaders, and industry practitioners who teach what they use every day.',
      icon: <MenuBookIcon fontSize="large" />,
      color: '#6366f1'
    },
    {
      title: 'Global Community',
      description: 'Join a growing community of learners building projects, sharing ideas, and helping each other level up.',
      icon: <PeopleIcon fontSize="large" />,
      color: '#06b6d4'
    },
    {
      title: 'Certified Learning',
      description: 'Earn completion certificates that help you showcase new technical skills to recruiters, teams, and clients.',
      icon: <CertificateIcon fontSize="large" />,
      color: '#f43f5e'
    },
    {
      title: 'Lifetime Access',
      description: 'Once you enroll, you have permanent access to course materials, including all future updates.',
      icon: <AccessTimeIcon fontSize="large" />,
      color: '#fbbf24'
    }
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Elevate Your Learning Experience
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            We provide the structure, tools, and guidance you need to learn in-demand skills in a clear, modern, project-friendly environment.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  pt: 4,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: feature.color, 
                    width: 64, 
                    height: 64, 
                    mb: 2,
                    boxShadow: `0 8px 16px -4px ${feature.color}44`
                  }}
                >
                  {feature.icon}
                </Avatar>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
