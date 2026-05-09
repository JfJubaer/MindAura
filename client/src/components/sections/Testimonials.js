"use client";

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Stack, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      role: 'Student at Stanford',
      text: "Wisdora's cognitive behavioral therapy course was life-changing. The instructors are incredibly knowledgeable and the community support is unmatched.",
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'Software Architect',
      text: "I've taken many online courses, but the mindfulness curriculum here is by far the most structured and practical. Highly recommended for busy professionals.",
      avatar: 'https://i.pravatar.cc/150?u=david',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      role: 'Psychology Graduate',
      text: "The certification I earned here helped me secure my first role as a mental health coordinator. The quality of content is truly institutional grade.",
      avatar: 'https://i.pravatar.cc/150?u=elena',
      rating: 5
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Success Stories from Our Students
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Join thousands of others who have transformed their lives through our courses.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {reviews.map((review, index) => (
            <Card key={index} sx={{ flex: 1, position: 'relative', overflow: 'visible' }}>
              <CardContent sx={{ pt: 6 }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -24, 
                    left: 24, 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: 4
                  }}
                >
                  <FormatQuoteIcon />
                </Box>
                <Rating value={review.rating} readOnly size="small" sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 4, lineHeight: 1.8 }}>
                  "{review.text}"
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={review.avatar} sx={{ width: 48, height: 48 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{review.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{review.role}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Testimonials;
