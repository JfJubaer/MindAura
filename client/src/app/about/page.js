"use client";

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid2 as Grid, 
  Stack, 
  Avatar, 
  Card, 
  CardContent, 
  Button,
  Divider,
  Paper
} from '@mui/material';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';

const stats = [
  { label: 'Happy Students', value: '15K+', icon: <GroupsTwoToneIcon color="primary" /> },
  { label: 'Total Courses', value: '500+', icon: <MenuBookTwoToneIcon color="primary" /> },
  { label: 'Expert Instructors', value: '120+', icon: <SchoolTwoToneIcon color="primary" /> },
  { label: 'Countries Reached', value: '45+', icon: <PublicTwoToneIcon color="primary" /> },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    bio: 'Visionary leader with 15+ years in psychology and education.'
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Head of Curriculum',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    bio: 'Specialist in Cognitive Behavioral Therapy and interactive learning.'
  },
  {
    name: 'Emma Williams',
    role: 'Student Success Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    bio: 'Dedicated to providing the best learning experience for our global community.'
  },
];

const AboutPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative', 
          height: '60vh', 
          display: 'flex', 
          alignItems: 'center',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1524178232363-1fb28f74b573?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 900, 
              mb: 2, 
              fontSize: { xs: '3rem', md: '4.5rem' },
              textTransform: 'uppercase',
              letterSpacing: 2
            }}
          >
            Our Mission
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.6 }}>
            Empowering individuals through mindful learning and expert-led psychology education.
          </Typography>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 2 }}>
        <Paper 
          elevation={4} 
          sx={{ 
            p: 4, 
            borderRadius: 4,
            bgcolor: 'background.paper'
          }}
        >
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Stack alignItems="center" spacing={1}>
                  <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'primary.50' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: 2 }}>
              Since 2020
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 3 }}>
              Transforming Lives Through Education
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Wisdora started with a simple belief: that high-quality psychological education and mindfulness practices should be accessible to everyone, everywhere. 
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Over the past few years, we've grown from a small group of passionate educators to a global platform, helping thousands of students navigate the complexities of the human mind and achieve their personal growth goals.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button variant="contained" size="large" sx={{ borderRadius: 2, px: 4 }}>
                Explore Courses
              </Button>
              <Button variant="outlined" size="large" sx={{ borderRadius: 2, px: 4 }}>
                Contact Us
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              sx={{ 
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: '100%',
                  height: '100%',
                  border: '4px solid',
                  borderColor: 'primary.main',
                  borderRadius: 4,
                  zIndex: -1
                }
              }}
            >
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: 3
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Core Values Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 12 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" sx={{ fontWeight: 800, mb: 8 }}>
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: 'Quality Content', desc: 'Every course is peer-reviewed and led by industry experts.', icon: <WorkspacePremiumTwoToneIcon sx={{ fontSize: 40 }} /> },
              { title: 'Innovation', desc: 'We use the latest technology to make learning interactive and fun.', icon: <EmojiObjectsTwoToneIcon sx={{ fontSize: 40 }} /> },
              { title: 'Accessibility', desc: 'Education that fits your schedule and budget, no matter where you are.', icon: <PublicTwoToneIcon sx={{ fontSize: 40 }} /> },
            ].map((value, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{ height: '100%', borderRadius: 4, textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>{value.icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{value.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{value.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Meet the Team</Typography>
          <Typography variant="h6" color="text.secondary">The passionate minds behind Wisdora.</Typography>
        </Box>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }} elevation={0} variant="outlined">
                <Box sx={{ pt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Avatar 
                    src={member.image} 
                    sx={{ width: 150, height: 150, border: '4px solid', borderColor: 'primary.main' }} 
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>{member.name}</Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 2 }}>{member.role}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{member.bio}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 10,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.9 }}>
            Join over 15,000 students and start learning today with our expert-led courses.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              fontWeight: 800,
              px: 6,
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
