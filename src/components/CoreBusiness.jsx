import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/services.css';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: '01',
    title: 'DESIGNING',
    desc: 'Electrical system design, engineering and project planning based on site and operational requirements.',
    image: '/images/design-engineering.webp',
    imageAlt: 'Electrical engineer working on industrial design',
  },
  {
    number: '02',
    title: 'SUPPLYING',
    desc: 'Supply of electrical equipment, materials and systems required for project execution.',
    image: '/images/supply-equipment.webp',
    imageAlt: 'Industrial electrical equipment prepared for supply',
  },
  {
    number: '03',
    title: 'INSTALLATION',
    desc: 'Professional installation and integration of electrical systems and infrastructure.',
    image: '/images/installation-cable.webp',
    imageAlt: 'Technicians installing cable trays in industrial facility',
  },
  {
    number: '04',
    title: 'TESTING',
    desc: 'Inspection, testing and verification of electrical installations and systems.',
    image: '/images/testing-electrical.webp',
    imageAlt: 'Engineer performing electrical testing',
  },
  {
    number: '05',
    title: 'COMMISSIONING',
    desc: 'Functional checks, system commissioning and operational readiness.',
    image: '/images/commissioning.webp',
    imageAlt: 'Engineers performing commissioning checks',
  },
  {
    number: '06',
    title: 'AMC',
    desc: 'Planned electrical annual maintenance contract and support for industrial facilities and MNC organizations.',
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

  // Animate image on stage change
  useEffect(() => {
    if (currentImageRef.current) {
      gsap.fromTo(
        currentImageRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.08 },
        { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 0.8, ease: 'power4.out' }
      );
    }
  }, [activeStage]);

  const addToStageRefs = (el) => {
    if (el && !stageRefs.current.includes(el)) {
      stageRefs.current.push(el);
    }
  };

  return (
    <section id="core-business" ref={sectionRef} className="core-business">
      <div className="core-business-inner">
        <div className="core-business-top">
          <h2 className="core-business-main-title">
            COMPLETE<br />
            ELECTRICAL<br />
            PROJECT<br />
            <span style={{ color: 'var(--color-golden)' }}>LIFECYCLE</span>
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
              <img
                src={stages[activeStage].image}
                alt={stages[activeStage].imageAlt}
                loading="lazy"
              />
              <span className="stage-counter">{stages[activeStage].number}</span>
            </div>
          </div>

          {/* Right stages */}
          <div className="core-stages">
            {stages.map((stage, i) => (
              <div
                key={stage.number}
                ref={addToStageRefs}
                className={`core-stage ${activeStage === i ? 'active' : ''}`}
              >
                <div className="core-stage-header">
                  <span className="core-stage-number">{stage.number}</span>
                  <h3 className="core-stage-title">{stage.title}</h3>
                </div>
                <div className="core-stage-desc">
                  <p>{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
