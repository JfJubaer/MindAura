"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Rating,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Testimonials = () => {
  const reviews = [
    {
      name: "Nusrat Jahan",
      role: "Frontend Developer",
      text: "The React and UI engineering lessons were practical from day one. I could apply the patterns to my office project almost immediately.",
      avatar: "https://i.pravatar.cc/150?u=tanvir-hasan",
      rating: 5,
    },
    {
      name: "Tanvir Hasan",
      role: "Product Designer",
      text: "I joined for design systems and product thinking, and the content felt clear, current, and easy to follow even with a full-time job.",
      avatar: "https://i.pravatar.cc/150?u=nusrat-jahan",
      rating: 5,
    },
    {
      name: "Meem Rahman",
      role: "Junior Software Engineer",
      text: "The backend and database modules helped me build a full-stack portfolio project that gave me confidence during interviews.",
      avatar: "https://i.pravatar.cc/150?u=mehedi-rahman",
      rating: 5,
    },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2 }}
          >
            Success Stories from Our Students
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
          >
            See how learners are building skills, projects, and new career
            opportunities through our courses.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
        >
          {reviews.map((review, index) => (
            <Card
              key={index}
              sx={{ flex: 1, position: "relative", overflow: "visible" }}
            >
              <CardContent sx={{ pt: 6 }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: -24,
                    left: 24,
                    bgcolor: "primary.main",
                    color: "white",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 4,
                  }}
                >
                  <FormatQuoteIcon />
                </Box>
                <Rating
                  value={review.rating}
                  readOnly
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="body1"
                  sx={{ fontStyle: "italic", mb: 4, lineHeight: 1.8 }}
                >
                  "{review.text}"
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Avatar
                    src={review.avatar}
                    sx={{ width: 48, height: 48 }}
                    imgProps={{ loading: "lazy" }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700 }}
                    >
                      {review.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {review.role}
                    </Typography>
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
