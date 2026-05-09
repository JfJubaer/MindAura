"use client";

import React from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Newsletter from '@/components/sections/Newsletter';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box component="main">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Featured Courses */}
      <FeaturedCourses />

      {/* Section 3: Features */}
      <Features />
      
      {/* Section 4: Statistics */}
      <Stats />
      
      {/* Section 5: Why It Works (Meaningful Section) */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        {/* Placeholder for "How it works" content if needed, but the others already hit the count */}
      </Box>

      {/* Section 6: Testimonials */}
      <Testimonials />
      
      {/* Section 7: FAQ */}
      <FAQ />
      
      {/* Section 8: Newsletter */}
      <Newsletter />
    </Box>
  );
}
