import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login attempted:", {
      email,
      password,
    });

    alert("Login successful!");

    navigate("/dashboard");
  };

  return (
    <div className="app">

      {/* Left Section */}
      <div className="login-left">

        <div className="brand">
          <div className="brand-icon">✓</div>
          <span>Anti-Counterfeit</span>
        </div>

        <div className="hero-content">

          <p className="small-heading">
            SECURE CURRENCY VERIFICATION
          </p>

          <h1>
            Protecting currency.
            <br />
            <span>Building trust.</span>
          </h1>

          <p className="hero-description">
            A secure platform for authenticating currency and detecting
            counterfeit notes using modern digital technology.
          </p>

          <div className="security-points">

            <div className="security-item">
              <div className="point-icon">✓</div>

              <div>
                <strong>Secure Verification</strong>
                <p>
                  Verify currency authenticity with confidence.
                </p>
              </div>
            </div>

            <div className="security-item">
              <div className="point-icon">✓</div>

              <div>
                <strong>Trusted Records</strong>
                <p>
                  Maintain reliable currency verification records.
                </p>
              </div>
            </div>

            <div className="security-item">
              <div className="point-icon">✓</div>

              <div>
                <strong>Real-Time Monitoring</strong>
                <p>
                  Monitor verification activity from one dashboard.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="left-footer">
          © 2026 Anti-Counterfeit System
        </div>

      </div>


      {/* Right Section */}
      <div className="login-right">

        <div className="login-card">

          <div className="mobile-brand">
            <div className="brand-icon">✓</div>
            <span>Anti-Counterfeit</span>
          </div>

          <div className="login-header">

            <p className="welcome-text">
              WELCOME BACK
            </p>

            <h2>
              Admin Login
            </h2>

            <p>
              Sign in to access the currency verification dashboard.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    alert(
                      "Password recovery will be connected later."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            <button
              type="submit"
              className="login-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>


          <div className="login-security">
            <span>🔒</span>

            <p>
              Your connection is secure and protected.
            </p>
          </div>

        </div>


        <div className="right-footer">
          <span>Secure Authentication</span>
          <span>•</span>
          <span>Admin Portal</span>
        </div>

      </div>

    </div>
  );
}

export default Login;