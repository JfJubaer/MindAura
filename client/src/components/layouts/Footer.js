"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid2 as Grid,
  Typography,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const platformLinks = [
    { label: "All Courses", href: "/courses" },
    { label: "Instructors", href: "/instructors" },
    { label: "My Learning", href: "/my-learning" },
    { label: "Wishlist", href: "/wishlist" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Instructors", href: "/instructors" },
  ];

  const supportLinks = [
    { label: "Help & Support", href: "/help-support" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/help-support#faq" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 4,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "primary.main", mb: 2 }}
            >
              Wisdora
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 300, lineHeight: 1.8 }}
            >
              Learn practical skills from beginner to advanced level with
              hands-on courses in technology, design, business, and more.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="primary">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary">
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary">
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Platform
            </Typography>
            <Stack spacing={1.5}>
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Company
            </Typography>
            <Stack spacing={1.5}>
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Support
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              {supportLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Email: support@wisdora.com
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Hours: Mon - Fri, 9am - 6pm (GMT+6)
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Wisdora. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="/privacy" style={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                Privacy Policy
              </Typography>
            </Link>
            <Link href="/terms" style={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                Terms of Service
              </Typography>
            </Link>
            <Link href="/help-support" style={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                Help & Support
              </Typography>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
