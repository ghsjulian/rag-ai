import "../styles/splash.css";

const Splash = () => {
  return (
    <div className="splash-screen">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <div className="splash-card">
        <div className="logo-container">
          <div className="radar-ring"></div>
          <div className="pulse-ring"></div>
          <img
            src="/icons/favicon-2.png"
            alt="RAG AI Logo"
            className="logo-image"
          />

          {/* <svg
            className="ai-avatar-svg"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--cyan)"
              strokeWidth="2"
              opacity="0.8"
            />
            <circle cx="20" cy="30" r="3" fill="var(--cyan)" />
            <circle cx="80" cy="30" r="3" fill="var(--cyan)" />
            <line
              x1="20"
              y1="30"
              x2="35"
              y2="40"
              stroke="var(--cyan)"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="80"
              y1="30"
              x2="65"
              y2="40"
              stroke="var(--cyan)"
              strokeWidth="1"
              opacity="0.5"
            />
            <path
              d="M50 22 C36 22 28 32 28 46 C28 58 35 68 44 74 L44 80 L56 80 L56 74 C65 68 72 58 72 46 C72 32 64 22 50 22 Z"
              stroke="var(--cyan)"
              strokeWidth="2.5"
              fill="none"
              stroke-linecap="round"
            />
            <path
              d="M32 38 C38 28 50 26 68 38"
              stroke="var(--cyan)"
              strokeWidth="2"
              stroke-linecap="round"
            />
            <path
              d="M36 48 Q50 44 64 48"
              stroke="var(--cyan)"
              strokeWidth="3"
              stroke-linecap="round"
            />
            <circle cx="50" cy="32" r="2.5" fill="var(--cyan)" />
          </svg> */}
        </div>

        <h1 className="brand-title">RAG AI</h1>
        <p className="brand-subtitle">Knowledge Retrieval System</p>

        <div className="progress-wrapper">
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>
        </div>

        <div className="status-text">
          <span className="status-dott"></span>
          <span>Indexing Vector Store...</span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
