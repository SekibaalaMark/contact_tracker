import {
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/authContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./features/authentication/ForgotPassword.jsx";
import Logout from "./components/Logout";

import { Container } from "@mui/material";
import "./App.css";

const ProtectedLayout = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  // Redirect based on role if authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    // TODO: Add proper dashboard routing when dashboards are created
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, padding: 3, borderRadius: 2, boxShadow: 3 }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<div>Dashboard Coming Soon</div>} />
      </Routes>
    </Container>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
export default App;
