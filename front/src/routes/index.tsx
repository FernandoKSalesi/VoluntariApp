import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../presentation/pages/LandingPage";
import Login from "../presentation/pages/Login";
import Register from "../presentation/pages/Register";
import Profile from "../presentation/pages/Profile";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}