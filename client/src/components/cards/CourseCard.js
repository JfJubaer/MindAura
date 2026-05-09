/* eslint-disable react/prop-types */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Stack,
  Rating,
  Chip,
} from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const CourseCard = ({ course }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
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
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{ height: { xs: 220, sm: 200 } }}
          image={
            course.thumbnailUrl ||
            "https://via.placeholder.com/400x200?text=No+Image"
          }
          alt={course.name}
          loading="lazy"
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{ position: "absolute", top: 12, left: 12 }}
        >
          <Chip
            label={course.category || "Other"}
            size="small"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.9)",
              fontWeight: 700,
              backdropFilter: "blur(4px)",
            }}
          />
        </Stack>
        <Chip
          label={course.price === 0 ? "Free" : `$${course.price}`}
          color={course.price === 0 ? "success" : "primary"}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            fontWeight: 700,
            boxShadow: 2,
            maxWidth: "calc(100% - 24px)",
          }}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, md: 3 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 800,
            lineHeight: 1.3,
            height: "2.6em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            height: "3em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.description}
        </Typography>

        <Stack
          spacing={1.5}
          sx={{ mt: "auto" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating
              value={course.rating || 0}
              readOnly
              size="small"
              precision={0.5}
            />
            <Typography
              variant="caption"
              color="text.secondary"
            >
              ({course.rating || 0})
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
            }}
          >
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">
              {new Date(course.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Link
            href={`/courses/${course._id}`}
            passHref
            style={{ textDecoration: "none" }}
          >
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                mt: 1,
                py: 1,
                minHeight: 44,
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              View Details
            </Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
