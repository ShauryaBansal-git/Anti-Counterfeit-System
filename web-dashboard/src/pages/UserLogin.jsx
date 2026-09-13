import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    console.log("User Login:", {
      email,
      password,
    });

    alert("User login successful!");

    navigate("/user-dashboard");
  };

  return (
    <div className="user-login-page">

      {/* Left Section */}
      <div className="user-login-left">

        <div className="user-logo">
          AC
        </div>

        <h1>Anti-Counterfeit</h1>

        <p>
          Secure Currency Verification Platform
        </p>

        <div className="user-login-info">
          <span>✓</span>
          Verify currency authenticity
        </div>

        <div className="user-login-info">
          <span>✓</span>
          Scan QR/NFC currency
        </div>

        <div className="user-login-info">
          <span>✓</span>
          View verification history
        </div>

      </div>


      {/* Right Section */}
      <div className="user-login-right">

        <div className="user-login-card">

          <p className="user-login-label">
            USER PORTAL
          </p>

          <h2>Welcome Back</h2>

          <p className="user-login-subtitle">
            Login to verify your currency securely.
          </p>


          <form onSubmit={handleLogin}>

            <div className="user-form-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>


            <div className="user-form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>


            <button
              type="submit"
              className="user-login-button"
            >
              Login
            </button>

          </form>


          <div className="user-login-footer">

            <span>Admin?</span>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Admin Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserLogin;