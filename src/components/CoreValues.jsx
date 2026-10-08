import { useRef, useState } from 'react';
import '../styles/core-values.css';

const values = [
  {
    number: '01',
    title: 'SAFETY',
    desc: 'Uncompromising commitment to zero-harm safety standards across all industrial sites and HT/LT installations.',
    points: [
      '100% adherence to industrial PPE & electrical safety protocols',
      'CEIG statutory safety clearances & certified earthing setups',
      'Daily site hazard assessments and safe energization procedures',
    ],
  },
  {
    number: '02',
    title: 'QUALITY',
    desc: 'We ensure supreme quality in materials, electrical equipment, workmanship, and turnkey project execution.',
    points: [
      'Top-tier switchgear, busducts, and certified HT/LT cables',
      'Strict compliance with IS/IEC manufacturing and plant standards',
      'Multi-stage inspection before final testing and commissioning',
    ],
  },
  {
    number: '03',
    title: 'RELIABILITY',
    desc: 'Delivering robust, dependable electrical systems built for uninterrupted 24/7 manufacturing operations.',
    points: [
      'Heavy-duty infrastructure designed for demanding industrial plants',
      'Planned Preventive Maintenance & emergency AMC response',
      'Zero-interruption power continuity for production assembly lines',
    ],
  },
  {
    number: '04',
    title: 'PROFESSIONALISM',
    desc: 'Follow disciplined project practices, technical rigor, and authorized C-License electrical execution.',
    points: [
      'Authorized C-License capability by Govt. of Tamil Nadu',
      'Dedicated team of 20+ certified electrical professionals',
      'Meticulous technical documentation, schematics & drawings',
    ],
  },
  {
    number: '05',
    title: 'CUSTOMER FOCUS',
    desc: 'We understand and meet specific customer requirements, MNC audit criteria, and operational schedules.',
    points: [
      'Customized electrical engineering for site-specific loads',
      'Turnkey drawing approvals, CEIG liaisoning and testing',
      'Audited execution quality trusted by Fortune 500 automotive plants',
    ],
  },
  {
    number: '06',
    title: 'CONTINUOUS IMPROVEMENT',
    desc: 'Continuously upgrading our technical capabilities, tools, methodologies, and engineering knowledge.',
    points: [
      'Advanced testing apparatus and modern busduct trunking systems',
      'Ongoing skills training for workforce in next-gen EV infrastructure',
      'Adopting energy-efficient industrial lighting and power solutions',
    ],
  },
];

function ValueCard({ val }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle 3D tilt angles (max ~6.5 degrees for tactile precision feel)
      const rotX = ((y - centerY) / centerY) * -6.5;
      const rotY = ((x - centerX) / centerX) * 6.5;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--rot-x', `${rotX.toFixed(2)}deg`);
      card.style.setProperty('--rot-y', `${rotY.toFixed(2)}deg`);
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rot-x', '0deg');
    card.style.setProperty('--rot-y', '0deg');
  };

  return (
    <div className="core-val-card-wrapper">
      <div
        ref={cardRef}
        className={`core-val-card ${isHovered ? 'is-hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Electric Border Arc Follower */}
        <div className="core-val-border-glow" aria-hidden="true" />

        {/* Ambient Card Background & Circuit Lines */}
        <div className="core-val-card-bg" aria-hidden="true">
          <div className="core-val-top-beam" />
          <div className="core-val-circuit-lines" />
          <div className="core-val-spotlight" />
        </div>

        {/* 3D Depth Layer for Content */}
        <div className="core-val-content">
          <div className="core-val-top">
            <div className="core-val-badge-group">
              <span className="core-val-num">{val.number}</span>
              <span className="core-val-subtag">SEC // {val.number}</span>
            </div>
            <div className="core-val-dot-wrapper">
              <span className="core-val-dot-ring" />
              <span className="core-val-dot" />
            </div>
          </div>

          <h3 className="core-val-title">
            {val.title}
          </h3>

          <p className="core-val-desc">{val.desc}</p>

          <ul className="core-val-points">
            {val.points.map((pt, idx) => (
              <li key={idx} className="core-val-point">
                <span className="core-val-spark-bullet" aria-hidden="true">⚡</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CoreValues() {
  const sectionRef = useRef(null);

  const handleSectionMouseMove = (e) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    section.style.setProperty('--sec-mouse-x', `${x}px`);
    section.style.setProperty('--sec-mouse-y', `${y}px`);
  };

  return (
    <section
      id="core-values"
      ref={sectionRef}
      className="core-values-compact"
      onMouseMove={handleSectionMouseMove}
    >
      <div className="core-values-bg-grid" aria-hidden="true" />
      <div className="core-values-compact-inner">
        <div className="core-values-compact-header">
          <div className="vm-label">
            <span className="golden-line" />
            Our Core Principles
          </div>
          <h2 className="vm-main-title">
            CORE <span className="text-golden">VALUES</span>
          </h2>
          <p className="core-values-statement">
            "We ensure quality in materials, workmanship, and execution. We deliver reliable solutions,
            follow disciplined project practices, meet customer requirements, and continuously improve our technical capabilities."
          </p>
        </div>

        <div className="core-values-grid">
          {values.map((val) => (
            <ValueCard key={val.number} val={val} />
          ))}
        </div>
      </div>
    </section>
  );
}
