import { MdVisibility, MdFlag, MdCheckCircle } from 'react-icons/md';
import '../styles/vision-mission.css';

export default function VisionMission() {
  return (
    <section id="vision-mission" className="vision-mission-compact">
      <div className="vm-compact-inner">
        <div className="vm-header">
          <div className="vm-label">
            <span className="golden-line" />
            Corporate Direction & Principles
          </div>
          <h2 className="vm-main-title">
            VISION <span className="text-golden">&</span> MISSION
          </h2>
        </div>

        <div className="vm-dual-grid">
          {/* Vision Card */}
          <div className="vm-card vm-card-vision">
            <div>
              <div className="vm-card-badge">
                <MdVisibility className="vm-card-icon" />
                <span>Our Vision</span>
              </div>
              <h3 className="vm-card-heading" style={{ marginTop: '16px', marginBottom: '16px' }}>
                Trusted Industrial <br />
                <span className="text-golden">Engineering Partner</span>
              </h3>
              <p className="vm-card-text">
                "To be a trusted electrical engineering and service partner for industries by delivering safe, reliable and efficient electrical solutions."
              </p>

              {/* Detailed Scope Bullets from PDF */}
              <ul className="vm-pillars-list" style={{ marginTop: '20px' }}>
                <li className="vm-pillar-item">
                  <MdCheckCircle className="vm-pillar-bullet" />
                  <span><strong>Safe & Efficient Systems:</strong> Engineered to the highest statutory safety benchmarks for industrial and manufacturing plants.</span>
                </li>
                <li className="vm-pillar-item">
                  <MdCheckCircle className="vm-pillar-bullet" />
                  <span><strong>High Operational Reliability:</strong> Preventing downtime in demanding Tier-1 automotive and industrial facilities across Tamil Nadu.</span>
                </li>
                <li className="vm-pillar-item">
                  <MdCheckCircle className="vm-pillar-bullet" />
                  <span><strong>Long-Term Partnership:</strong> Supporting multinational clients with ongoing technical discipline and dedicated lifecycle management.</span>
                </li>
              </ul>
            </div>

            <div className="vm-card-footer">
              <span className="vm-card-tag">Safe • Reliable • Efficient • Industrial Partner</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="vm-card vm-card-mission">
            <div>
              <div className="vm-card-badge">
                <MdFlag className="vm-card-icon" />
                <span>Our Mission</span>
              </div>
              <h3 className="vm-card-heading" style={{ marginTop: '16px', marginBottom: '16px' }}>
                End-To-End Execution <br />
                <span className="text-golden">& Sound Engineering</span>
              </h3>
              <p className="vm-card-text">
                "To deliver end-to-end electrical solutions through skilled manpower, sound engineering practices, quality materials and professional project execution."
              </p>

              {/* Detailed 4 Execution Pillars from PDF */}
              <ul className="vm-pillars-list" style={{ marginTop: '20px' }}>
                <li className="vm-pillar-item">
                  <MdCheckCircle className="vm-pillar-bullet" />
                  <span><strong>Skilled Manpower:</strong> Dedicated team of 20+ certified electrical professionals and supervisory personnel.</span>
                </li>
                <li className="vm-pillar-item">
                  <MdCheckCircle className="vm-pillar-bullet" />
                  <span><strong>Sound Engineering Practices:</strong> Full statutory compliance, CEIG drawing clearances, and Tamil Nadu C-License scope.</span>
                </li>
                <li className="vm-pillar-item">
                  <MdCheckCircle className="vm-pillar-bullet" />
                  <span><strong>Quality Materials:</strong> Premium switchgear, certified cable infrastructure, sandwich busducts, and testing apparatus.</span>
                </li>
                <li className="vm-pillar-item">
                  <MdCheckCircle className="vm-pillar-bullet" />
                  <span><strong>Professional Execution:</strong> Turnkey design, supply, installation, testing, commissioning, and planned AMC.</span>
                </li>
              </ul>
            </div>

            <div className="vm-card-footer">
              <span className="vm-card-tag">Skilled Manpower • Sound Engineering • Quality Materials • Turnkey Execution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
