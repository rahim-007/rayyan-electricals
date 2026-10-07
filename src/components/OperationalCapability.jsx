import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '20+',
    label: 'Electrical\nProfessionals',
    desc: 'Dedicated team supporting industrial electrical projects and maintenance activities.',
    isNumber: true,
    numEnd: 20,
  },
  {
    value: 'C-LICENCE',
    label: 'Electrical\nCapability',
    desc: 'Licensed to undertake electrical works within the scope of applicable electrical license.',
    isNumber: false,
  },
  {
    value: 'END-TO-END',
    label: 'Project\nExecution',
    desc: 'From designing and supply to installation, testing and commissioning.',
    isNumber: false,
  },
  {
    value: 'AMC',
    label: 'Maintenance\nSupport',
    desc: 'Planned and ongoing electrical maintenance support for industrial facilities and MNC organizations.',
    isNumber: false,
  },
  {
    value: 'INDUSTRIAL',
    label: 'Project\nEnvironment',
    desc: 'Supporting electrical requirements in demanding industrial and manufacturing environments.',
    isNumber: false,
  },
];

export default function OperationalCapability() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from('.capability-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.capability-header',
          start: 'top 80%',
        },
      });

      // Stats stagger
      gsap.from('.capability-stat', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.capability-grid',
          start: 'top 75%',
        },
      });

      // Number counter for the 20+
      const counter = document.querySelector('[data-counter="20"]');
      if (counter) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 20,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
          },
          onUpdate: () => {
            counter.textContent = Math.round(obj.val) + '+';
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="capability" ref={sectionRef} className="capability">
      <div className="capability-bg">
        <img
          src="/images/operational-capability.webp"
          alt="Large industrial manufacturing facility"
          loading="lazy"
        />
      </div>
      <div className="capability-inner">
        <div className="capability-header">
          <div className="section-label" style={{ marginBottom: '20px' }}>
            <span className="golden-line" />
            Operational Capability
          </div>
          <h2 className="capability-title">
            BUILT FOR<br />
            INDUSTRIAL<br />
            <span className="text-golden">EXECUTION</span>
          </h2>
        </div>

        <div className="capability-grid">
          {stats.map((stat, i) => (
            <div key={stat.value} className="capability-stat">
              <span
                className="capability-number"
                data-counter={stat.isNumber ? stat.numEnd : undefined}
              >
                {stat.value}
              </span>
              <span className="capability-label" style={{ whiteSpace: 'pre-line' }}>
                {stat.label}
              </span>
              <p className="capability-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
