import React, { useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSummary, setLastSummary] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('report', selectedFile);

    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        const newReport = {
          name: data.fileName,
          date: new Date().toLocaleString(),
          summary: data.summary
        };
        setReports([newReport, ...reports]);
        setLastSummary(data.summary);
        setActiveTab('summary'); // ✅ auto switch to summary tab after upload
      } else {
        alert(data.error || "AI Scan failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 REPORT</h1>

      {/* 🟢 Navigation Buttons */}
      <div className="tab-buttons">
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          📤 Upload Report
        </button>
        <button
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          📜 My Reports
        </button>
        <button
          className={activeTab === 'summary' ? 'active' : ''}
          onClick={() => setActiveTab('summary')}
        >
          🤖 AI Summary
        </button>
      </div>

      {/* 📤 Upload Section */}
      {activeTab === 'upload' && (
        <div className="upload-box">
          <h2>📎 Upload Medical Report</h2>
          <form onSubmit={handleUpload} className="upload-form">
            <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
            <button type="submit" disabled={loading}>
              {loading ? "⏳ Scanning..." : "Upload & Scan"}
            </button>
          </form>
          {selectedFile && <p className="file-selected">Selected: {selectedFile.name}</p>}
        </div>
      )}

      {/* 📜 Reports Section */}
      {activeTab === 'reports' && (
        <div className="report-history">
          <h2>🧾 Report History</h2>
          {reports.length === 0 ? (
            <p className="no-report">No reports uploaded yet</p>
          ) : (
            <ul className="report-list">
              {reports.map((report, index) => (
                <li key={index} className="report-card">
                  <div className="report-info">
                    <strong>{report.name}</strong>
                    <span>{report.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 🤖 Summary Section */}
      {activeTab === 'summary' && (
        <div className="ai-summary-box">
          <h2>🤖 AI Summary</h2>
          {lastSummary ? (
            <p>{lastSummary}</p>
          ) : (
            <p className="no-report">No summary available yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
