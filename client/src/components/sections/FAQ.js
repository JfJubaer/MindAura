"use client";

import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const faqs = [
    {
      q: 'Do I get a certificate after completing a course?',
      a: 'Yes, all our specialized courses come with a digital certificate of completion that you can share on LinkedIn or with potential employers.'
    },
    {
      q: 'Can I access the courses offline?',
      a: 'Yes, our mobile app allows you to download course materials and videos for offline viewing so you can learn anywhere.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer a 30-day money-back guarantee if you are not satisfied with your learning experience. No questions asked.'
    },
    {
      q: 'Are the instructors certified professionals?',
      a: 'Absolutely. Every instructor on Wisdora goes through a rigorous vetting process and must hold relevant certifications in their field.'
    }
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Common Questions
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Everything you need to know about the Wisdora learning platform.
          </Typography>
        </Box>

        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, '&:before': { display: 'none' }, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />} sx={{ py: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'background.default', pt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default FAQ;
