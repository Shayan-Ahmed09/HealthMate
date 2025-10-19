import React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router';   // 👈 for navigation
import './home.CSS';

const Home = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/about');
  };

  // ⬇️ Learn More Button — scroll to how-it-works section
  const handleLearnMore = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo">
            <AdbIcon className="logo-icon" />
            <h1 className="app-title">HealthMate</h1>
          </div>
          <h2 className="hero-title">Sehat ka Smart Dost</h2>
          <p className="hero-subtitle">
            AI-powered personal health companion jo aapki medical reports ko simple words mein samjhata hai
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>📄 Report Upload</h3>
              <p>PDF aur image reports directly upload karein</p>
            </div>
            
            <div className="feature-card">
              <h3>🤖 AI Summary</h3>
              <p>Gemini AI reports ko English aur Urdu mein explain karega</p>
            </div>
            
            <div className="feature-card">
              <h3>📊 Vitals Track</h3>
              <p>BP, Sugar, Weight manually add kar ke track karein</p>
            </div>
          </div>

          <div className="cta-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>Kaise Kaam Karta Hai?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Report Upload Karein</h3>
            <p>Apni lab reports, prescriptions ya medical documents upload karein</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Gemini AI aapki reports padhega aur simple explanation dega</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Summary Milega</h3>
            <p>Bilingual summary, doctor questions aur health tips milegi</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
