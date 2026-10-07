import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = ['DESIGNING', 'SUPPLYING', 'INSTALLATION', 'TESTING', 'COMMISSIONING', 'AMC'];

export default function IntroStory() {
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro large text reveal
      gsap.from('.intro-large-text', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.intro-large-text',
          start: 'top 80%',
        },
      });

      // Animate steps progressively
      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        gsap.to(step, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${i * 80} 70%`,
            toggleActions: 'play none none reverse',
          },
        });

        // Active highlight cycling
        gsap.to(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => step.classList.add('active'),
            onLeave: () => step.classList.remove('active'),
            onEnterBack: () => step.classList.add('active'),
            onLeaveBack: () => step.classList.remove('active'),
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToStepRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="intro-story">
      <div className="intro-story-inner">
        <p className="intro-large-text">
          FROM <span className="text-golden">ENGINEERING</span><br />
          TO EXECUTION.
        </p>

        <div className="intro-steps">
          {steps.map((word, i) => (
            <div key={word} ref={addToStepRefs} className="intro-step">
              <span className="intro-step-word">{word}</span>
              {i < steps.length - 1 && (
                <span className="intro-step-arrow">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
