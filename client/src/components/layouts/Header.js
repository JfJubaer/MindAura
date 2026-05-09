"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser, logout } from "@/redux/features/authSlice";
import axiosInstance from "@/lib/axios/axiosInstance";
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
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);

  // Fetch user data if token exists but user is null
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        setLoading(true);
        try {
          const response = await axiosInstance.get("/users/user");
          if (response.data.success && response.data.body?.user) {
            dispatch(setUser(response.data.body.user));
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          dispatch(logout());
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [token, user, dispatch]);

  console.log("userData", user);

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

  const navLinks = user
    ? [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "My Learning", href: "/my-learning" },
        { name: "Instructors", href: "/instructors" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
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
        {!user && !loading && (
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
              {loading ? (
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
                      href="/settings"
                      onClick={handleCloseMenu}
                    >
                      Settings
                    </MenuItem>
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
