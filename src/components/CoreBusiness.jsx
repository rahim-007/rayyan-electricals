import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/services.css';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: '01',
    title: 'DESIGNING',
    desc: 'Comprehensive electrical system design, engineering schematics and project planning based on industrial site and operational requirements.',
    deliverables: ['Load Calculation', 'Single Line Diagrams (SLD)', 'Substation Layout', 'CEIG Approvals'],
    image: '/images/design-engineering.webp',
    imageAlt: 'Electrical engineer working on industrial design',
  },
  {
    number: '02',
    title: 'SUPPLYING',
    desc: 'Direct procurement and supply of certified HT/LT electrical equipment, transformers, switchgear, and infrastructure materials.',
    deliverables: ['HT & LT Panels', 'Distribution Transformers', 'Heavy Cable Trays', 'Sandwich Busducts'],
    image: '/images/supply-equipment.webp',
    imageAlt: 'Industrial electrical equipment prepared for supply',
  },
  {
    number: '03',
    title: 'INSTALLATION',
    desc: 'Turnkey on-site execution, precision cable tray routing, panel erection, and factory electrification adhering to Indian Electricity Rules.',
    deliverables: ['HT/LT Cable Laying', 'Substation Erection', 'Earth Pit Grid Matrix', 'Factory Lighting'],
    image: '/images/installation-cable.webp',
    imageAlt: 'Technicians installing cable trays in industrial facility',
  },
  {
    number: '04',
    title: 'TESTING',
    desc: 'Rigorous pre-commissioning testing, insulation resistance, relay calibration, and safety compliance audits using calibrated test instruments.',
    deliverables: ['Insulation Resistance (Megger)', 'Relay Secondary Injection', 'Hi-Pot Breakdown Test', 'Earth Resistance Test'],
    image: '/images/testing-electrical.webp',
    imageAlt: 'Engineer performing electrical testing',
  },
  {
    number: '05',
    title: 'COMMISSIONING',
    desc: 'Formal CEIG inspection facilitation, synchronised system charging, trial runs, and operational handover with statutory compliance documentation.',
    deliverables: ['CEIG / TNEB Clearance', 'Zero-Defect Charging', 'Load Distribution Trials', 'As-Built Drawings'],
    image: '/images/commissioning.webp',
    imageAlt: 'Engineers performing commissioning checks',
  },
  {
    number: '06',
    title: 'AMC & MAINTENANCE',
    desc: '24/7 round-the-clock emergency breakdown response, periodic preventive maintenance, and thermal imaging audits for continuous plant uptime.',
    deliverables: ['24/7 Breakdown Dispatch', 'Periodic PM Schedules', 'Thermographic Audits', 'Statutory Annual Audit'],
    image: '/images/maintenance-amc.webp',
    imageAlt: 'Technicians performing planned maintenance',
  },
];

export default function CoreBusiness() {
  const sectionRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef([]);
  const currentImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from('.core-business-main-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.core-business-main-title',
          start: 'top 80%',
        },
      });

      // Stage triggers
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveStage(i),
          onEnterBack: () => setActiveStage(i),
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate image on stage change (Option 2: Precision Architectural CAD Shutter to Reality)
  useEffect(() => {
    if (currentImageRef.current) {
      const el = currentImageRef.current;
      const img = el.querySelector('img');
      const counter = el.querySelector('.stage-counter');
      const blade = el.querySelector('.stage-shutter-blade');

      const tl = gsap.timeline();

      // 1. Precision geometric shutter wipe with scale pull
      tl.fromTo(
        el,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.72,
          ease: 'power3.inOut',
        }
      );

      if (img) {
        tl.fromTo(
          img,
          { scale: 1.12, filter: 'contrast(1.05) brightness(1.08)' },
          { scale: 1.0, filter: 'contrast(1) brightness(1)', duration: 0.85, ease: 'power2.out' },
          '<'
        );
      }

      // 2. CAD Laser Shutter Blade Line sweeping down the cutting edge
      if (blade) {
        tl.fromTo(
          blade,
          { top: '0%', opacity: 1 },
          { top: '100%', opacity: 1, duration: 0.72, ease: 'power3.inOut', onComplete: () => gsap.set(blade, { opacity: 0 }) },
          '<'
        );
      }

      // 3. Precision compass dial rotation on the stage counter
      if (counter) {
        tl.fromTo(
          counter,
          { rotate: -25, scale: 0.85, opacity: 0, y: 15 },
          { rotate: 0, scale: 1, opacity: 0.08, y: 0, duration: 0.8, ease: 'power3.out' },
          '<'
        );
      }

      // 4. Staggered reveal of description text and deliverables chips for active stage
      gsap.fromTo(
        '.core-stage.active .core-stage-desc',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [activeStage]);

  const addToStageRefs = (el) => {
    if (el && !stageRefs.current.includes(el)) {
      stageRefs.current.push(el);
    }
  };

  const handleStageClick = (index) => {
    setActiveStage(index);
  };

  return (
    <section id="core-business" ref={sectionRef} className="core-business">
      <div className="core-business-inner">
        <div className="core-business-top">
          <div className="core-business-tagline">
            <span className="core-tagline-dot" />
            <span>Industrial Turnkey Execution — Full Lifecycle Scope</span>
          </div>
          <h2 className="core-business-main-title">
            COMPLETE ELECTRICAL PROJECT <span className="lifecycle-accent">LIFECYCLE</span>
          </h2>
        </div>

        <div className="core-business-layout">
          {/* Left sticky */}
          <div className="core-business-sticky">
            <div
              key={activeStage}
              ref={currentImageRef}
              className="stage-image-wrap"
            >
              <div className="stage-shutter-blade" aria-hidden="true" />
              <img
                src={stages[activeStage].image}
                alt={stages[activeStage].imageAlt}
                loading="lazy"
              />
              <span className="stage-counter">{stages[activeStage].number}</span>

              {/* CAD Technical Telemetry Badge */}
              <div className="stage-cad-badge">
                <span className="stage-cad-dot" />
                <span>PHASE {stages[activeStage].number} // {stages[activeStage].title}</span>
              </div>
            </div>
          </div>

          {/* Right stages */}
          <div className="core-stages">
            {stages.map((stage, i) => (
              <div
                key={stage.number}
                ref={addToStageRefs}
                onClick={() => handleStageClick(i)}
                className={`core-stage ${activeStage === i ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                aria-expanded={activeStage === i}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStageClick(i);
                  }
                }}
              >
                <div className="core-stage-header">
                  <span className="core-stage-number">{stage.number}</span>
                  <h3 className="core-stage-title">
                    {stage.title}
                    {activeStage === i && (
                      <span className="core-stage-active-badge">● ACTIVE</span>
                    )}
                  </h3>
                </div>
                <div className="core-stage-desc">
                  <p>{stage.desc}</p>
                  {/* Technical Deliverables Scope Chips */}
                  {stage.deliverables && (
                    <div className="stage-deliverables">
                      {stage.deliverables.map((item, idx) => (
                        <span key={idx} className="stage-deliverable-chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
