import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterCurrency from "./pages/RegisterCurrency";
import VerifyCurrency from "./pages/VerifyCurrency";
import ScanHistory from "./pages/ScanHistory";
import CurrencyRecords from "./pages/CurrencyRecords";
import ScanCurrency from "./pages/ScanCurrency";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

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

        {/* Scan History */}
        <Route
          path="/scan-history"
          element={<ScanHistory />}
        />

        {/* Currency Records */}
        <Route
          path="/currency-records"
          element={<CurrencyRecords />}
        />
        
        <Route
          path="/scan-currency"
          element={<ScanCurrency />}
        />



      </Routes>
    </BrowserRouter>
  );
}

export default App;