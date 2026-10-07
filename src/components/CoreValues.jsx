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

export default function CoreValues() {
  return (
    <section id="core-values" className="core-values-compact">
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
            <div key={val.number} className="core-val-card">
              <div>
                <div className="core-val-top">
                  <span className="core-val-num">{val.number}</span>
                  <span className="core-val-dot" />
                </div>
                <h3 className="core-val-title" style={{ marginTop: '12px', marginBottom: '8px' }}>
                  {val.title}
                </h3>
                <p className="core-val-desc">{val.desc}</p>
                <ul className="core-val-points">
                  {val.points.map((pt, idx) => (
                    <li key={idx} className="core-val-point">
                      <span>•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
