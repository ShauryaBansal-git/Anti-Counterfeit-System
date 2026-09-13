import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();

  return (
    <div className="settings-page">

      {/* Header */}
      <header className="settings-header">

        <div className="settings-brand">
          <div className="brand-logo">AC</div>

          <div>
            <h2>Anti-Counterfeit</h2>
            <span>Admin Portal</span>
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
      <main className="settings-main">

        <div className="settings-intro">
          <p className="settings-label">SYSTEM CONFIGURATION</p>

          <h1>Settings</h1>

          <p>
            Manage your account and application preferences.
          </p>
        </div>


        {/* Profile Settings */}
        <section className="settings-card">

          <div className="settings-card-header">
            <div>
              <h2>Admin Profile</h2>
              <p>View your administrator account information.</p>
            </div>
          </div>

          <div className="profile-grid">

            <div className="setting-field">
              <label>Full Name</label>
              <input
                type="text"
                value="Reserve Bank Admin"
                readOnly
              />
            </div>

            <div className="setting-field">
              <label>Role</label>
              <input
                type="text"
                value="Administrator"
                readOnly
              />
            </div>

            <div className="setting-field">
              <label>Email</label>
              <input
                type="email"
                value="admin@example.com"
                readOnly
              />
            </div>

            <div className="setting-field">
              <label>Account Status</label>
              <input
                type="text"
                value="Active"
                readOnly
              />
            </div>

          </div>

        </section>


        {/* System Settings */}
        <section className="settings-card">

          <div className="settings-card-header">
            <div>
              <h2>System Settings</h2>
              <p>Current configuration of the verification platform.</p>
            </div>
          </div>

          <div className="system-list">

            <div className="system-item">
              <div>
                <strong>Currency Verification</strong>
                <span>Enable authenticity verification</span>
              </div>

              <span className="enabled-badge">
                Enabled
              </span>
            </div>


            <div className="system-item">
              <div>
                <strong>QR/NFC Scanning</strong>
                <span>Scanning interface availability</span>
              </div>

              <span className="enabled-badge">
                Enabled
              </span>
            </div>


            <div className="system-item">
              <div>
                <strong>Blockchain Verification</strong>
                <span>Blockchain integration status</span>
              </div>

              <span className="pending-badge">
                Integration Pending
              </span>
            </div>


            <div className="system-item">
              <div>
                <strong>AI Detection</strong>
                <span>AI-based counterfeit detection</span>
              </div>

              <span className="pending-badge">
                Integration Pending
              </span>
            </div>

          </div>

        </section>


        {/* Security */}
        <section className="settings-card">

          <div className="settings-card-header">
            <div>
              <h2>Security</h2>
              <p>Security features of your administrator account.</p>
            </div>
          </div>

          <div className="security-box">

            <div className="security-icon">
              🔒
            </div>

            <div>
              <strong>Secure Authentication</strong>

              <p>
                Administrator authentication is protected using
                secure login mechanisms.
              </p>
            </div>

          </div>

        </section>


        {/* Footer */}
        <footer className="settings-footer">
          <span>Anti-Counterfeit System</span>
          <span>Secure Currency Verification Platform</span>
        </footer>

      </main>

    </div>
  );
}

export default Settings;