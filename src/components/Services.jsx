import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'POWER &\nELECTRICAL\nDISTRIBUTION',
    items: [
      'HT / LT Electrical Systems',
      'Industrial Power Distribution',
      'Utility Electrification',
      'Transformers',
      'HT / LT Panels',
      'Switchgear',
      'LT Distribution Boards',
    ],
  },
  {
    number: '02',
    title: 'CABLE &\nELECTRICAL\nINFRASTRUCTURE',
    items: [
      'Cable Trays',
      'Ladder-Type Cable Trays',
      'Power & Control Cables',
      'Cable Termination',
      'Air Insulated Busducts',
      'Sandwich Busducts',
      'Electrical Infrastructure',
    ],
  },
  {
    number: '03',
    title: 'LIGHTING,\nPROTECTION &\nPOWER BACKUP',
    items: [
      'Industrial Lighting',
      'Flameproof Lighting',
      'Industrial Sockets',
      'Street / Hi-Mast Lighting',
      'Earthing Systems',
      'Lightning Protection',
      'UPS Systems',
      'DG Power Systems',
    ],
  },
  {
    number: '04',
    title: 'ENGINEERING &\nPROJECT\nSERVICES',
    items: [
      'Electrical Design',
      'Installation Planning',
      'Installation & Execution',
      'Testing',
      'Commissioning',
      'Technical Consultancy',
    ],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from('.services-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 80%',
        },
      });

      // Cards stagger reveal
      gsap.from('.service-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="services-inner">
        <div className="services-header">
          <h2 className="services-title">
            KEY<br />
            <span className="text-golden">SERVICES</span>
          </h2>
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', alignSelf: 'flex-end' }}>
            Rayyan Electricals & Enterprises
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.number}
              className="service-card"
              onMouseMove={handleCardMouseMove}
            >
              <div>
                <span className="service-card-number">{service.number}</span>
                <h3 className="service-card-title" style={{ whiteSpace: 'pre-line' }}>
                  {service.title}
                </h3>
                <div className="service-card-line" />
                <ul className="service-card-items">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <span className="service-card-bg-number">{service.number}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
