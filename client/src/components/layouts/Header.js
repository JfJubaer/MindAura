/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const router = useRouter();
  // Auth init is handled in Provider.js — no duplicate fetch needed here
  const { user, isLoading: authLoading } = useSelector((state) => state.auth);

  // console.log("userData", user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Help & Support", href: "/help-support" },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", p: 2 }}
    >
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: 800, color: "primary.main" }}
      >
        Wisdora
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
          >
            <Link
              href={item.href}
              style={{
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemText
                primary={item.name}
                sx={{ textAlign: "center", py: 1 }}
              />
            </Link>
          </ListItem>
        ))}
        {!user && !authLoading && (
          <ListItem disablePadding>
            <Link
              href="/login"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Link>
          </ListItem>
        )}
        {user && (
          <>
            <ListItem disablePadding>
              <Link
                href="/profile"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemText
                  primary="Profile"
                  sx={{ textAlign: "center", py: 1 }}
                />
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                href="/my-learning"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemText
                  primary="My Learning"
                  sx={{ textAlign: "center", py: 1 }}
                />
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link
                href="/wishlist"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemText
                  primary="Wishlist"
                  sx={{ textAlign: "center", py: 1 }}
                />
              </Link>
            </ListItem>

            {user.role === "admin" && (
              <ListItem disablePadding>
                <Link
                  href="/admin"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ListItemText
                    primary="Admin Panel"
                    sx={{ textAlign: "center", py: 1 }}
                  />
                </Link>
              </ListItem>
            )}

            <ListItem disablePadding>
              <Button
                fullWidth
                color="error"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 2 : 0}
        sx={{
          bgcolor: isScrolled ? "background.paper" : "transparent",
          color: "text.primary",
          transition: "all 0.3s ease",
          borderBottom: isScrolled ? "1px solid" : "none",
          borderColor: "divider",
          py: isScrolled ? 0.5 : 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                fontWeight: 800,
                color: "primary.main",
                textDecoration: "none",
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              Wis
              <Box
                component="span"
                sx={{ color: "text.primary" }}
              >
                dora
              </Box>
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                ml: 4,
                gap: 3,
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              {authLoading ? (
                <CircularProgress size={24} />
              ) : user ? (
                <>
                  <Button
                    onClick={handleOpenMenu}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ color: "text.primary", textTransform: "none" }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        mr: 1,
                        bgcolor: "primary.main",
                        fontSize: "0.875rem",
                      }}
                    >
                      {user.name?.charAt(0) || "U"}
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      {user.name}
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    sx={{ mt: 1 }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      component={Link}
                      href="/profile"
                      onClick={handleCloseMenu}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      href="/my-learning"
                      onClick={handleCloseMenu}
                    >
                      My Learning
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      href="/wishlist"
                      onClick={handleCloseMenu}
                    >
                      Wishlist
                    </MenuItem>

                    {user.role === "admin" && (
                      <MenuItem
                        component={Link}
                        href="/admin"
                        onClick={handleCloseMenu}
                      >
                        Admin Panel
                      </MenuItem>
                    )}
                    {(user.role === "admin" || user.role === "teacher") && (
                      <MenuItem
                        component={Link}
                        href="/courses/create"
                        onClick={handleCloseMenu}
                      >
                        Add Course
                      </MenuItem>
                    )}

                    <Divider />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ color: "error.main" }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link
                  href="/login"
                  passHref
                  legacyBehavior
                >
                  <Button variant="contained">Login</Button>
                </Link>
              )}
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>
      {/* Spacer for sticky header */}
      <Box sx={{ height: 80 }} />
    </>
  );
};

export default Header;
