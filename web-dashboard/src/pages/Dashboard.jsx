import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-logo">AC</div>

          <div>
            <h2>Anti-Counterfeit</h2>
            <span>Admin Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          {/* Dashboard */}
          <button
            className="nav-item active"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          {/* Register Currency */}
          <button
            className="nav-item"
            onClick={() => navigate("/register-currency")}
          >
            <span>＋</span>
            Register Currency
          </button>

          {/* Verify Currency */}
          <button
            className="nav-item"
            onClick={() => navigate("/verify-currency")}
          >
            <span>⌕</span>
            Verify Currency
          </button>

          {/* Scan Currency */}
          <button
            className="nav-item"
            onClick={() => navigate("/scan-currency")}
          >
            <span>▦</span>
            Scan Currency
          </button>

          {/* Scan History */}
          <button
            className="nav-item"
            onClick={() => navigate("/scan-history")}
          >
            <span>◷</span>
            Scan History
          </button>

          {/* Currency Records */}
          <button
            className="nav-item"
            onClick={() => navigate("/currency-records")}
          >
            <span>▣</span>
            Currency Records
          </button>

        </nav>

        <div className="sidebar-bottom">

          {/* Settings */}
          <button
            className="nav-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>

          {/* Logout */}
          <button
            className="logout-item"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Top Navbar */}
        <header className="dashboard-header">

          <div>
            <p className="header-small">ADMIN PORTAL</p>
            <h1>Dashboard</h1>
          </div>

          <div className="admin-profile">

            <div className="notification">
              🔔
              <span className="notification-dot"></span>
            </div>

            <div className="admin-avatar">
              RA
            </div>

            <div className="admin-info">
              <strong>Reserve Bank Admin</strong>
              <span>Administrator</span>
            </div>

          </div>

        </header>


        {/* Welcome Section */}
        <section className="welcome-section">

          <div>
            <p className="welcome-label">OVERVIEW</p>

            <h2>
              Welcome back, Admin 👋
            </h2>

            <p>
              Monitor currency authenticity and manage verification
              activities from your dashboard.
            </p>
          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            System Operational
          </div>

        </section>


        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-icon blue">▣</span>
              <span className="stat-change">+12.5%</span>
            </div>

            <p>Total Registered Currency</p>
            <h3>24,856</h3>

            <span className="stat-footer">
              Compared to last month
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-icon green">✓</span>
              <span className="stat-change">+8.2%</span>
            </div>

            <p>Verified Currency</p>
            <h3>23,941</h3>

            <span className="stat-footer">
              Authentic records
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-icon orange">!</span>
              <span className="stat-change warning">+3.4%</span>
            </div>

            <p>Suspicious Currency</p>
            <h3>915</h3>

            <span className="stat-footer">
              Requires attention
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span className="stat-icon purple">⌕</span>
              <span className="stat-change">+18.7%</span>
            </div>

            <p>Total Scans</p>
            <h3>38,492</h3>

            <span className="stat-footer">
              Verification scans
            </span>

          </div>

        </section>


        {/* Dashboard Content */}
        <section className="dashboard-content">

          {/* Recent Activity */}
          <div className="dashboard-card activity-card">

            <div className="card-header">

              <div>
                <h3>Recent Verification Activity</h3>
                <p>Latest currency verification records</p>
              </div>

              <button
                className="view-all"
                onClick={() => navigate("/scan-history")}
              >
                View All
              </button>

            </div>


            <div className="activity-table">

              <div className="table-row table-heading">
                <span>Currency ID</span>
                <span>Denomination</span>
                <span>Date</span>
                <span>Status</span>
              </div>


              <div className="table-row">
                <span className="currency-id">
                  IND500123456789
                </span>
                <span>₹500</span>
                <span>11 Sep 2026</span>
                <span className="status authentic">
                  Authentic
                </span>
              </div>


              <div className="table-row">
                <span className="currency-id">
                  IND200987654321
                </span>
                <span>₹200</span>
                <span>11 Sep 2026</span>
                <span className="status authentic">
                  Authentic
                </span>
              </div>


              <div className="table-row">
                <span className="currency-id">
                  IND100456789123
                </span>
                <span>₹100</span>
                <span>10 Sep 2026</span>
                <span className="status suspicious">
                  Suspicious
                </span>
              </div>


              <div className="table-row">
                <span className="currency-id">
                  IND500741258963
                </span>
                <span>₹500</span>
                <span>10 Sep 2026</span>
                <span className="status authentic">
                  Authentic
                </span>
              </div>

            </div>

          </div>


          {/* Quick Actions */}
          <div className="dashboard-card quick-card">

            <div className="card-header">

              <div>
                <h3>Quick Actions</h3>
                <p>Frequently used operations</p>
              </div>

            </div>


            <div className="quick-actions">

              {/* Register Currency */}
              <button
                className="quick-action"
                onClick={() => navigate("/register-currency")}
              >

                <div className="quick-icon register-icon">
                  ＋
                </div>

                <div>
                  <strong>Register Currency</strong>
                  <span>Add new currency record</span>
                </div>

                <b>→</b>

              </button>


              {/* Verify Currency */}
              <button
                className="quick-action"
                onClick={() => navigate("/verify-currency")}
              >

                <div className="quick-icon verify-icon">
                  ✓
                </div>

                <div>
                  <strong>Verify Currency</strong>
                  <span>Check currency authenticity</span>
                </div>

                <b>→</b>

              </button>


              {/* Scan Currency */}
              <button
                className="quick-action"
                onClick={() => navigate("/scan-currency")}
              >

                <div className="quick-icon verify-icon">
                  ▦
                </div>

                <div>
                  <strong>Scan Currency</strong>
                  <span>Scan QR/NFC currency</span>
                </div>

                <b>→</b>

              </button>


              {/* Scan History */}
              <button
                className="quick-action"
                onClick={() => navigate("/scan-history")}
              >

                <div className="quick-icon history-icon">
                  ◷
                </div>

                <div>
                  <strong>Scan History</strong>
                  <span>View previous verification scans</span>
                </div>

                <b>→</b>

              </button>

            </div>

          </div>

        </section>


        {/* Footer */}
        <footer className="dashboard-footer">
          <span>Anti-Counterfeit System</span>
          <span>Secure Currency Verification Platform</span>
        </footer>

      </main>

    </div>
  );
}

export default Dashboard;