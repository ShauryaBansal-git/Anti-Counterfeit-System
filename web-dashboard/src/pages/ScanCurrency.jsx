import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScanCurrency.css";

function ScanCurrency() {
  const navigate = useNavigate();

  const [currencyId, setCurrencyId] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();

    if (!currencyId.trim()) {
      alert("Please enter a Currency ID.");
      return;
    }

    // Frontend simulation
    setScanResult({
      status: "REAL",
      currencyId: currencyId,
      denomination: "₹500",
      message: "Currency is authentic and verified successfully.",
    });
  };

  const handleClear = () => {
    setCurrencyId("");
    setScanResult(null);
  };

  return (
    <div className="scan-page">

      {/* Header */}
      <header className="scan-header">

        <div className="scan-brand">
          <div className="brand-logo">AC</div>

          <div>
            <h2>Anti-Counterfeit</h2>
            <span>Currency Verification</span>
          </div>
        </div>

        <button
          className="back-dashboard"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

      </header>


      {/* Main Content */}
      <main className="scan-main">

        <div className="scan-intro">
          <p className="scan-label">CURRENCY AUTHENTICATION</p>

          <h1>Scan & Verify Currency</h1>

          <p>
            Scan a currency using QR/NFC technology or enter the Currency ID
            manually to check its authenticity.
          </p>
        </div>


        {/* Scan Card */}
        <section className="scan-card">

          <div className="scan-icon">
            ⌕
          </div>

          <h2>Currency Scanner</h2>

          <p className="scan-description">
            QR/NFC scanning will be connected with the real verification
            system later.
          </p>


          {/* QR/NFC Area */}
          <div className="scanner-box">

            <div className="scanner-symbol">
              ▦
            </div>

            <h3>QR / NFC Scanner</h3>

            <p>
              Place the currency near the NFC reader or scan its QR code.
            </p>

            <button
              className="scan-button"
              onClick={() => {
                setCurrencyId("IND500123456789");
              }}
            >
              Start Scan
            </button>

          </div>


          {/* Manual Currency ID */}
          <div className="manual-section">

            <div className="divider">
              <span>OR</span>
            </div>

            <h3>Enter Currency ID Manually</h3>

            <form onSubmit={handleScan}>

              <input
                type="text"
                placeholder="Example: IND500123456789"
                value={currencyId}
                onChange={(e) => setCurrencyId(e.target.value)}
              />

              <div className="form-buttons">

                <button
                  type="submit"
                  className="verify-button"
                >
                  Verify Currency
                </button>

                <button
                  type="button"
                  className="clear-button"
                  onClick={handleClear}
                >
                  Clear
                </button>

              </div>

            </form>

          </div>

        </section>


        {/* Verification Result */}
        {scanResult && (
          <section className="result-card">

            <div className="result-header">
              <h2>Verification Result</h2>

              <span className="real-badge">
                {scanResult.status}
              </span>
            </div>

            <div className="result-details">

              <div>
                <span>Currency ID</span>
                <strong>{scanResult.currencyId}</strong>
              </div>

              <div>
                <span>Denomination</span>
                <strong>{scanResult.denomination}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="real-text">
                  {scanResult.status}
                </strong>
              </div>

            </div>

            <p className="result-message">
              ✓ {scanResult.message}
            </p>

          </section>
        )}

      </main>

    </div>
  );
}

export default ScanCurrency;