import { Group, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const abc = () => ({
    display: "flex",
    justifyContent: "flex-start", // left alignment in flexbox
    left: 0,
    width: 375,
  });

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Drawer content: your current menu items vertically stacked
  const drawerContent = (
    <Box
      sx={{ width: 250, paddingTop: 2 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem>
          <MenuItemLink to="/activities">Activities</MenuItemLink>
        </ListItem>
        <ListItem>
          <MenuItemLink to="/counter">Counter</MenuItemLink>
        </ListItem>
        <ListItem>
          <MenuItemLink to="/errors">Errors</MenuItemLink>
        </ListItem>
        {!currentUser ? (
          <>
            <ListItem>
              <MenuItemLink to="/login">Login</MenuItemLink>
            </ListItem>
            <ListItem>
              <MenuItemLink to="/register">Register</MenuItemLink>
            </ListItem>
          </>
        ) : (
          <ListItem>
            <UserMenu />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          ...(isMobile ? abc() : {}),
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: isMobile ? "initial" : "space-between",
            }}
          >
            {/* Logo */}
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                {isMobile ? (
                  <>
                    <Group fontSize="large" />
                    <Typography
                      sx={{ position: "relative" }}
                      variant="h6"
                      fontWeight="bold"
                    >
                      Reactivities
                    </Typography>
                  </>
                ) : (
                  <>
                    <Group fontSize="large" />
                    <Typography
                      sx={{ position: "relative" }}
                      variant="h4"
                      fontWeight="bold"
                    >
                      Reactivities
                    </Typography>
                  </>
                )}
                <Observer>
                  {() =>
                    uiStore.isLoading ? (
                      <CircularProgress
                        size={20}
                        thickness={7}
                        sx={{
                          color: "white",
                          position: "absolute",
                          top: "30%",
                          left: "105%",
                        }}
                      />
                    ) : null
                  }
                </Observer>
              </MenuItem>
            </Box>

            {/* Show hamburger on mobile */}
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  edge="end"
                  aria-label="menu"
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer}
                  ModalProps={{ keepMounted: true }}
                >
                  {drawerContent}
                </Drawer>
              </>
            ) : (
              <>
                {/* Desktop full menu */}
                <Box sx={{ display: "flex" }}>
                  <MenuItemLink to="/activities">Activities</MenuItemLink>
                  <MenuItemLink to="/counter">Counter</MenuItemLink>
                  <MenuItemLink to="/errors">Errors</MenuItemLink>
                </Box>
                <Box display="flex" alignItems="center">
                  {currentUser ? (
                    <UserMenu />
                  ) : (
                    <>
                      <MenuItemLink to="/login">Login</MenuItemLink>
                      <MenuItemLink to="/register">Register</MenuItemLink>
                    </>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
