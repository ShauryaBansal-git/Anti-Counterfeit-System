import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/user-login");
  };

  return (
    <div className="user-dashboard-page">

      {/* Header */}
      <header className="user-dashboard-header">

        <div className="user-dashboard-brand">
          <div className="user-dashboard-logo">AC</div>

          <div>
            <h2>Anti-Counterfeit</h2>
            <span>User Portal</span>
          </div>
        </div>

        <button
          className="user-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      {/* Main Content */}
      <main className="user-dashboard-main">

        {/* Welcome */}
        <section className="user-welcome">

          <div>
            <p className="user-dashboard-label">
              USER DASHBOARD
            </p>

            <h1>Welcome Back 👋</h1>

            <p>
              Verify your currency and check your verification history.
            </p>
          </div>

        </section>

        {/* Stats */}
        <section className="user-stats-grid">

          <div className="user-stat-card">
            <span className="user-stat-icon">🔍</span>

            <div>
              <strong>6</strong>
              <p>Total Scans</p>
            </div>
          </div>

          <div className="user-stat-card">
            <span className="user-stat-icon real">✓</span>

            <div>
              <strong>4</strong>
              <p>Real Currency</p>
            </div>
          </div>

          <div className="user-stat-card">
            <span className="user-stat-icon fake">!</span>

            <div>
              <strong>2</strong>
              <p>Fake Currency</p>
            </div>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="user-section">

          <div className="user-section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Choose an action to verify currency.</p>
            </div>
          </div>

          <div className="user-actions-grid">

            {/* Scan Currency */}
            <button
              className="user-action-card"
              onClick={() => navigate("/user-scan-currency")}
            >
              <div className="user-action-icon">
                📷
              </div>

              <div>
                <strong>Scan Currency</strong>
                <span>
                  Scan QR/NFC currency
                </span>
              </div>

              <b>→</b>
            </button>

            {/* Verify Currency */}
            <button
              className="user-action-card"
              onClick={() => navigate("/verify-currency")}
            >
              <div className="user-action-icon">
                ✓
              </div>

              <div>
                <strong>Verify Currency</strong>
                <span>
                  Check currency authenticity
                </span>
              </div>

              <b>→</b>
            </button>

            {/* Scan History */}
            <button
              className="user-action-card"
              onClick={() => navigate("/user-scan-history")}
            >
              <div className="user-action-icon">
                📋
              </div>

              <div>
                <strong>Scan History</strong>
                <span>
                  View your previous scans
                </span>
              </div>

              <b>→</b>
            </button>

          </div>

        </section>

        {/* Recent Activity */}
        <section className="user-section">

          <div className="user-section-heading">

            <div>
              <h2>Recent Verification Activity</h2>
              <p>Your latest currency verification results.</p>
            </div>

            <button
              className="user-view-history"
              onClick={() => navigate("/user-scan-history")}
            >
              View All →
            </button>

          </div>

          <div className="user-activity-card">

            <div className="user-activity-row">

              <div>
                <strong>IND500123456789</strong>
                <span>₹500 • Today</span>
              </div>

              <span className="user-real-badge">
                REAL
              </span>

            </div>

            <div className="user-activity-row">

              <div>
                <strong>IND200987654321</strong>
                <span>₹200 • Yesterday</span>
              </div>

              <span className="user-fake-badge">
                FAKE
              </span>

            </div>

            <div className="user-activity-row">

              <div>
                <strong>IND100456789123</strong>
                <span>₹100 • 2 days ago</span>
              </div>

              <span className="user-real-badge">
                REAL
              </span>

            </div>

          </div>

        </section>

        {/* Footer */}
        <footer className="user-dashboard-footer">

          <span>
            Anti-Counterfeit System
          </span>

          <span>
            Secure Currency Verification Platform
          </span>

        </footer>

      </main>

    </div>
  );
}

export default UserDashboard;