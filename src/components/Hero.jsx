import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const labelRef = useRef(null);
  const headingLinesRef = useRef([]);
  const subRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      headingLinesRef.current.forEach((line, i) => {
        if (!line) return;
        const span = line.querySelector('span');
        if (span) {
          tl.to(span, {
            y: '0%',
            duration: 0.9,
            ease: 'power4.out',
          }, i === 0 ? '-=0.4' : '-=0.6');
        }
      });

      tl.to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
        .to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.5')
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4')
        .to(statsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.4')
        .to(scrollRef.current, {
          opacity: 1,
          duration: 0.6,
        }, '-=0.3');

      // Animated counters
      gsap.to('.hero-stat-count[data-target]', {
        innerHTML: function(i, el) { return el.dataset.target; },
        duration: 2.2,
        delay: 1.2,
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

  const addToLinesRef = (el) => {
    if (el && !headingLinesRef.current.includes(el)) {
      headingLinesRef.current.push(el);
    }
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

      {/* Top Centered Industrial Tagline/Badge (Positioned Upward as Marked) */}
      <div ref={labelRef} className="hero-label-container">
        <div className="hero-label">
          <span className="hero-label-bar" />
          <span className="hero-label-text">Industrial Electrical Solutions — Est. 2023</span>
          <span className="hero-label-bar" />
        </div>
      </div>

      {/* Main Full-Width Content Container */}
      <div className="hero-content">
        {/* Commanding Widescreen Heading */}
        <div className="hero-heading">
          <div ref={addToLinesRef} className="hero-heading-line">
            <span>RAYYAN ELECTRICALS</span>
          </div>
          <div ref={addToLinesRef} className="hero-heading-line accent">
            <span><span className="hero-amp">&amp;</span> ENTERPRISES</span>
          </div>
        </div>

        {/* Lower Panoramic Split: Left Details + Right Industrial Credentials Matrix */}
        <div className="hero-panoramic-grid">
          {/* Left Column: Subtitle, Description, CTA Buttons */}
          <div className="hero-left-col">
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
