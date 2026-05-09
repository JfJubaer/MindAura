"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import FeaturedCourses from '@/components/sections/FeaturedCourses';

// Dynamic imports for below-the-fold components
const Features = dynamic(() => import('@/components/sections/Features'));
const Stats = dynamic(() => import('@/components/sections/Stats'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const Newsletter = dynamic(() => import('@/components/sections/Newsletter'));
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
