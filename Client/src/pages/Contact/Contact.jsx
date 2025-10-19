import React, { useState } from 'react';
import './contact.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('vitals');
  const [vitals, setVitals] = useState([]);

  // 🩺 Vitals states
  const [bp, setBp] = useState('');
  const [sugar, setSugar] = useState('');
  const [weight, setWeight] = useState('');

  // 🩺 Add vitals
  const handleVitalsSubmit = (e) => {
    e.preventDefault();
    if (!bp && !sugar && !weight) return;

    const newVital = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      bp,
      sugar,
      weight,
      type: 'vital'
    };

    setVitals([newVital, ...vitals]);
    setBp('');
    setSugar('');
    setWeight('');
    setActiveTab('vitals');
  };

  // 🕒 Timeline data (only vitals now)
  const timeline = [...vitals].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 RECORDS</h1>

      {/* 🟢 Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={activeTab === 'vitals' ? 'active' : ''}
          onClick={() => setActiveTab('vitals')}
        >
          🩺 Vitals
        </button>
        <button
          className={activeTab === 'timeline' ? 'active' : ''}
          onClick={() => setActiveTab('timeline')}
        >
          🕒 Timeline View
        </button>
      </div>

      {/* 🩺 Vitals Section */}
      {activeTab === 'vitals' && (
        <div className="vitals-section">
          <h2>🩺 Add Vitals</h2>
          <form className="vitals-form" onSubmit={handleVitalsSubmit}>
            <input
              type="text"
              placeholder="Blood Pressure (e.g. 120/80)"
              value={bp}
              onChange={(e) => setBp(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sugar Level (mg/dL)"
              value={sugar}
              onChange={(e) => setSugar(e.target.value)}
            />
            <input
              type="text"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>

          <h3 className="vitals-subtitle">📝 Recorded Vitals</h3>
          {vitals.length === 0 ? (
            <p className="no-report">No vitals recorded yet</p>
          ) : (
            <div className="vitals-grid">
              {vitals.map((v) => (
                <div key={v.id} className="vital-box">
                  <p>{v.date}</p>
                  <p>BP: {v.bp || '-'}</p>
                  <p>Sugar: {v.sugar || '-'}</p>
                  <p>Weight: {v.weight || '-'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🕒 Timeline Section */}
      {activeTab === 'timeline' && (
        <div className="timeline-section">
          <h2>🕒 Vitals Timeline</h2>
          {timeline.length === 0 ? (
            <p className="no-report">No vitals recorded yet</p>
          ) : (
            <ul className="timeline-list">
              {timeline.map((item) => (
                <li key={item.id} className="timeline-item">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-content">
                    <strong>🩺 Vitals:</strong>
                    <p>BP: {item.bp || '-'}</p>
                    <p>Sugar: {item.sugar || '-'}</p>
                    <p>Weight: {item.weight || '-'}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;