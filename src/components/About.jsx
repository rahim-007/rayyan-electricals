import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: '⚡',
    title: 'ESA C-License Certified',
    desc: 'Government-accredited authority for high-voltage industrial installations & substation execution.',
  },
  {
    icon: '🏗️',
    title: 'Turnkey Project Delivery',
    desc: 'Single-source responsibility from CAD schematics & SLD approvals to charging & handover.',
  },
  {
    icon: '📍',
    title: 'Oragadam Strategic Base',
    desc: 'Rapid 24/7 emergency breakdown mobilization across the Sriperumbudur-Oragadam industrial belt.',
  },
  {
    icon: '🛡️',
    title: 'Zero-Defect Statutory Clearance',
    desc: 'Rigorous pre-commissioning Megger & Hi-Pot testing with 100% CEIG / TNEB safety compliance.',
  },
];

const sectors = [
  'Automotive OEMs',
  'Heavy Commercial Vehicles',
  'Industrial HVAC',
  'Auto Electrical Systems',
  'Process Plants',
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Safe, subtle entrance animations (never leaving elements hidden with opacity: 0)
      gsap.from('.about-header-split', {
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });

      // Stats counter animation (safely animates without getting stuck at 0+)
      const counters = document.querySelectorAll('.about-stat-number[data-target]');
      counters.forEach((el) => {
        const targetVal = parseInt(el.dataset.target, 10);
        if (isNaN(targetVal)) return;
        const suffix = el.dataset.suffix || '';
        const countObj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.to(countObj, {
              val: targetVal,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${Math.round(countObj.val)}${suffix}`;
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="about-inner">
        {/* Top Header Split: Title on Left, Lead Statement on Right */}
        <div className="about-header-split">
          <div className="about-header-left">
            <div className="about-label">
              <span className="golden-line" />
              <span>Who We Are</span>
            </div>
            <h2 className="about-heading">
              ABOUT<br />
              <span className="text-royal">RAYYAN</span>
              <span className="year-accent">Est. April 2023</span>
            </h2>
          </div>

          <div className="about-header-right">
            <p className="about-lead-text">
              Rayyan Electricals and Enterprises is an industrial electrical solutions and services company based in Oragadam Industrial Area, Kancheepuram, Tamil Nadu.
            </p>
            <div className="about-lead-meta">
              <span className="about-meta-tag">
                <span className="meta-tag-dot" />
                Oragadam Industrial Corridor, Sriperumbudur Belt
              </span>
              <span className="about-meta-tag">
                <span className="meta-tag-dot" />
                Turnkey HT / LT Execution Partner
              </span>
            </div>
          </div>
        </div>

        {/* The Exact Horizontal Baseline Divider */}
        <div className="about-divider-line" />

        {/* Main 2-Column Grid starting simultaneously at the line */}
        <div className="about-grid">
          {/* Left Column: Image starting at the line */}
          <div className="about-image-column">
            <div ref={imageRef} className="about-image-wrap">
              <img
                src="/images/about-engineer.webp"
                alt="Rayyan Electricals engineers inspecting industrial electrical panels"
                loading="lazy"
              />
              <div className="about-image-overlay" />
              <div className="about-image-badge">
                <span className="image-badge-dot" />
                <span>FIELD ENGINEERING // ORAGADAM CORRIDOR</span>
              </div>
            </div>
          </div>

          {/* Right Column: Wordings starting at the line */}
          <div className="about-content-column">
            <div className="about-paragraphs">
              <div className="about-paragraph first-line-para">
                <p>
                  Established in April 2023, we provide end-to-end electrical solutions covering designing, supply, installation, testing, commissioning and maintenance for industrial facilities.
                </p>
              </div>

              <div className="about-paragraph">
                <p>
                  With a dedicated team of 20+ electrical professionals and government ESA C-License capability, we support the demanding electrical requirements of manufacturing plants, tier-1 automotive suppliers, and industrial organizations across Tamil Nadu.
                </p>
              </div>

              <div className="about-paragraph">
                <p>
                  Our operational focus is delivering safe, reliable, and professionally executed electrical solutions, while maintaining uncompromising technical discipline, IS/IE compliance, and customer satisfaction throughout every stage of the project lifecycle.
                </p>
              </div>
            </div>

            {/* Core Capability Cards: Always Visible & Filling Space Perfectly */}
            <div className="about-capabilities-grid">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="about-cap-card">
                  <span className="cap-icon">{cap.icon}</span>
                  <div className="cap-content">
                    <h4 className="cap-title">{cap.title}</h4>
                    <p className="cap-desc">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Manufacturing Sectors Strip */}
            <div className="about-sectors-strip">
              <span className="sectors-label">Key Sectors:</span>
              <div className="sectors-tags">
                {sectors.map((sec, i) => (
                  <span key={i} className="sector-tag">{sec}</span>
                ))}
              </div>
            </div>

            {/* Stats row with clean alignment & no broken word wrapping */}
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-number" data-target="20" data-suffix="+">20+</div>
                <div className="about-stat-label">Electrical Professionals</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number stat-c-lic">C-License</div>
                <div className="about-stat-label">Electrical Capability</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number" data-target="6" data-suffix="">6</div>
                <div className="about-stat-label">Service Verticals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
