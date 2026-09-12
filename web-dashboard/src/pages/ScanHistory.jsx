import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScanHistory.css";

function ScanHistory() {
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
    <div className="history-page">
      <div className="history-container">

        {/* Header */}
        <div className="history-header">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <p className="page-label">VERIFICATION RECORDS</p>

          <h1>Scan History</h1>

          <p className="page-description">
            View and manage previous currency verification records.
          </p>

        </div>


        {/* Summary Cards */}
        <div className="history-summary">

          <div className="summary-card">
            <div className="summary-icon total-icon">⌕</div>

            <div>
              <span>Total Scans</span>
              <strong>{scanRecords.length}</strong>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon real-icon">✓</div>

            <div>
              <span>Real Currency</span>
              <strong>
                {scanRecords.filter((record) => record.status === "REAL").length}
              </strong>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon fake-icon">!</div>

            <div>
              <span>Suspicious</span>
              <strong>
                {scanRecords.filter((record) => record.status === "FAKE").length}
              </strong>
            </div>
          </div>

        </div>


        {/* History Card */}
        <div className="history-card">

          <div className="card-heading">

            <div>
              <h2>Verification History</h2>

              <p>
                Search and filter previously scanned currency records.
              </p>
            </div>

            <span className="record-count">
              {filteredRecords.length} Records
            </span>

          </div>


          {/* Search and Filter */}
          <div className="history-controls">

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search by Scan ID or Currency ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>


            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="REAL">Real</option>
              <option value="FAKE">Fake</option>
            </select>

          </div>


          {/* Table */}
          <div className="table-wrapper">

            <table className="history-table">

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
                        <strong className="scan-id">
                          {record.scanId}
                        </strong>
                      </td>

                      <td>
                        <span className="currency-id">
                          {record.currencyId}
                        </span>
                      </td>

                      <td>
                        <strong>{record.denomination}</strong>
                      </td>

                      <td>
                        <span
                          className={
                            record.status === "REAL"
                              ? "status-badge real-badge"
                              : "status-badge fake-badge"
                          }
                        >
                          <span className="status-dot"></span>
                          {record.status}
                        </span>
                      </td>

                      <td>
                        <div className="date-cell">
                          <strong>{record.date}</strong>
                          <span>{record.time}</span>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      <div className="no-results-icon">⌕</div>

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
        <div className="security-note">

          <span>🔒</span>

          <div>
            <strong>Secure Scan Records</strong>

            <p>
              All verification records are securely maintained by the
              anti-counterfeit system.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ScanHistory;