import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    number: '01',
    title: 'POWER &\nDISTRIBUTION SYSTEMS',
    image: '/images/power-distribution.webp',
    imageAlt: 'Industrial power distribution substation',
  },
  {
    number: '02',
    title: 'BUSDUCT &\nCABLE SYSTEMS',
    image: '/images/cable-infrastructure.webp',
    imageAlt: 'Industrial cable trays and busduct systems',
  },
  {
    number: '03',
    title: 'LIGHTING &\nEXTERNAL ELECTRIFICATION',
    image: '/images/industrial-lighting.webp',
    imageAlt: 'Industrial facility with professional lighting',
  },
  {
    number: '04',
    title: 'POWER PROTECTION\n& BACKUP',
    image: '/images/power-protection.webp',
    imageAlt: 'Electrical protection infrastructure',
  },
];

export default function SupplyInstallation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from('.supply-install-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.supply-install-header',
          start: 'top 80%',
        },
      });

      // Panel clip reveals
      gsap.utils.toArray('.supply-panel').forEach((panel, i) => {
        gsap.to(panel, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
          },
          delay: i * 0.1,
        });

        gsap.to(panel.querySelector('img'), {
          scale: 1,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
          },
          delay: i * 0.1,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="supply" ref={sectionRef} className="supply-install">
      <div className="supply-install-inner">
        <div className="supply-install-header">
          <div className="section-label" style={{ marginBottom: '16px' }}>
            <span className="golden-line" />
            Supply & Installation
          </div>
          <h2 className="supply-install-title">
            SYSTEMS WE<br />
            <span style={{ color: 'var(--color-golden)' }}>SUPPLY &<br />INSTALL</span>
          </h2>
        </div>

        <div className="supply-panels">
          {panels.map((panel) => (
            <div key={panel.number} className="supply-panel">
              <img src={panel.image} alt={panel.imageAlt} loading="lazy" />
              <div className="supply-panel-overlay" />
              <div className="supply-panel-content">
                <span className="supply-panel-number">{panel.number}</span>
                <h3 className="supply-panel-title" style={{ whiteSpace: 'pre-line' }}>
                  {panel.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
