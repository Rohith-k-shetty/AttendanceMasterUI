import * as React from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import AppTheme from "./shared-theme/AppTheme";
import { BrowserRouter as Router } from "react-router-dom";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";
import AppRoutes from "./routes/AppRoutes"; // Import your routes
import SignIn from "./pages/sign-in/SignIn";
import { getFromLocalStorage, clearLocalStorage } from "./utils/storage";
import { decodeToken } from "./utils/auth"; // Token decoder function
import { Toaster } from "react-hot-toast";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!(getFromLocalStorage("authToken") && getFromLocalStorage("user"))
  );

  // Handle login state after successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
    checkTokenExpiry();
  };

  // Function to handle automatic logout when token expires
  const setLogoutTimer = (timeRemaining) => {
    setTimeout(() => {
      clearLocalStorage();
      setIsAuthenticated(false);
    }, timeRemaining);
  };

  // Function to check if the token is expired on initial load
  const checkTokenExpiry = () => {
    const token = getFromLocalStorage("authToken");
    if (token) {
      const decodedToken = decodeToken(token);
      const expiryTime = decodedToken.exp * 1000;

      if (Date.now() > expiryTime) {
        // If token has already expired, clear localStorage and redirect to login
        clearLocalStorage();
        setIsAuthenticated(false);
      } else {
        // If token is still valid, set a timer to auto logout
        const timeRemaining = expiryTime - Date.now();
        setLogoutTimer(timeRemaining);
      }
    }
  };

  // Check token expiry on initial app load inside a useEffect hook
  React.useEffect(() => {
    checkTokenExpiry();
  }, []);

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Router>
        <Toaster />
        {isAuthenticated ? (
          <Box sx={{ display: "flex" }}>
            <SideMenu />
            <AppNavbar />
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : alpha(theme.palette.background.default, 1),
                overflow: "auto",
              })}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  mx: 3,
                  pb: 10,
                  mt: { xs: 8, md: 0 },
                }}
              >
                <Header />
                <AppRoutes isAuthenticated={isAuthenticated} />
              </Stack>
            </Box>
          </Box>
        ) : (
          <SignIn onLogin={handleLogin} />
        )}
      </Router>
    </AppTheme>
  );
}

export default App;
