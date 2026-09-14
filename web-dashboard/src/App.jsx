import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterCurrency from "./pages/RegisterCurrency";
import VerifyCurrency from "./pages/VerifyCurrency";
import ScanHistory from "./pages/ScanHistory";
import CurrencyRecords from "./pages/CurrencyRecords";
import ScanCurrency from "./pages/ScanCurrency";
import Settings from "./pages/Settings";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import UserScanHistory from "./pages/UserScanHistory";
import UserScanCurrency from "./pages/UserScanCurrency";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Admin Login */}
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

        {/* Admin Scan History */}
        <Route
          path="/scan-history"
          element={<ScanHistory />}
        />

        {/* Currency Records */}
        <Route
          path="/currency-records"
          element={<CurrencyRecords />}
        />

        {/* Admin Scan Currency */}
        <Route
          path="/scan-currency"
          element={<ScanCurrency />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* User Login */}
        <Route
          path="/user-login"
          element={<UserLogin />}
        />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />

        {/* User Scan History */}
        <Route
          path="/user-scan-history"
          element={<UserScanHistory />}
        />

        {/* User Scan Currency */}
        <Route
          path="/user-scan-currency"
          element={<UserScanCurrency />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;