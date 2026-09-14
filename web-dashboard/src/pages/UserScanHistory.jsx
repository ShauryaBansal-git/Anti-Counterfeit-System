import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserScanHistory.css";

function UserScanHistory() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const scanRecords = [
    {
      scanId: "SCN001",
      currencyId: "IND500123456789",
      denomination: "₹500",
      status: "REAL",
      date: "12 Sep 2026",
      time: "10:42 AM",
    },
    {
      scanId: "SCN002",
      currencyId: "IND200987654321",
      denomination: "₹200",
      status: "FAKE",
      date: "12 Sep 2026",
      time: "10:18 AM",
    },
    {
      scanId: "SCN003",
      currencyId: "IND100456789123",
      denomination: "₹100",
      status: "REAL",
      date: "11 Sep 2026",
      time: "04:35 PM",
    },
    {
      scanId: "SCN004",
      currencyId: "IND500789456123",
      denomination: "₹500",
      status: "REAL",
      date: "11 Sep 2026",
      time: "02:21 PM",
    },
    {
      scanId: "SCN005",
      currencyId: "IND200321654987",
      denomination: "₹200",
      status: "FAKE",
      date: "10 Sep 2026",
      time: "11:07 AM",
    },
    {
      scanId: "SCN006",
      currencyId: "IND100852741963",
      denomination: "₹100",
      status: "REAL",
      date: "10 Sep 2026",
      time: "09:45 AM",
    },
  ];

  const filteredRecords = scanRecords.filter((record) => {
    const matchesSearch =
      record.scanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.currencyId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="user-history-page">

      <div className="user-history-container">

        {/* Header */}
        <div className="user-history-header">

          <button
            type="button"
            className="user-history-back-button"
            onClick={() => navigate("/user-dashboard")}
          >
            ← Back to Dashboard
          </button>

          <p className="user-history-label">
            USER VERIFICATION RECORDS
          </p>

          <h1>Scan History</h1>

          <p className="user-history-description">
            View your previous currency verification and scanning records.
          </p>

        </div>


        {/* Summary Cards */}
        <div className="user-history-summary">

          <div className="user-summary-card">
            <div className="user-summary-icon total">
              ⌕
            </div>

            <div>
              <span>Total Scans</span>
              <strong>{scanRecords.length}</strong>
            </div>
          </div>


          <div className="user-summary-card">
            <div className="user-summary-icon real">
              ✓
            </div>

            <div>
              <span>Real Currency</span>
              <strong>
                {
                  scanRecords.filter(
                    (record) => record.status === "REAL"
                  ).length
                }
              </strong>
            </div>
          </div>


          <div className="user-summary-card">
            <div className="user-summary-icon fake">
              !
            </div>

            <div>
              <span>Fake Currency</span>
              <strong>
                {
                  scanRecords.filter(
                    (record) => record.status === "FAKE"
                  ).length
                }
              </strong>
            </div>
          </div>

        </div>


        {/* History Card */}
        <div className="user-history-card">

          <div className="user-history-heading">

            <div>
              <h2>My Verification History</h2>

              <p>
                Search and filter your previous currency scans.
              </p>
            </div>

            <span className="user-record-count">
              {filteredRecords.length} Records
            </span>

          </div>


          {/* Search and Filter */}
          <div className="user-history-controls">

            <div className="user-search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search by Scan ID or Currency ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>


            <select
              className="user-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="REAL">Real</option>
              <option value="FAKE">Fake</option>
            </select>

          </div>


          {/* Table */}
          <div className="user-table-wrapper">

            <table className="user-history-table">

              <thead>
                <tr>
                  <th>Scan ID</th>
                  <th>Currency ID</th>
                  <th>Denomination</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                </tr>
              </thead>

              <tbody>

                {filteredRecords.length > 0 ? (

                  filteredRecords.map((record) => (

                    <tr key={record.scanId}>

                      <td>
                        <strong className="user-scan-id">
                          {record.scanId}
                        </strong>
                      </td>

                      <td>
                        <span className="user-currency-id">
                          {record.currencyId}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {record.denomination}
                        </strong>
                      </td>

                      <td>

                        <span
                          className={
                            record.status === "REAL"
                              ? "user-status-badge user-real-badge"
                              : "user-status-badge user-fake-badge"
                          }
                        >
                          <span className="user-status-dot"></span>
                          {record.status}
                        </span>

                      </td>

                      <td>

                        <div className="user-date-cell">
                          <strong>{record.date}</strong>
                          <span>{record.time}</span>
                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="user-no-results"
                    >

                      <div className="user-no-results-icon">
                        ⌕
                      </div>

                      <strong>No records found</strong>

                      <p>
                        Try changing your search or filter.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* Security Note */}
        <div className="user-security-note">

          <span>🔒</span>

          <div>

            <strong>Secure Scan Records</strong>

            <p>
              Your verification records are securely maintained
              by the anti-counterfeit system.
            </p>

          </div>

        </div>


        {/* Footer */}
        <footer className="user-history-footer">

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

export default UserScanHistory;