import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterCurrency from "./pages/RegisterCurrency";
import VerifyCurrency from "./pages/VerifyCurrency";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Register Currency */}
        <Route
          path="/register-currency"
          element={<RegisterCurrency />}
        />

        {/* Verify Currency */}
        <Route
          path="/verify-currency"
          element={<VerifyCurrency />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;