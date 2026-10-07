import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdVerified, MdSecurity, MdEngineering, MdCheckCircle } from 'react-icons/md';
import '../styles/customers.css';

gsap.registerPlugin(ScrollTrigger);

const customers = [
  {
    id: 'daimler',
    name: 'DAIMLER',
    legalName: 'Daimler India Commercial Vehicles',
    logo: '/images/customers/daimler-hq.png',
    sector: 'Commercial Vehicles & Trucks',
    tag: 'Automotive OEM',
    scope: 'Turnkey HT/LT substation electrification, plant power distribution & automation cabling.',
  },
  {
    id: 'bharatbenz',
    name: 'BHARATBENZ',
    legalName: 'BharatBenz Commercial Vehicles',
    logo: '/images/customers/bharatbenz-hq.png',
    sector: 'Heavy Trucks & Buses',
    tag: 'Heavy Automotive',
    scope: 'Assembly shop-floor HT power distribution, transformer testing and breaker maintenance.',
  },
  {
    id: 'bluestar',
    name: 'BLUE STAR',
    legalName: 'Blue Star Limited',
    logo: '/images/customers/bluestar-hq.png',
    sector: 'Industrial HVAC & Cooling',
    tag: 'HVAC Leader',
    scope: 'Industrial chiller electrification, Motor Control Centers (MCC) & control distribution.',
  },
  {
    id: 'lucas-tvs',
    name: 'LUCAS TVS',
    legalName: 'Lucas TVS Limited',
    logo: '/images/customers/lucas-tvs-hq.png',
    sector: 'Auto Electrical Systems',
    tag: 'Auto Electrical',
    scope: 'Manufacturing shop-floor power networks, transformer maintenance & switchgear installation.',
  },
  {
    id: 'danfoss',
    name: 'DANFOSS',
    legalName: 'Danfoss Industries',
    logo: '/images/customers/danfoss-hq.png',
    sector: 'Power & Climate Tech',
    tag: 'Power Electronics',
    scope: 'Variable Frequency Drive integration, precision cleanroom power & industrial cabling.',
  },
  {
    id: 'montra-tivolt',
    name: 'MONTRA ELECTRIC / TIVOLT',
    legalName: 'Montra Electric & Tivolt (Murugappa Group)',
    logo: '/images/customers/montra-tivolt-hq.png',
    sector: 'EV & Clean Mobility',
    tag: 'Clean Mobility',
    scope: 'EV manufacturing assembly lines, battery testing bay power busways & charging panels.',
  },
  {
    id: 'hyundai-kefico',
    name: 'HYUNDAI KEFICO',
    legalName: 'Hyundai Kefico Automotive Systems',
    logo: '/images/customers/hyundai-kefico-hq.png',
    sector: 'Automotive Electronics',
    tag: 'Precision Powertrain',
    scope: 'High-precision electronics shopfloor power, clean grounding and LT distribution boards.',
  },
];

const credentials = [
  {
    icon: <MdVerified />,
    title: 'C-License Certified',
    desc: 'Authorized by Electrical Licensing Board, Govt. of Tamil Nadu',
  },
  {
    icon: <MdSecurity />,
    title: 'Zero-Harm Safety',
    desc: '100% adherence to industrial PPE & electrical safety protocols',
  },
  {
    icon: <MdEngineering />,
    title: 'CEIG Clearance',
    desc: 'Turnkey drawing approvals & safety certifications for HT/LT sites',
  },
  {
    icon: <MdCheckCircle />,
    title: 'MNC Standards',
    desc: 'Audited execution quality trusted by Fortune 500 automotive plants',
  },
];

export default function Customers() {
  const sectionRef = useRef(null);

  return (
    <section id="customers" ref={sectionRef} className="customers">
      <div className="customers-inner">
        {/* Compact Two-Column Section Header */}
        <div className="customers-header">
          <div className="customers-header-left">
            <div className="customers-label">
              <span className="golden-line" />
              Clientele & Industrial Footprint
            </div>
            <h2 className="customers-title">
              TRUSTED BY <span className="customers-title-highlight">INDUSTRY LEADERS</span>
            </h2>
          </div>
          <div className="customers-header-right">
            <p className="customers-sub">
              Rayyan Electricals and Enterprises is proud to deliver safe, reliable and professionally executed
              HT/LT electrical solutions, turnkey substation engineering, and maintenance support for global automotive
              OEMs and MNC manufacturing plants across Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Big, High-Impact Featured Customer Cards Grid */}
        <div className="customers-featured-grid">
          {customers.map((cust) => (
            <div key={cust.id} className="customer-card-premium">
              <div className="customer-card-top">
                <span className="customer-tag-pill">{cust.tag}</span>
                <span className="customer-partner-badge" title="Verified Client Partner">
                  <MdVerified /> Verified Partner
                </span>
              </div>

              <div className="customer-logo-box">
                <img
                  src={cust.logo}
                  alt={`${cust.name} Official Logo`}
                  className="customer-logo-img"
                  loading="lazy"
                />
              </div>

              <div className="customer-card-body">
                <h3 className="customer-card-title">{cust.name}</h3>
                <span className="customer-card-sector">{cust.sector}</span>
                <p className="customer-card-scope">{cust.scope}</p>
              </div>

              <div className="customer-card-footer">
                <span className="customer-legal-name">{cust.legalName}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Industrial Credibility & Compliance Strip */}
        <div className="credentials-grid">
          {credentials.map((cred) => (
            <div key={cred.title} className="credential-item">
              <div className="credential-icon">{cred.icon}</div>
              <div className="credential-content">
                <h4 className="credential-title">{cred.title}</h4>
                <p className="credential-desc">{cred.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
