import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterCurrency from "./pages/RegisterCurrency";

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
        <Route path="/register-currency" element={<RegisterCurrency />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;