import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserScanCurrency.css";

function UserScanCurrency() {
  const navigate = useNavigate();

  const [currencyId, setCurrencyId] = useState("");
  const [result, setResult] = useState(null);

  const handleStartScan = () => {
    setCurrencyId("IND500123456789");
    setResult(null);
  };

  const handleVerify = () => {
    if (!currencyId) {
      alert("Please enter a Currency ID.");
      return;
    }

    setResult({
      status: "REAL",
      denomination: "₹500",
      message: "Currency is authentic and verified successfully.",
    });
  };

  const handleClear = () => {
    setCurrencyId("");
    setResult(null);
  };

  return (
    <div className="user-scan-page">

      <div className="user-scan-container">

        {/* Header */}
        <div className="user-scan-header">

          <button
            type="button"
            className="user-scan-back-button"
            onClick={() => navigate("/user-dashboard")}
          >
            ← Back to Dashboard
          </button>

          <p className="user-scan-label">
            USER CURRENCY SCANNER
          </p>

          <h1>Scan Currency</h1>

          <p className="user-scan-description">
            Scan QR/NFC currency or enter the Currency ID manually
            to verify its authenticity.
          </p>

        </div>


        {/* Scanner Card */}
        <div className="user-scan-card">

          <div className="user-scanner-box">

            <div className="user-scanner-icon">
              ▦
            </div>

            <h2>QR / NFC Scanner</h2>

            <p>
              Place the currency near the NFC reader or scan its QR code.
            </p>

            <button
              type="button"
              className="user-start-scan-button"
              onClick={handleStartScan}
            >
              Start Scan
            </button>

          </div>


          <div className="user-scan-or">
            <span>OR</span>
          </div>


          {/* Manual Entry */}
          <div className="user-manual-section">

            <h2>Enter Currency ID Manually</h2>

            <input
              type="text"
              placeholder="Enter Currency ID"
              value={currencyId}
              onChange={(e) => {
                setCurrencyId(e.target.value);
                setResult(null);
              }}
            />

            <div className="user-scan-actions">

              <button
                type="button"
                className="user-verify-button"
                onClick={handleVerify}
              >
                Verify Currency
              </button>

              <button
                type="button"
                className="user-clear-button"
                onClick={handleClear}
              >
                Clear
              </button>

            </div>

          </div>

        </div>


        {/* Verification Result */}
        {result && (
          <div className="user-verification-result">

            <div className="user-result-header">

              <h2>Verification Result</h2>

              <span className="user-real-result">
                {result.status}
              </span>

            </div>

            <div className="user-result-details">

              <div>
                <span>Currency ID</span>
                <strong>{currencyId}</strong>
              </div>

              <div>
                <span>Denomination</span>
                <strong>{result.denomination}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="user-result-status">
                  {result.status}
                </strong>
              </div>

            </div>

            <div className="user-result-message">
              ✓ {result.message}
            </div>

          </div>
        )}


        {/* Footer */}
        <footer className="user-scan-footer">

          <span>
            Anti-Counterfeit System
          </span>

          <span>
            Secure Currency Verification Platform
          </span>

        </footer>

      </div>

    </div>
  );
}

export default UserScanCurrency;