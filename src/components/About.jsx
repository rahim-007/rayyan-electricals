import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  {
    first: true,
    text: 'Rayyan Electricals and Enterprises is an industrial electrical solutions and services company based in Oragadam Industrial Area, Kancheepuram, Tamil Nadu.',
  },
  {
    text: 'Established in April 2023, we provide end-to-end electrical solutions covering designing, supply, installation, testing, commissioning and maintenance for industrial facilities.',
  },
  {
    text: 'With a dedicated team of 20 electrical professionals and C License capability, we support the electrical requirements of manufacturing and industrial organizations.',
  },
  {
    text: 'Our focus is on delivering safe, reliable and professionally executed electrical solutions, while maintaining quality, technical discipline and customer satisfaction throughout every project.',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const paraRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.about-heading', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 80%',
        },
      });

      // Image clip reveal
      gsap.to(imageRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
        },
      });

      gsap.to(imageRef.current?.querySelector('img'), {
        scale: 1,
        duration: 1.6,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
        },
      });

      // Paragraphs stagger
      paraRefs.current.forEach((p, i) => {
        if (!p) return;
        gsap.to(p.querySelector('p'), {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 80%',
          },
          delay: i * 0.1,
        });
      });

      // About stats count animation
      const counters = document.querySelectorAll('.about-stat-number');
      counters.forEach((el) => {
        const target = el.dataset.target;
        if (!target) return;
        gsap.from(el, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].textContent) + (target.includes('+') ? '+' : '');
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToParaRefs = (el) => {
    if (el && !paraRefs.current.includes(el)) {
      paraRefs.current.push(el);
    }
  };

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="about-inner">
        <div className="about-grid">
          {/* Left */}
          <div className="about-left">
            <div className="about-label">
              <span className="golden-line" style={{ background: '#101D06', opacity: 0.3 }} />
              <span>Who We Are</span>
            </div>
            <h2 className="about-heading">
              ABOUT<br />
              <span style={{ color: 'var(--color-golden)' }}>RAYYAN</span>
              <span className="year-accent">Est. April 2023</span>
            </h2>

            {/* Image */}
            <div ref={imageRef} className="about-image-wrap">
              <img
                src="/images/about-engineer.webp"
                alt="Rayyan Electricals engineers inspecting electrical panels"
                loading="lazy"
              />
            </div>
            <div className="about-year-bg">2023</div>
          </div>

          {/* Right */}
          <div className="about-right">
            <div className="about-paragraphs">
              {paragraphs.map((para, i) => (
                <div
                  key={i}
                  ref={addToParaRefs}
                  className={`about-paragraph ${para.first ? 'first' : ''}`}
                >
                  <p>{para.text}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-number" data-target="20+">20+</div>
                <div className="about-stat-label">Electrical Professionals</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">C-Lic</div>
                <div className="about-stat-label">Electrical Capability</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number" data-target="6">6</div>
                <div className="about-stat-label">Service Verticals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
