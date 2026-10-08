import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/services.css';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: '01',
    title: 'DESIGNING',
    subtitle: 'System Schematics & Engineering',
    desc: 'Comprehensive electrical system design, engineering schematics, and load planning adhering to IS / CEIG statutory standards and industrial operational demands.',
    deliverables: ['Load Calculation', 'Single Line Diagrams (SLD)', 'Substation Layout', 'CEIG Approvals'],
    image: '/images/design-engineering.webp',
    imageAlt: 'Electrical engineer working on industrial design',
    accentColor: '#00D2FF',
  },
  {
    number: '02',
    title: 'SUPPLYING',
    subtitle: 'HT/LT Equipment Procurement',
    desc: 'Direct procurement and supply of certified HT/LT electrical equipment, transformers, switchgear, and class-leading infrastructure materials.',
    deliverables: ['HT & LT Panels', 'Distribution Transformers', 'Heavy Cable Trays', 'Sandwich Busducts'],
    image: '/images/supply-equipment.webp',
    imageAlt: 'Industrial electrical equipment prepared for supply',
    accentColor: '#0066FF',
  },
  {
    number: '03',
    title: 'INSTALLATION',
    subtitle: 'Turnkey On-Site Electrification',
    desc: 'Turnkey on-site execution, precision cable tray routing, panel erection, and factory electrification adhering strictly to Indian Electricity Rules.',
    deliverables: ['HT/LT Cable Laying', 'Substation Erection', 'Earth Pit Grid Matrix', 'Factory Lighting'],
    image: '/images/installation-cable.webp',
    imageAlt: 'Technicians installing cable trays in industrial facility',
    accentColor: '#38BDF8',
  },
  {
    number: '04',
    title: 'TESTING',
    subtitle: 'Pre-Commissioning Quality & Safety',
    desc: 'Rigorous pre-commissioning testing, insulation resistance, relay calibration, and safety compliance audits using calibrated test instruments.',
    deliverables: ['Insulation Resistance (Megger)', 'Relay Secondary Injection', 'Hi-Pot Breakdown Test', 'Earth Resistance Test'],
    image: '/images/testing-electrical.webp',
    imageAlt: 'Engineer performing electrical testing',
    accentColor: '#F59E0B',
  },
  {
    number: '05',
    title: 'COMMISSIONING',
    subtitle: 'Statutory Clearance & Charging',
    desc: 'Formal CEIG inspection facilitation, synchronised system charging, trial runs, and operational handover with complete statutory documentation.',
    deliverables: ['CEIG / TNEB Clearance', 'Zero-Defect Charging', 'Load Distribution Trials', 'As-Built Drawings'],
    image: '/images/commissioning.webp',
    imageAlt: 'Engineers performing commissioning checks',
    accentColor: '#10B981',
  },
  {
    number: '06',
    title: 'AMC & MAINTENANCE',
    subtitle: '24/7 Breakdown & Preventive Care',
    desc: '24/7 round-the-clock emergency breakdown response, periodic preventive maintenance, and thermal imaging audits ensuring continuous plant uptime.',
    deliverables: ['24/7 Breakdown Dispatch', 'Periodic PM Schedules', 'Thermographic Audits', 'Statutory Annual Audit'],
    image: '/images/maintenance-amc.webp',
    imageAlt: 'Technicians performing planned maintenance',
    accentColor: '#818CF8',
  },
];

export default function CoreBusiness() {
  const sectionRef = useRef(null);
  const stageAreaRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollTriggerRef = useRef(null);
  const tweenRef = useRef(null);
  const progressObjRef = useRef({ value: 0 });
  const [activeStage, setActiveStage] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const currentProgressRef = useRef(0);
  const dragRef = useRef({ isDragging: false, startX: 0, startScroll: 0, hasMoved: false, lastX: 0, velocity: 0 });

  // Compute and apply continuous 3D transforms to cards without clipping or discrete jumps
  const apply3DTransforms = useCallback((progressFloat) => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const xSpacing = isMobile ? Math.min(270, window.innerWidth * 0.72) : isTablet ? 320 : 380;
    const zSpacing = isMobile ? 140 : 185;
    const maxRotate = isMobile ? 32 : 40;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const diff = i - progressFloat;
      const absDiff = Math.abs(diff);

      // Smooth cutoff without popping: hide only when far out of view
      if (absDiff > 3.0) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.visibility = 'hidden';
        card.classList.remove('lc-active');
        return;
      }

      card.style.visibility = 'visible';

      // Horizontal position along carousel arc
      const translateX = diff * xSpacing;

      // Smooth depth progression (active card is forward at 0, others gently curve backward)
      const translateZ = -Math.pow(absDiff, 1.18) * zSpacing;

      // Smooth continuous Y rotation: sine curve has 0 derivative at center and continuous slope
      const angleRatio = Math.sin(Math.max(-1, Math.min(1, diff * 0.62)));
      const rotateY = -angleRatio * maxRotate;

      // Smooth continuous scale
      const scale = Math.max(0.68, 1 - Math.pow(absDiff, 1.1) * 0.12);

      // Smooth Gaussian-style opacity curve (no abrupt cutoff)
      const opacity = Math.max(0, Math.min(1, Math.exp(-0.38 * absDiff * absDiff)));

      // Strict z-ordering so front card always layers on top
      const zIndex = Math.round(100 - absDiff * 20);

      card.style.transform = `translate3d(${translateX.toFixed(2)}px, 0px, ${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = zIndex;
      card.style.pointerEvents = absDiff < 1.2 ? 'auto' : 'none';

      if (absDiff < 0.45) {
        card.classList.add('lc-active');
      } else {
        card.classList.remove('lc-active');
      }
    });
  }, []);

  // Initialize GSAP ScrollTrigger with true scrubbed animation for buttery-smooth scrolling
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      progressObjRef.current.value = 0;

      // GSAP scrubbed tween provides true physics inertia and frame-interpolated progress
      const tween = gsap.to(progressObjRef.current, {
        value: stages.length - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const val = progressObjRef.current.value;
          currentProgressRef.current = val;
          apply3DTransforms(val);
          setSmoothProgress(val);
          const rounded = Math.min(stages.length - 1, Math.max(0, Math.round(val)));
          setActiveStage((prev) => (prev !== rounded ? rounded : prev));
        },
      });

      tweenRef.current = tween;
      scrollTriggerRef.current = tween.scrollTrigger;

      // Initial transform rendering
      apply3DTransforms(0);

      // Handle window resize cleanly
      const handleResize = () => {
        apply3DTransforms(currentProgressRef.current);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, section);

    return () => ctx.revert();
  }, [apply3DTransforms]);

  // Navigate directly to a specific stage with buttery-smooth easing
  const goToStage = useCallback((targetIndex) => {
    const clampedIndex = Math.min(stages.length - 1, Math.max(0, targetIndex));
    const st = tweenRef.current?.scrollTrigger || scrollTriggerRef.current;

    if (st) {
      const scrollRange = st.end - st.start;
      const targetScroll = st.start + (clampedIndex / (stages.length - 1)) * scrollRange;

      if (window.__lenis) {
        window.__lenis.scrollTo(targetScroll, {
          duration: 0.95,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }
    } else {
      // If ScrollTrigger is not active, tween progressObj directly with GSAP
      gsap.to(progressObjRef.current, {
        value: clampedIndex,
        duration: 0.75,
        ease: 'power3.out',
        onUpdate: () => {
          const val = progressObjRef.current.value;
          currentProgressRef.current = val;
          apply3DTransforms(val);
          setSmoothProgress(val);
        },
        onComplete: () => {
          setActiveStage(clampedIndex);
        },
      });
    }
  }, [apply3DTransforms]);

  // Touch and pointer dragging handlers with fluid response and magnetic snapping
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startScroll: window.scrollY,
      hasMoved: false,
      lastX: e.clientX,
      velocity: 0,
    };
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 6) {
      dragRef.current.hasMoved = true;
    }

    dragRef.current.velocity = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;

    const st = tweenRef.current?.scrollTrigger || scrollTriggerRef.current;
    if (!st) return;

    const scrollRange = st.end - st.start;
    const scrollDelta = -(dx / 380) * (scrollRange / (stages.length - 1));
    const newScroll = Math.max(st.start, Math.min(st.end, dragRef.current.startScroll + scrollDelta));

    if (window.__lenis) {
      window.__lenis.scrollTo(newScroll, { immediate: true });
    } else {
      window.scrollTo(0, newScroll);
    }
  };

  const handlePointerUp = () => {
    if (dragRef.current.isDragging && dragRef.current.hasMoved) {
      // Magnetic snap to nearest stage on release
      const p = currentProgressRef.current;
      const flick = dragRef.current.velocity < -4 ? 0.35 : dragRef.current.velocity > 4 ? -0.35 : 0;
      const targetStage = Math.min(stages.length - 1, Math.max(0, Math.round(p + flick)));
      goToStage(targetStage);
    }
    dragRef.current.isDragging = false;
  };

  const handleCardClick = (index) => {
    // If the user just dragged to rotate, don't trigger the card's click
    if (dragRef.current.hasMoved) return;
    goToStage(index);
  };

  return (
    <section id="core-business" ref={sectionRef} className="lifecycle-section">
      {/* Ambient 3D lighting & circuit background */}
      <div className="lifecycle-bg-glow" aria-hidden="true" />
      <div className="lifecycle-grid-mesh" aria-hidden="true" />

      {/* Header */}
      <div className="lifecycle-header">
        <div className="lifecycle-tagline">
          <span className="lifecycle-tagline-dot" />
          <span>Industrial Turnkey Execution — Full Lifecycle Scope</span>
        </div>
        <h2 className="lifecycle-section-title">
          COMPLETE ELECTRICAL PROJECT <span className="lifecycle-accent">LIFECYCLE</span>
        </h2>
        <p className="lifecycle-subtitle">
          6 Integrated Phases Engineered for Continuous High-Voltage Reliability
        </p>
      </div>

      {/* 3D Carousel Stage */}
      <div
        className="lifecycle-stage-area"
        ref={stageAreaRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* 3D Floor Grid with Depth Reflection */}
        <div className="lifecycle-stage-floor" aria-hidden="true">
          <div className="lifecycle-floor-glow" />
        </div>

        {/* Previous Phase Nav Arrow */}
        <button
          type="button"
          className="lifecycle-nav-btn lifecycle-nav-prev"
          onClick={() => goToStage(activeStage - 1)}
          disabled={activeStage === 0}
          aria-label="Previous lifecycle phase"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Phase Nav Arrow */}
        <button
          type="button"
          className="lifecycle-nav-btn lifecycle-nav-next"
          onClick={() => goToStage(activeStage + 1)}
          disabled={activeStage === stages.length - 1}
          aria-label="Next lifecycle phase"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* 3D Cards Carousel */}
        <div className="lifecycle-carousel">
          {stages.map((stage, i) => (
            <article
              key={stage.number}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`lifecycle-card ${activeStage === i ? 'lc-active' : ''}`}
              onClick={() => handleCardClick(i)}
              role="button"
              tabIndex={0}
              aria-label={`Phase ${stage.number}: ${stage.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToStage(i);
                }
              }}
            >
              {/* Card Photo & Telemetry Banner */}
              <div className="lifecycle-card-visual">
                <img
                  src={stage.image}
                  alt={stage.imageAlt}
                  loading="lazy"
                />
                <div className="lifecycle-card-gradient" />
                <div className="lifecycle-card-scanline" />

                {/* Telemetry Tag */}
                <div className="lifecycle-telemetry-tag">
                  <span className="telemetry-pulse" />
                  <span>PHASE {stage.number} // {stage.title}</span>
                </div>

                {/* Corner Watermark Numeral */}
                <span className="lifecycle-watermark">{stage.number}</span>
              </div>

              {/* Card Body */}
              <div className="lifecycle-card-body">
                <div className="lifecycle-card-meta">
                  <span className="lifecycle-phase-badge">
                    <span className="phase-badge-dot" />
                    PHASE {stage.number}
                  </span>
                  <span className="lifecycle-phase-scope">{stage.subtitle}</span>
                </div>

                <h3 className="lifecycle-card-title">{stage.title}</h3>

                <p className="lifecycle-card-desc">{stage.desc}</p>

                {/* Scope Deliverables Chips */}
                <div className="lifecycle-card-chips">
                  {stage.deliverables.map((item, idx) => (
                    <span key={idx} className="lifecycle-chip">
                      {item}
                    </span>
                  ))}
                </div>

                {/* Status Footer */}
                <div className="lifecycle-card-footer">
                  <span className="lifecycle-status-tag">
                    {activeStage === i ? '● ACTIVE PHASE IN FOCUS' : 'CLICK TO ROTATE & INSPECT'}
                  </span>
                  <span className="lifecycle-inspect-arrow">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Progress & Step Dots */}
      <div className="lifecycle-progress-wrap">
        <div className="lifecycle-progress-summary">
          <span className="lifecycle-current-num">PHASE {stages[activeStage].number}</span>
          <span className="lifecycle-sep">/</span>
          <span className="lifecycle-phase-name">{stages[activeStage].title}</span>
        </div>

        <div className="lifecycle-progress-track">
          <div className="lifecycle-progress-bar-bg">
            <div
              className="lifecycle-progress-bar-fill"
              style={{ width: `${(smoothProgress / (stages.length - 1)) * 100}%` }}
            />
          </div>

          <div className="lifecycle-dots-row">
            {stages.map((stage, i) => (
              <button
                key={stage.number}
                type="button"
                className={`lifecycle-step-dot ${activeStage === i ? 'active' : ''} ${activeStage > i ? 'passed' : ''}`}
                onClick={() => goToStage(i)}
                aria-label={`Go to phase ${stage.number}: ${stage.title}`}
              >
                <span className="lifecycle-dot-number">{stage.number}</span>
                <span className="lifecycle-dot-tooltip">{stage.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lifecycle-scroll-prompt">
          <span className="scroll-prompt-icon">
            <span className="scroll-prompt-wheel" />
          </span>
          <span>SCROLL TO ROTATE PHASES • DRAG OR CLICK CARDS</span>
        </div>
      </div>
    </section>
  );
}
