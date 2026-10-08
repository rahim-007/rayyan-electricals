import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const envRef = useRef(null);
  const bgRef = useRef(null);
  const canvasRef = useRef(null);
  const lightLayerRef = useRef(null);
  const lightSweepRef = useRef(null);
  const stageRef = useRef(null);
  const titleWrapRef = useRef(null);
  const bloomRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const panoramicRef = useRef(null);
  const scrollCueRef = useRef(null);

  // 1. Ambient Atmospheric Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Observer to pause canvas render when hero is scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    if (heroRef.current) observer.observe(heroRef.current);

    // Generate ~32 atmospheric ionized dust / energy spark motes
    const particleCount = window.innerWidth < 768 ? 16 : 32;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.2 - Math.random() * 0.45, // gentle upward thermal drift
      size: 1.0 + Math.random() * 2.2,
      baseAlpha: 0.15 + Math.random() * 0.45,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      isCyan: Math.random() > 0.3,
    }));

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around edges
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.isCyan) {
          ctx.fillStyle = `rgba(0, 210, 255, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(0, 210, 255, 0.8)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.8})`;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. Cinematic Initial Reveal & Scroll Transition & Micro-Parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Reduced motion: immediate reveal
        gsap.set([
          bgRef.current,
          bloomRef.current,
          line1Ref.current,
          line2Ref.current,
          panoramicRef.current,
          scrollCueRef.current,
        ], { opacity: 1, y: 0, scale: 1, filter: 'none' });
        return;
      }

      // ==========================================
      // INITIAL POWER-OFF STATE (Hidden before reveal)
      // ==========================================
      gsap.set(bgRef.current, { opacity: 0, scale: 1.15 });
      gsap.set(lightSweepRef.current, { xPercent: -120, opacity: 0 });
      gsap.set(bloomRef.current, { opacity: 0, scale: 0.82 });

      // Floating Typography Initial States (blur + translateY + opacity 0)
      gsap.set(line1Ref.current, { opacity: 0, y: 45, filter: 'blur(12px)' });
      gsap.set(line2Ref.current, { opacity: 0, y: 24, filter: 'blur(8px)' });

      // Lower Panoramic Grid Initial State
      gsap.set(panoramicRef.current, { opacity: 0, y: 30 });
      gsap.set(scrollCueRef.current, { opacity: 0 });

      // ==========================================
      // CINEMATIC REVEAL TIMELINE SEQUENCE
      // ==========================================
      const executeReveal = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 0.0s -> 0.3s: Background awakens
        tl.to(bgRef.current, {
          opacity: 1,
          scale: 1.10,
          duration: 1.4,
          ease: 'power2.out',
        }, 0.2);

        // 0.6s: High-voltage electrical light sweep travels across cables & towers
        tl.to(lightSweepRef.current, {
          xPercent: 120,
          opacity: 0.85,
          duration: 1.25,
          ease: 'power2.inOut',
        }, 0.55);

        // 0.9s: Industrial background clarity settles
        tl.to('.hero-infra-img', {
          filter: 'brightness(1) contrast(1.08)',
          duration: 0.9,
          ease: 'power1.out',
        }, 0.85);

        // Volumetric contrast bloom swells gently behind text
        tl.to(bloomRef.current, {
          opacity: 0.45,
          scale: 1.0,
          duration: 0.95,
          ease: 'power2.out',
        }, 0.92);

        // 1.08s: RAYYAN ELECTRICALS slides upward + sharpens
        tl.to(line1Ref.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
        }, 1.08);

        // 1.28s: & ENTERPRISES reveals with hairline conductor rules & glowing cyan amp
        tl.to(line2Ref.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
        }, 1.26);

        // 1.45s: Lower Panoramic Content (Matrix, Execution Scope, CTAs, Credentials) reveals
        tl.to(panoramicRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
        }, 1.45);

        // Animated Credential Counter Numbers
        gsap.to('.hero-stat-count[data-target]', {
          innerHTML: function (i, el) { return el.dataset.target; },
          duration: 2.2,
          delay: 1.1,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          stagger: 0.2,
        });

        // 1.85s: Scroll cue appears
        tl.to(scrollCueRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 1.85);
      };

      // Coordinate with Preloader lifecycle
      const preloaderEl = document.querySelector('.preloader');
      if (preloaderEl) {
        const observer = new MutationObserver(() => {
          if (!document.querySelector('.preloader')) {
            observer.disconnect();
            executeReveal();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        // Fallback safety timeout
        setTimeout(() => {
          observer.disconnect();
          executeReveal();
        }, 2200);
      } else {
        // Preloader not present or already finished
        executeReveal();
      }

      // ==========================================
      // SCROLL-DRIVEN CINEMATIC TRANSITION
      // Scrubbed to exact user scroll timeline:
      // 0%   Full electrical environment + title + CTA
      // 25%  Title moves upward, background begins zooming
      // 50%  Infrastructure shifts in depth, electrical light moves
      // 75%  Hero recedes, next section reveals underneath
      // 100% Hero completely transitions into next section
      // ==========================================
      if (window.innerWidth > 768) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        // 0% -> 25%: Title moves upward, background begins zooming out
        scrollTl.to(bgRef.current, {
          scale: 1.0,
          yPercent: 18,
          ease: 'none',
        }, 0);

        scrollTl.to(lightLayerRef.current, {
          yPercent: 12,
          ease: 'none',
        }, 0);

        // Typography moves upward with blur & scale reduction
        scrollTl.to(titleWrapRef.current, {
          yPercent: -45,
          scale: 0.94,
          opacity: 0.25,
          filter: 'blur(8px)',
          ease: 'none',
        }, 0);

        scrollTl.to(panoramicRef.current, {
          yPercent: -45,
          opacity: 0.15,
          filter: 'blur(6px)',
          ease: 'none',
        }, 0);

        scrollTl.to(scrollCueRef.current, {
          opacity: 0,
          ease: 'none',
        }, 0);

        // Electrical light moves dynamically across the grid during scroll (0% -> 50%)
        scrollTl.fromTo(lightSweepRef.current, {
          xPercent: -60,
          opacity: 0.3,
        }, {
          xPercent: 140,
          opacity: 0.85,
          ease: 'none',
        }, 0.05);

        // 50% -> 75% -> 100%: Entire hero stage recedes in 3D perspective as next section reveals
        scrollTl.to(stageRef.current, {
          opacity: 0,
          scale: 0.90,
          filter: 'blur(10px)',
          ease: 'none',
        }, 0.45);

        scrollTl.to(heroRef.current, {
          filter: 'brightness(0.35)',
          ease: 'none',
        }, 0.55);
      }

      // ==========================================
      // DESKTOP MICRO-PARALLAX (Subtle Depth Tracking)
      // Background: 1x, Infra: 2x, Typography: 3x, Content: 4x
      // ==========================================
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (!isTouch) {
        const bgQuickX = gsap.quickTo(bgRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
        const bgQuickY = gsap.quickTo(bgRef.current, 'y', { duration: 1.2, ease: 'power2.out' });

        const infraQuickX = gsap.quickTo(lightLayerRef.current, 'x', { duration: 1.0, ease: 'power2.out' });
        const infraQuickY = gsap.quickTo(lightLayerRef.current, 'y', { duration: 1.0, ease: 'power2.out' });

        const typoQuickX = gsap.quickTo(titleWrapRef.current, 'x', { duration: 0.8, ease: 'power2.out' });
        const typoQuickY = gsap.quickTo(titleWrapRef.current, 'y', { duration: 0.8, ease: 'power2.out' });
        const typoRotX = gsap.quickTo(titleWrapRef.current, 'rotateX', { duration: 0.8, ease: 'power2.out' });
        const typoRotY = gsap.quickTo(titleWrapRef.current, 'rotateY', { duration: 0.8, ease: 'power2.out' });

        const panoQuickX = gsap.quickTo(panoramicRef.current, 'x', { duration: 0.7, ease: 'power2.out' });
        const panoQuickY = gsap.quickTo(panoramicRef.current, 'y', { duration: 0.7, ease: 'power2.out' });

        const handleMouseMove = (e) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;

          // 1x background movement
          bgQuickX(nx * 6);
          bgQuickY(ny * 4);

          // 2x electrical infra movement
          infraQuickX(nx * 12);
          infraQuickY(ny * 8);

          // 3x typography movement & subtle 3D tilt
          typoQuickX(nx * 18);
          typoQuickY(ny * 12);
          typoRotY(nx * 2.2);
          typoRotX(-ny * 2.2);

          // 4x Panoramic content movement
          panoQuickX(nx * 14);
          panoQuickY(ny * 9);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="hero-cinematic" aria-label="Hero - Rayyan Electricals & Enterprises">
      {/* ==================================================
          1. FULL-SCREEN ELECTRICAL INFRASTRUCTURE ENVIRONMENT
          ================================================== */}
      <div className="hero-env-wrap" ref={envRef} aria-hidden="true">
        {/* Real Industrial High-Voltage Infrastructure */}
        <div className="hero-env-bg" ref={bgRef}>
          <img
            src="/images/hero-industrial.webp"
            alt="High-voltage electrical substation and transmission towers"
            className="hero-infra-img"
            loading="eager"
          />
        </div>

        {/* Atmospheric Ionized Energy Sparks Canvas */}
        <canvas ref={canvasRef} className="hero-particle-canvas" />

        {/* Dynamic Electrical Light Sweep & Grid Energy Layer */}
        <div className="hero-light-layer" ref={lightLayerRef}>
          <div className="hero-light-sweep" ref={lightSweepRef} />
          <div className="hero-grid-ambient-pulse" />

          {/* High-Tension Transmission Cables SVG catching high-voltage glow */}
          <svg className="hero-cable-conduits" viewBox="0 0 1440 900" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cablePulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="grid-cable cable-high" d="M-50,210 Q720,380 1490,230" />
            <path className="grid-cable cable-mid" d="M-50,265 Q720,445 1490,290" />
            <path className="grid-cable cable-low" d="M-50,320 Q720,510 1490,350" />
          </svg>
        </div>

        {/* Cinematic Vignette & Depth Color Grading */}
        <div className="hero-vignette-radial" />
        <div className="hero-vignette-top" />
        <div className="hero-vignette-bottom" />
      </div>

      {/* ==================================================
          2. FLOATING FOREGROUND INDUSTRIAL STAGE
          (NO giant card container, pure floating atmosphere)
          ================================================== */}
      <div className="hero-stage" ref={stageRef}>


        {/* 3. FLOATING INDUSTRIAL TYPOGRAPHY (MATCHING USER TITLE LOCKUP IN BOTH VIEWS) */}
        <div className="hero-title-wrap" ref={titleWrapRef}>
          {/* Volumetric Dark-Lens Backlight Shield to neutralize background steel trusses */}
          <div className="hero-title-backlight" ref={bloomRef} aria-hidden="true" />

          <h1 className="hero-title">
            <span className="hero-title-line title-line-primary" ref={line1Ref}>
              RAYYAN ELECTRICALS
            </span>
            <span className="hero-title-line title-line-sub" ref={line2Ref}>
              <span className="subtitle-rule subtitle-rule-left" aria-hidden="true" />
              <span className="subtitle-core">
                <span className="hero-amp-spark">&amp;</span>
                <span className="hero-enterprises-word">ENTERPRISES</span>
              </span>
              <span className="subtitle-rule subtitle-rule-right" aria-hidden="true" />
            </span>
          </h1>
        </div>

        {/* 4. LOWER PANORAMIC GRID (MATCHING IMAGE 2 IN MOBILE AND IMAGE 3 IN DESKTOP) */}
        <div className="hero-panoramic-grid" ref={panoramicRef}>
          {/* Left Column: Subtitle, Description, Technical Capability Matrix, Execution Strip, CTA Buttons */}
          <div className="hero-left-col">
            <div className="hero-left-top">
              <div className="hero-sub">
                <p>
                  <strong>POWERING INDUSTRY</strong> THROUGH RELIABLE ELECTRICAL SOLUTIONS
                </p>
              </div>

              <div className="hero-desc">
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

              {/* End-to-End Industrial Execution Bar - Full Lifecycle (Desktop) */}
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
              <div className="hero-cta-group">
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
                <a href="tel:+918056810080" className="hero-cta-call" title="Direct 24/7 Breakdown Hotline">
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
          <div className="hero-right-col">
            <div className="hero-credentials-grid">
              <div className="hero-cred-card">
                <div className="cred-card-top">
                  <span className="cred-stat">
                    <span className="hero-stat-count" data-target="20">0</span>+
                  </span>
                  <span className="cred-badge">Field Force</span>
                </div>
                <h4 className="cred-title">Skilled Professionals</h4>
                <p className="cred-desc">Certified high-voltage engineers, site supervisors &amp; licensed wiremen.</p>
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
                <h4 className="cred-title">Established &amp; Proven</h4>
                <p className="cred-desc">Trusted by Daimler, Hyundai Kefico, Blue Star, Danfoss &amp; Murugappa.</p>
              </div>

              <div className="hero-cred-card">
                <div className="cred-card-top">
                  <span className="cred-stat highlight">24/7</span>
                  <span className="cred-badge">Rapid Mobilization</span>
                </div>
                <h4 className="cred-title">Breakdown Response</h4>
                <p className="cred-desc">Emergency support team stationed near Oragadam &amp; Sriperumbudur corridors.</p>
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

      {/* Floating Minimal Scroll Indicator */}
      <div
        className="hero-scroll-cue"
        ref={scrollCueRef}
        onClick={scrollDown}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to learn more about Rayyan Electricals"
      >
        <span className="scroll-cue-label">SCROLL</span>
        <div className="scroll-cue-rail">
          <div className="scroll-cue-spark" />
        </div>
      </div>
    </section>
  );
}
