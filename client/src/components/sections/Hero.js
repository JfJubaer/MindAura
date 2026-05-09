"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Hero = () => {
  const slides = [
    {
      title: "Master Your Mind with Expert Guidance",
      subtitle: "Join over 50,000 students learning mindfulness, cognitive behavior, and emotional intelligence from world-class instructors.",
      cta: "Explore Courses",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Elevate Your Teaching Career",
      subtitle: "Become a certified Wisdora instructor and share your knowledge with a global community of eager learners.",
      cta: "Start Teaching",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop"
    },
    {
      title: "Transformative Learning Anywhere",
      subtitle: "Access our entire library of specialized mental wellbeing courses from any device, anytime.",
      cta: "Join Now",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <Box sx={{ width: '100%', height: { xs: 'auto', md: '70vh' }, position: 'relative' }}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box 
              sx={{ 
                width: '100%', 
                height: { xs: '500px', md: '100%' },
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Container maxWidth="lg">
                <Box sx={{ maxWidth: '700px', color: 'white' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                      fontWeight: 800, 
                      mb: 2,
                      lineHeight: 1.1
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9, 
                      fontWeight: 400,
                      lineHeight: 1.6
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button variant="contained" size="large" sx={{ py: 1.5, px: 4 }}>
                      {slide.cta}
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large" 
                      startIcon={<PlayCircleOutlineIcon />}
                      sx={{ color: 'white', borderColor: 'white', py: 1.5, px: 4, '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    >
                      Watch Demo
                    </Button>
                  </Stack>
                </Box>
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Hero;
