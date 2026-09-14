import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Header */}
      <header className="home-header">

        <div className="home-brand">
          <div className="home-logo">AC</div>

          <div>
            <h2>Anti-Counterfeit</h2>
            <span>Secure Currency Verification</span>
          </div>
        </div>

        <div className="home-header-buttons">
          <button
            className="home-user-login"
            onClick={() => navigate("/user-login")}
          >
            User Login
          </button>

          <button
            className="home-admin-login"
            onClick={() => navigate("/login")}
          >
            Admin Login
          </button>
        </div>

      </header>


      {/* Hero Section */}
      <main>

        <section className="home-hero">

          <div className="home-hero-content">

            <p className="home-label">
              SMART CURRENCY AUTHENTICATION
            </p>

            <h1>
              Detect Counterfeit Currency
              <span> Quickly & Securely</span>
            </h1>

            <p className="home-description">
              A secure platform for verifying currency authenticity
              using digital identification, QR/NFC scanning and
              advanced anti-counterfeit technology.
            </p>

            <div className="home-hero-buttons">

              <button
                className="home-primary-button"
                onClick={() => navigate("/user-login")}
              >
                Verify Currency →
              </button>

              <button
                className="home-secondary-button"
                onClick={() => navigate("/login")}
              >
                Admin Portal
              </button>

            </div>

          </div>


          {/* Hero Visual */}
          <div className="home-hero-visual">

            <div className="home-security-card">

              <div className="home-security-icon">
                ✓
              </div>

              <p>Currency Verification</p>

              <h3>Secure & Authentic</h3>

              <div className="home-security-line"></div>

              <div className="home-security-details">
                <span>QR / NFC</span>
                <span>Verified</span>
              </div>

            </div>

          </div>

        </section>


        {/* Features */}
        <section className="home-features">

          <div className="home-section-heading">

            <p className="home-label">
              KEY FEATURES
            </p>

            <h2>
              Everything You Need for Currency Verification
            </h2>

            <p>
              Simple and secure tools for detecting and verifying
              currency authenticity.
            </p>

          </div>


          <div className="home-feature-grid">

            <div className="home-feature-card">

              <div className="home-feature-icon">
                📷
              </div>

              <h3>QR / NFC Scanning</h3>

              <p>
                Scan currency identification using QR codes
                or NFC-based verification.
              </p>

            </div>


            <div className="home-feature-card">

              <div className="home-feature-icon">
                ✓
              </div>

              <h3>Instant Verification</h3>

              <p>
                Quickly check whether a currency record is
                genuine or potentially counterfeit.
              </p>

            </div>


            <div className="home-feature-card">

              <div className="home-feature-icon">
                🔒
              </div>

              <h3>Secure Records</h3>

              <p>
                Maintain secure currency verification and
                scanning records.
              </p>

            </div>

          </div>

        </section>


        {/* How It Works */}
        <section className="home-how-it-works">

          <div className="home-section-heading">

            <p className="home-label">
              HOW IT WORKS
            </p>

            <h2>
              Verify Currency in Three Simple Steps
            </h2>

          </div>


          <div className="home-steps">

            <div className="home-step">

              <div className="home-step-number">
                01
              </div>

              <h3>Scan or Enter ID</h3>

              <p>
                Scan the QR/NFC information or enter the
                Currency ID manually.
              </p>

            </div>


            <div className="home-step">

              <div className="home-step-number">
                02
              </div>

              <h3>Verify Currency</h3>

              <p>
                The system checks the currency information
                against the verification records.
              </p>

            </div>


            <div className="home-step">

              <div className="home-step-number">
                03
              </div>

              <h3>Get Result</h3>

              <p>
                View the verification result and identify
                whether the currency is REAL or FAKE.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer className="home-footer">

        <span>
          Anti-Counterfeit System
        </span>

        <span>
          Secure Currency Verification Platform
        </span>

      </footer>

    </div>
  );
}

export default Home;