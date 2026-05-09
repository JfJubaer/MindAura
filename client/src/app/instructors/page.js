"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Button,
  Chip,
  Skeleton,
  Divider,
} from "@mui/material";
import Link from "next/link";
import axiosInstance from "@/lib/axios/axiosInstance";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axiosInstance.get("/users/instructors");
        if (response.data.success) {
          setInstructors(response.data.body.instructors);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <Box sx={{ py: 10, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 800, letterSpacing: 2 }}
          >
            Our Experts
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 900, mb: 2, mt: 1 }}
          >
            Meet Our Honorable Instructors
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Learn from industry leaders, world-class researchers, and
            passionate educators dedicated to your growth.
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
        >
          {loading
            ? Array.from(new Array(6)).map((_, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={index}
                >
                  <Card sx={{ borderRadius: 4, height: "100%" }}>
                    <Box
                      sx={{
                        pt: 4,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width={120}
                        height={120}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={32}
                        sx={{ mx: "auto" }}
                      />
                      <Skeleton
                        variant="text"
                        width="40%"
                        sx={{ mx: "auto", mb: 2 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={60}
                        sx={{ borderRadius: 2 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : instructors.map((instructor) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={instructor._id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 6,
                      },
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                    elevation={0}
                  >
                    <Box
                      sx={{
                        pt: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={instructor.profilePic}
                        sx={{
                          width: 120,
                          height: 120,
                          border: "4px solid",
                          borderColor: "primary.light",
                          mb: 2,
                        }}
                      >
                        {instructor.name.charAt(0)}
                      </Avatar>
                      <Chip
                        label={
                          instructor.role === "admin" ? "Founder" : "Expert Instructor"
                        }
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 700, borderRadius: 1 }}
                      />
                    </Box>

                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, mb: 1 }}
                      >
                        {instructor.name}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                          height: "3.2em",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {instructor.bio ||
                          "Dedicated educator focused on mental wellbeing and personal development."}
                      </Typography>

                      <Divider sx={{ mb: 3 }} />

                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EmailIcon />}
                          href={`mailto:${instructor.email}`}
                          sx={{ borderRadius: 2 }}
                        >
                          Contact
                        </Button>
                        <Link href={`/courses?instructor=${instructor._id}`} passHref style={{ textDecoration: 'none' }}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<SchoolIcon />}
                            sx={{ borderRadius: 2 }}
                          >
                            Courses
                          </Button>
                        </Link>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>

        {!loading && instructors.length === 0 && (
          <Box sx={{ py: 10, textAlign: "center" }}>
            <Typography
              variant="h5"
              color="text.secondary"
            >
              Our team is growing! Check back soon to meet our new instructors.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default InstructorsPage;
