import { Box, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Box maxWidth="xl" sx={{ pt: 14,
            px: {xs: 2, sm: 3, md: 4}
           }}>
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
}

export default App
 