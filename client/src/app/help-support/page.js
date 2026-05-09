"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  Chip,
  Paper,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// ─── Data ───────────────────────────────────────────────────────────────────

const categories = [
  { label: "Getting Started", icon: <PlayCircleOutlineIcon />, count: 8 },
  { label: "Courses & Content", icon: <MenuBookOutlinedIcon />, count: 12 },
  { label: "Account & Profile", icon: <AccountCircleOutlinedIcon />, count: 6 },
  { label: "Billing & Payments", icon: <PaymentOutlinedIcon />, count: 5 },
  { label: "Technical Issues", icon: <BugReportOutlinedIcon />, count: 9 },
  { label: "Certificates", icon: <SchoolOutlinedIcon />, count: 4 },
];

const faqs = [
  {
    category: "Getting Started",
    question: "How do I create an account on Wisdora?",
    answer:
      'Click the "Login" button in the top navigation, then select "Register". Fill in your name, email, and password. Once submitted, your account is ready to use immediately.',
  },
  {
    category: "Getting Started",
    question: "Is Wisdora free to use?",
    answer:
      "Many of our courses are completely free. We also offer premium courses at various price points. You can browse all courses without an account and enroll in free ones for no cost.",
  },
  {
    category: "Courses & Content",
    question: "How do I enroll in a course?",
    answer:
      'Navigate to the course page and click "Enroll Now". Free courses are instantly added to your My Learning dashboard. For paid courses, you will be directed to the checkout process.',
  },
  {
    category: "Courses & Content",
    question: "Can I access course content offline?",
    answer:
      "Currently, all course content is delivered via our online platform. We recommend using a stable internet connection. Downloadable materials like PDFs and worksheets are available for offline use where provided by the instructor.",
  },
  {
    category: "Courses & Content",
    question: "What happens to my courses if I delete my account?",
    answer:
      "Deleting your account will permanently remove your access to all enrolled courses and your progress history. We recommend downloading any certificates before closing your account.",
  },
  {
    category: "Account & Profile",
    question: "How do I update my profile information?",
    answer:
      'Go to your Profile page by clicking your avatar in the top right corner and selecting "Profile". You can edit your name, bio, and profile picture directly from that page.',
  },
  {
    category: "Account & Profile",
    question: "How do I change my password?",
    answer:
      "Navigate to your Profile page and scroll to the \"Change Password\" section. You will need to enter your current password and then your new password twice to confirm.",
  },
  {
    category: "Billing & Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express). Payments are securely processed and we never store your card details.",
  },
  {
    category: "Billing & Payments",
    question: "Can I get a refund for a course?",
    answer:
      "Yes. We offer a 30-day money-back guarantee on all paid courses, no questions asked. Contact our support team with your order details and we will process your refund within 5–7 business days.",
  },
  {
    category: "Technical Issues",
    question: "Videos are not playing. What should I do?",
    answer:
      "First, check your internet connection. Try refreshing the page, clearing your browser cache, or switching to a different browser. If the issue persists, please contact our support team with the course name and browser you are using.",
  },
  {
    category: "Technical Issues",
    question: "The website is loading slowly. How can I fix this?",
    answer:
      "Try clearing your browser cache and cookies. Disable any browser extensions that might interfere with the site. If you are on a slow connection, the video quality will automatically adjust. Still slow? Contact us.",
  },
  {
    category: "Certificates",
    question: "How do I earn a certificate?",
    answer:
      "Certificates are awarded upon completing all lessons within a course. Once you finish the final lesson, a certificate will be automatically generated and appear in your profile and My Learning dashboard.",
  },
  {
    category: "Certificates",
    question: "Are the certificates recognised by employers?",
    answer:
      "Our certificates are recognised by a growing number of organisations. Each certificate includes a unique verification link that employers can use to confirm its authenticity.",
  },
];

const contactOptions = [
  {
    icon: <EmailOutlinedIcon sx={{ fontSize: 36 }} />,
    title: "Email Support",
    description: "Get a response within 24 hours.",
    action: "Send an Email",
    href: "mailto:support@wisdora.com",
    color: "#6366f1",
  },
  {
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 36 }} />,
    title: "Live Chat",
    description: "Chat with our team in real time.",
    action: "Start Chat",
    href: "#",
    color: "#22c55e",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const HelpSupportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const handleFaqChange = (panel) => (_, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setSnackbar(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const allCategories = ["All", ...categories.map((c) => c.label)];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 10, md: 16 },
          textAlign: "center",
          backgroundImage:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
          color: "white",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.05)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.06)",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 4,
              fontWeight: 700,
              opacity: 0.85,
              mb: 2,
              display: "block",
            }}
          >
            We&apos;re here for you
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Help &amp; Support Centre
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: 0.9, mb: 6, fontWeight: 400 }}
          >
            Search our knowledge base or browse by category below.
          </Typography>

          {/* Search Bar */}
          <Paper
            component="form"
            onSubmit={(e) => e.preventDefault()}
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 4,
              overflow: "hidden",
              maxWidth: 600,
              mx: "auto",
              p: 0.5,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search for answers…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ pl: 2, pr: 1 }}>
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& input": { py: 1.5, fontSize: "1rem" } }}
            />
            <Button
              variant="contained"
              sx={{
                m: 0.5,
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                flexShrink: 0,
              }}
              onClick={() => {}}
            >
              Search
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* ── Help Categories ──────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: 800, mb: 6 }}
        >
          Browse by Topic
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          {categories.map((cat, i) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i} sx={{ display: 'flex' }}>
              <Card
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.label ? "All" : cat.label
                  )
                }
                elevation={0}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: "center",
                  p: 3,
                  borderRadius: 4,
                  border: "2px solid",
                  borderColor:
                    activeCategory === cat.label ? "primary.main" : "divider",
                  bgcolor:
                    activeCategory === cat.label ? "primary.50" : "background.paper",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    color:
                      activeCategory === cat.label
                        ? "primary.main"
                        : "text.secondary",
                    mb: 1.5,
                  }}
                >
                  {cat.icon}
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color:
                      activeCategory === cat.label
                        ? "primary.main"
                        : "text.primary",
                    mb: 0.5,
                  }}
                >
                  {cat.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {cat.count} articles
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── FAQ Accordion ────────────────────────────────────────── */}
      <Box sx={{ bgcolor: "grey.50", py: 10 }}>
        <Container maxWidth="md">
          {/* Category Filter Chips */}
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            {allCategories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setActiveCategory(cat)}
                color={activeCategory === cat ? "primary" : "default"}
                variant={activeCategory === cat ? "filled" : "outlined"}
                sx={{ fontWeight: 600, borderRadius: 2 }}
              />
            ))}
          </Stack>

          <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontWeight: 800, mb: 2 }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6 }}
          >
            {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}{" "}
            {searchTerm && `for "${searchTerm}"`}
          </Typography>

          {filteredFaqs.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: "center", borderRadius: 4 }}>
              <SearchIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                No results found
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Try a different search term or browse all categories.
              </Typography>
              <Button
                sx={{ mt: 3 }}
                variant="outlined"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {filteredFaqs.map((faq, i) => (
                <Accordion
                  key={i}
                  expanded={expandedFaq === i}
                  onChange={handleFaqChange(i)}
                  elevation={0}
                  sx={{
                    borderRadius: "12px !important",
                    border: "1px solid",
                    borderColor:
                      expandedFaq === i ? "primary.main" : "divider",
                    "&:before": { display: "none" },
                    transition: "border-color 0.2s",
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      px: 3,
                      py: 0.5,
                      bgcolor:
                        expandedFaq === i ? "primary.50" : "background.paper",
                    }}
                  >
                    <Box sx={{ pr: 2 }}>
                      <Chip
                        label={faq.category}
                        size="small"
                        sx={{
                          mb: 0.5,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          height: 20,
                        }}
                        color="primary"
                        variant="outlined"
                      />
                      <Typography sx={{ fontWeight: 700, mt: 0.5 }}>
                        {faq.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}
        </Container>
      </Box>

      {/* ── Contact Options ──────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: 800, mb: 2 }}
        >
          Still Need Help?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 8 }}
        >
          Our support team is available Monday – Friday, 9am – 6pm (GMT+6).
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 10 }}>
          {contactOptions.map((opt, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card
                elevation={0}
                sx={{
                  textAlign: "center",
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                  transition: "all 0.25s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    bgcolor: `${opt.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    color: opt.color,
                  }}
                >
                  {opt.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  {opt.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {opt.description}
                </Typography>
                <Button
                  variant="outlined"
                  href={opt.href}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                >
                  {opt.action}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ── Support Ticket Form ──────────────────────────────── */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            border: "1px solid",
            borderColor: "divider",
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <Stack spacing={0.5} sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Submit a Support Ticket
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Describe your issue and we&apos;ll get back to you as soon as possible.
            </Typography>
          </Stack>

          {submitted ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <CheckCircleOutlineIcon
                sx={{ fontSize: 72, color: "success.main", mb: 2 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Ticket Submitted!
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Thank you for reaching out. We&apos;ll respond to your email within 24 hours.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setSubmitted(false)}
                sx={{ borderRadius: 2 }}
              >
                Submit Another
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleFormChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Describe your issue"
                    name="message"
                    required
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleFormChange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      py: 1.75,
                      px: 5,
                      borderRadius: 2,
                      fontWeight: 800,
                      fontSize: "1rem",
                    }}
                  >
                    Send Ticket
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
            Ready to Keep Learning?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
            Head back to our course catalog and continue your journey.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              href="/courses"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                fontWeight: 800,
                px: 4,
                "&:hover": { bgcolor: "grey.100" },
                borderRadius: 2,
              }}
            >
              Browse Courses
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="/about"
              sx={{
                borderColor: "rgba(255,255,255,0.6)",
                color: "white",
                fontWeight: 700,
                px: 4,
                borderRadius: 2,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              About Us
            </Button>
          </Stack>
        </Container>
      </Box>

      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          Your support ticket has been submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HelpSupportPage;
