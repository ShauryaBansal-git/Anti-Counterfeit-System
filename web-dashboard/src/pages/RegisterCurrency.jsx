import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterCurrency.css";

function RegisterCurrency() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currencyId: "",
    denomination: "",
    issueDate: "",
    batchNo: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove previous message when user starts editing
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.currencyId ||
      !formData.denomination ||
      !formData.issueDate ||
      !formData.batchNo
    ) {
      setMessage("Please fill all the fields.");
      return;
    }

    console.log("Currency Registration Data:", formData);

    setMessage("Currency registered successfully!");

    setFormData({
      currencyId: "",
      denomination: "",
      issueDate: "",
      batchNo: "",
    });
  };

  const handleClear = () => {
    setFormData({
      currencyId: "",
      denomination: "",
      issueDate: "",
      batchNo: "",
    });

    setMessage("");
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* Header */}
        <div className="register-header">

          {/* Back to Dashboard */}
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div>
            <p className="page-label">CURRENCY MANAGEMENT</p>

            <h1>Register Currency</h1>

            <p className="page-description">
              Register a new currency note in the anti-counterfeit system.
            </p>
          </div>

        </div>


        {/* Form Card */}
        <div className="register-card">

          <div className="card-title">

            <div className="title-icon">₹</div>

            <div>
              <h2>Currency Details</h2>

              <p>
                Enter the details of the currency note you want to register.
              </p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            {/* Currency ID */}
            <div className="form-group">

              <label htmlFor="currencyId">
                Currency ID <span>*</span>
              </label>

              <input
                type="text"
                id="currencyId"
                name="currencyId"
                placeholder="Example: IND500123456789"
                value={formData.currencyId}
                onChange={handleChange}
              />

              <small>
                Enter the unique identification number of the currency.
              </small>

            </div>


            {/* Denomination */}
            <div className="form-group">

              <label htmlFor="denomination">
                Denomination <span>*</span>
              </label>

              <select
                id="denomination"
                name="denomination"
                value={formData.denomination}
                onChange={handleChange}
              >
                <option value="">Select denomination</option>
                <option value="10">₹10</option>
                <option value="20">₹20</option>
                <option value="50">₹50</option>
                <option value="100">₹100</option>
                <option value="200">₹200</option>
                <option value="500">₹500</option>
                <option value="2000">₹2000</option>
              </select>

            </div>


            {/* Issue Date */}
            <div className="form-group">

              <label htmlFor="issueDate">
                Issue Date <span>*</span>
              </label>

              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
              />

            </div>


            {/* Batch Number */}
            <div className="form-group">

              <label htmlFor="batchNo">
                Batch Number <span>*</span>
              </label>

              <input
                type="text"
                id="batchNo"
                name="batchNo"
                placeholder="Example: BATCH-101"
                value={formData.batchNo}
                onChange={handleChange}
              />

            </div>


            {/* Message */}
            {message && (
              <div
                className={
                  message.includes("successfully")
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </div>
            )}


            {/* Buttons */}
            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={handleClear}
              >
                Clear
              </button>

              <button
                type="submit"
                className="register-button"
              >
                Register Currency
              </button>

            </div>

          </form>

        </div>


        {/* Security Note */}
        <div className="security-note">

          <span>🔒</span>

          <div>

            <strong>Secure Registration</strong>

            <p>
              Currency information will be securely processed and stored in
              the anti-counterfeit system.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default RegisterCurrency;