import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const bloomRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for Option 2: 3D Industrial Steel "Flip-Lock"
      gsap.set(labelRef.current, { opacity: 0, y: -15 });
      gsap.set('.hero-char', {
        rotateX: -92,
        y: -30,
        opacity: 0,
        transformOrigin: '50% 0%',
        transformPerspective: 1200
      });
      gsap.set('.hero-amp', {
        rotateX: -92,
        y: -30,
        opacity: 0,
        transformOrigin: '50% 0%',
        transformPerspective: 1200
      });
      gsap.set(bloomRef.current, { opacity: 0, scale: 0.75 });
      gsap.set(subRef.current, { opacity: 0, y: 25 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set('.hero-cap-item', { opacity: 0, y: 20, scale: 0.96 });
      gsap.set('.hero-execution-strip', { opacity: 0, y: 15 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set('.hero-trust-tagline', { opacity: 0, y: 10 });
      gsap.set('.hero-cred-card', { opacity: 0, y: 25 });
      gsap.set('.hero-corridors-ribbon', { opacity: 0, y: 15 });
      gsap.set(scrollRef.current, { opacity: 0 });

      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Top Industrial Badge reveals
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });

      // 2. 3D Industrial Steel "Flip-Lock" Animation
      // Line 1 flips down with heavy mechanical recoil
      tl.to('.heading-line-1 .hero-char', {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.026,
        ease: 'back.out(1.85)',
      }, '-=0.25');

      // The & symbol flips down with weighted authority
      tl.to('.hero-amp', {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'back.out(2.0)',
      }, '-=0.5');

      // Line 2 flips down with heavy mechanical recoil
      tl.to('.heading-line-2 .hero-char', {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.026,
        ease: 'back.out(1.85)',
      }, '-=0.45');

      // 3. Backlight Bloom swells behind the text as it locks into position
      tl.to(bloomRef.current, {
        opacity: 0.75,
        scale: 1.05,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.55')
        .to(bloomRef.current, {
          opacity: 0.45,
          scale: 1.0,
          duration: 0.5,
          ease: 'power1.inOut',
        });

      // Mechanical impact micro-recoil on the entire heading structure
      tl.to(headingRef.current, {
        keyframes: [
          { y: 3, duration: 0.06 },
          { y: -1, duration: 0.05 },
          { y: 0, duration: 0.08 },
        ],
        ease: 'power2.out',
      }, '-=0.4');

      // Industrial & symbol lock glow pulse
      tl.to('.hero-amp', {
        keyframes: [
          { filter: 'drop-shadow(0 0 24px #00d4ff) drop-shadow(0 0 45px #0066ff)', duration: 0.12 },
          { filter: 'drop-shadow(0 0 14px rgba(0, 212, 255, 0.7))', duration: 0.25 },
        ],
        ease: 'power1.out',
      }, '-=0.45');

      // 4. Technical details & credentials cascading in
      tl.to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.35')
        .to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
        }, '-=0.5')
        .to('.hero-cap-item', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.4')
        .to('.hero-execution-strip', {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
        }, '-=0.3')
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
        }, '-=0.3')
        .to('.hero-trust-tagline', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.2')
        .to('.hero-cred-card', {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power3.out',
        }, '-=0.55')
        .to('.hero-corridors-ribbon', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.3')
        .to(scrollRef.current, {
          opacity: 1,
          duration: 0.6,
        }, '-=0.3');

      // Animated counters
      gsap.to('.hero-stat-count[data-target]', {
        innerHTML: function (i, el) { return el.dataset.target; },
        duration: 2.2,
        delay: 1.1,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        stagger: 0.2,
      });

      // Hero parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(['.hero-label-container', '.hero-content'], {
        yPercent: 10,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Helper to render accessible letter spans for kinetic stagger
  const renderChars = (text, customClass = '') => {
    return text.split(' ').map((word, wIdx, arr) => (
      <span key={wIdx} className="hero-word">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="hero-char-wrap">
            <span className={`hero-char ${customClass}`}>{char}</span>
          </span>
        ))}
        {wIdx < arr.length - 1 && <span className="hero-word-spacer">&nbsp;</span>}
      </span>
    ));
  };

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="hero">
      {/* Background */}
      <div className="hero-bg" ref={bgRef}>
        <img
          src="/images/hero-industrial.webp"
          alt="Industrial electrical substation"
          loading="eager"
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-overlay-bottom" />

      {/* Top Centered Industrial Tagline/Badge */}
      <div ref={labelRef} className="hero-label-container">
        <div className="hero-label">
          <span className="hero-label-bar" />
          <span className="hero-label-text">Industrial Electrical Solutions — Est. 2023</span>
          <span className="hero-label-bar" />
        </div>
      </div>

      {/* Main Full-Width Content Container */}
      <div className="hero-content">
        {/* Commanding Widescreen Heading with 3D Industrial Steel Flip-Lock */}
        <div className="hero-heading" ref={headingRef}>
          <div className="hero-heading-bloom" ref={bloomRef} aria-hidden="true" />
          <div className="hero-heading-line heading-line-1" aria-label="RAYYAN ELECTRICALS">
            {renderChars('RAYYAN ELECTRICALS')}
          </div>
          <div className="hero-heading-line heading-line-2 accent" aria-label="& ENTERPRISES">
            <span className="hero-char-wrap hero-amp-wrap">
              <span className="hero-amp">&amp;</span>
            </span>
            <span className="hero-word-spacer">&nbsp;</span>
            {renderChars('ENTERPRISES')}
          </div>
        </div>

        {/* Lower Panoramic Split: Left Details + Right Industrial Credentials Matrix */}
        <div className="hero-panoramic-grid">
          {/* Left Column: Subtitle, Description, Technical Capability Matrix, CTA Buttons */}
          <div className="hero-left-col">
            <div className="hero-left-top">
              <div ref={subRef} className="hero-sub">
                <p>
                  <strong>POWERING INDUSTRY</strong> THROUGH RELIABLE ELECTRICAL SOLUTIONS
                </p>
              </div>

              <div ref={descRef} className="hero-desc">
                <p>
                  End-to-end turnkey electrical solutions covering design, supply, installation,
                  testing, commissioning and maintenance across Tamil Nadu's industrial manufacturing hubs.
                </p>
              </div>

              {/* Technical Capabilities Matrix */}
              <div className="hero-caps-strip">
                <div className="hero-cap-item">
                  <span className="hero-cap-icon">⚡</span>
                  <div className="hero-cap-text">
                    <strong>HT &amp; LT Power</strong>
                    <span>Substations, Panels &amp; Busduct</span>
                  </div>
                  <span className="hero-cap-pill">Up to 33kV</span>
                </div>
                <div className="hero-cap-item">
                  <span className="hero-cap-icon">🛠️</span>
                  <div className="hero-cap-text">
                    <strong>Infrastructure</strong>
                    <span>Cable Trays &amp; Factory Electrification</span>
                  </div>
                  <span className="hero-cap-pill">Heavy Duty</span>
                </div>
                <div className="hero-cap-item">
                  <span className="hero-cap-icon">🛡️</span>
                  <div className="hero-cap-text">
                    <strong>C-Lic Compliance</strong>
                    <span>Govt. Certified Engineers &amp; AMC</span>
                  </div>
                  <span className="hero-cap-pill">TNEB Class</span>
                </div>
              </div>

              {/* End-to-End Industrial Execution Bar - Fills The Space Elegantly */}
              <div className="hero-execution-strip">
                <div className="execution-header">
                  <span className="execution-label">END-TO-END INDUSTRIAL TURNKEY SCOPE</span>
                  <span className="execution-badge">FULL LIFECYCLE</span>
                </div>
                <div className="execution-steps">
                  <div className="exec-step">
                    <span className="exec-step-num">01</span>
                    <span className="exec-step-title">Design</span>
                  </div>
                  <span className="exec-step-arrow">➔</span>
                  <div className="exec-step">
                    <span className="exec-step-num">02</span>
                    <span className="exec-step-title">Supply</span>
                  </div>
                  <span className="exec-step-arrow">➔</span>
                  <div className="exec-step">
                    <span className="exec-step-num">03</span>
                    <span className="exec-step-title">Installation</span>
                  </div>
                  <span className="exec-step-arrow">➔</span>
                  <div className="exec-step">
                    <span className="exec-step-num">04</span>
                    <span className="exec-step-title">Testing</span>
                  </div>
                  <span className="exec-step-arrow">➔</span>
                  <div className="exec-step">
                    <span className="exec-step-num">05</span>
                    <span className="exec-step-title">Commissioning</span>
                  </div>
                  <span className="exec-step-arrow">➔</span>
                  <div className="exec-step">
                    <span className="exec-step-num">06</span>
                    <span className="exec-step-title">AMC</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-left-bottom">
              <div ref={ctaRef} className="hero-cta-group">
                <button
                  className="btn btn-primary"
                  onClick={() => document.querySelector('#core-business')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Capabilities
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Us
                </button>
                <a href="tel:+918056810080" className="hero-cta-call">
                  <span className="cta-call-icon">📞</span>
                  <span>Direct Hotline</span>
                </a>
              </div>

              <div className="hero-trust-tagline">
                <span>✓ 20+ Site Engineers &amp; Licensed Wiremen</span>
                <span className="tagline-dot">•</span>
                <span>✓ 24/7 Breakdown Response</span>
                <span className="tagline-dot">•</span>
                <span>✓ Oragadam Hub</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Industrial Credentials & Stats Matrix */}
          <div ref={statsRef} className="hero-right-col">
            <div className="hero-credentials-grid">
              <div className="hero-cred-card">
                <div className="cred-card-top">
                  <span className="cred-stat">
                    <span className="hero-stat-count" data-target="20">0</span>+
                  </span>
                  <span className="cred-badge">Field Force</span>
                </div>
                <h4 className="cred-title">Skilled Professionals</h4>
                <p className="cred-desc">Certified high-voltage engineers, site supervisors & licensed wiremen.</p>
              </div>

              <div className="hero-cred-card">
                <div className="cred-card-top">
                  <span className="cred-stat highlight">C-LIC</span>
                  <span className="cred-badge">Govt. Certified</span>
                </div>
                <h4 className="cred-title">Licensed Contractor</h4>
                <p className="cred-desc">Tamil Nadu Electrical Licensing Board certified for HT/LT installations.</p>
              </div>

              <div className="hero-cred-card">
                <div className="cred-card-top">
                  <span className="cred-stat">
                    <span className="hero-stat-count" data-target="2023">2020</span>
                  </span>
                  <span className="cred-badge">Track Record</span>
                </div>
                <h4 className="cred-title">Established & Proven</h4>
                <p className="cred-desc">Trusted by Daimler, Hyundai Kefico, Blue Star, Danfoss & Murugappa.</p>
              </div>

              <div className="hero-cred-card">
                <div className="cred-card-top">
                  <span className="cred-stat highlight">24/7</span>
                  <span className="cred-badge">Rapid Mobilization</span>
                </div>
                <h4 className="cred-title">Breakdown Response</h4>
                <p className="cred-desc">Emergency support team stationed near Oragadam & Sriperumbudur corridors.</p>
              </div>
            </div>

            {/* Industrial Corridors Ribbon */}
            <div className="hero-corridors-ribbon">
              <span className="ribbon-bolt">⚡</span>
              <span>Serving Oragadam • Sriperumbudur • Guindy • Maraimalai Nagar Industrial Hubs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="hero-scroll-indicator" onClick={scrollDown}>
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
