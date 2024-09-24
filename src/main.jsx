import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

// import Dashboard from "./Dashboard";
import SignIn from "./pages/sign-in/SignIn";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <SignIn /> */}
    {/* <Dashboard /> */}
  </StrictMode>
);
