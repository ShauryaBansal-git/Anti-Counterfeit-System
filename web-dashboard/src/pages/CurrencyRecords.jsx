import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CurrencyRecords.css";

function CurrencyRecords() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const currencyRecords = [
    {
      currencyId: "IND500123456789",
      denomination: "₹500",
      serialNumber: "5AB123456",
      registeredBy: "Admin",
      date: "12 Sep 2026",
      status: "ACTIVE",
    },
    {
      currencyId: "IND200987654321",
      denomination: "₹200",
      serialNumber: "7CD987654",
      registeredBy: "Admin",
      date: "12 Sep 2026",
      status: "ACTIVE",
    },
    {
      currencyId: "IND100456789123",
      denomination: "₹100",
      serialNumber: "3EF456789",
      registeredBy: "Admin",
      date: "11 Sep 2026",
      status: "ACTIVE",
    },
    {
      currencyId: "IND500789456123",
      denomination: "₹500",
      serialNumber: "8GH789456",
      registeredBy: "Admin",
      date: "11 Sep 2026",
      status: "ACTIVE",
    },
    {
      currencyId: "IND200321654987",
      denomination: "₹200",
      serialNumber: "2JK321654",
      registeredBy: "Admin",
      date: "10 Sep 2026",
      status: "BLOCKED",
    },
    {
      currencyId: "IND100852741963",
      denomination: "₹100",
      serialNumber: "9LM852741",
      registeredBy: "Admin",
      date: "10 Sep 2026",
      status: "ACTIVE",
    },
  ];

  const filteredRecords = currencyRecords.filter((record) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      record.currencyId.toLowerCase().includes(search) ||
      record.serialNumber.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "ALL" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="records-page">
      <div className="records-container">

        {/* Header */}
        <div className="records-header">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <p className="page-label">CURRENCY DATABASE</p>

          <h1>Currency Records</h1>

          <p className="page-description">
            View and manage registered currency records in the system.
          </p>

        </div>


        {/* Summary Cards */}
        <div className="records-summary">

          <div className="summary-card">
            <div className="summary-icon total-icon">▣</div>

            <div>
              <span>Total Records</span>
              <strong>{currencyRecords.length}</strong>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon active-icon">✓</div>

            <div>
              <span>Active Currency</span>
              <strong>
                {
                  currencyRecords.filter(
                    (record) => record.status === "ACTIVE"
                  ).length
                }
              </strong>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon blocked-icon">!</div>

            <div>
              <span>Blocked Currency</span>
              <strong>
                {
                  currencyRecords.filter(
                    (record) => record.status === "BLOCKED"
                  ).length
                }
              </strong>
            </div>
          </div>

        </div>


        {/* Records Card */}
        <div className="records-card">

          <div className="card-heading">

            <div>
              <h2>Registered Currency</h2>

              <p>
                Search and filter registered currency records.
              </p>
            </div>

            <span className="record-count">
              {filteredRecords.length} Records
            </span>

          </div>


          {/* Search and Filter */}
          <div className="records-controls">

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search by Currency ID or Serial Number..."
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
              <option value="ACTIVE">Active</option>
              <option value="BLOCKED">Blocked</option>
            </select>

          </div>


          {/* Table */}
          <div className="table-wrapper">

            <table className="records-table">

              <thead>
                <tr>
                  <th>Currency ID</th>
                  <th>Denomination</th>
                  <th>Serial Number</th>
                  <th>Registered By</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.currencyId}>

                      <td>
                        <strong className="currency-id">
                          {record.currencyId}
                        </strong>
                      </td>

                      <td>
                        <strong>{record.denomination}</strong>
                      </td>

                      <td>
                        <span className="serial-number">
                          {record.serialNumber}
                        </span>
                      </td>

                      <td>{record.registeredBy}</td>

                      <td>
                        <span className="record-date">
                          {record.date}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            record.status === "ACTIVE"
                              ? "status-badge active-badge"
                              : "status-badge blocked-badge"
                          }
                        >
                          <span className="status-dot"></span>
                          {record.status}
                        </span>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">

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
            <strong>Secure Currency Records</strong>

            <p>
              Registered currency information is securely maintained by
              the anti-counterfeit system.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CurrencyRecords;