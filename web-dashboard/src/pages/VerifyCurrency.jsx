import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyCurrency.css";

function VerifyCurrency() {
  const navigate = useNavigate();

  const [currencyId, setCurrencyId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();

    if (!currencyId.trim()) {
      setResult({
        type: "error",
        message: "Please enter a Currency ID.",
      });
      return;
    }

    console.log("Currency Verification:", currencyId);

    setResult({
      type: "success",
      message: "Currency verified successfully!",
      currencyId: currencyId,
    });
  };

  const handleClear = () => {
    setCurrencyId("");
    setResult(null);
  };

  return (
    <div className="verify-page">
      <div className="verify-container">

        {/* Header */}
        <div className="verify-header">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <p className="page-label">CURRENCY VERIFICATION</p>

          <h1>Verify Currency</h1>

          <p className="page-description">
            Verify the authenticity of a currency note using its unique
            identification number.
          </p>

        </div>


        {/* Verification Card */}
        <div className="verify-card">

          <div className="card-title">

            <div className="title-icon">✓</div>

            <div>
              <h2>Currency Verification</h2>

              <p>
                Enter the Currency ID to check its authenticity.
              </p>
            </div>

          </div>


          <form onSubmit={handleVerify}>

            <div className="form-group">

              <label htmlFor="currencyId">
                Currency ID <span>*</span>
              </label>

              <input
                type="text"
                id="currencyId"
                placeholder="Example: IND500123456789"
                value={currencyId}
                onChange={(e) => {
                  setCurrencyId(e.target.value);
                  setResult(null);
                }}
              />

              <small>
                Enter the unique identification number printed on the
                currency note.
              </small>

            </div>


            {/* Result */}
            {result && (
              <div
                className={
                  result.type === "success"
                    ? "verification-result success-result"
                    : "verification-result error-result"
                }
              >

                {result.type === "success" ? (
                  <>
                    <div className="result-icon">✓</div>

                    <div>
                      <h3>Currency Verified</h3>

                      <p>
                        This currency has been successfully verified by the
                        anti-counterfeit system.
                      </p>

                      <div className="result-details">
                        <strong>Status:</strong> REAL
                        <br />
                        <strong>Currency ID:</strong> {result.currencyId}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="result-icon">!</div>

                    <div>
                      <h3>Verification Failed</h3>

                      <p>{result.message}</p>
                    </div>
                  </>
                )}

              </div>
            )}


            {/* Buttons */}
            <div className="form-actions">

              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
              >
                Clear
              </button>

              <button
                type="submit"
                className="verify-button"
              >
                Verify Currency
              </button>

            </div>

          </form>

        </div>


        {/* Security Note */}
        <div className="security-note">

          <span>🔒</span>

          <div>
            <strong>Secure Verification</strong>

            <p>
              Verification results are generated through the secure
              anti-counterfeit verification system.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default VerifyCurrency;