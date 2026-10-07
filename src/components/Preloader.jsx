import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const barRef = useRef(null);
  const logoRef = useRef(null);
  const percentRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const counter = setInterval(() => {
      start += increment;
      const val = Math.min(Math.round(start), 100);
      setCount(val);
      if (val >= 100) clearInterval(counter);
    }, interval);

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(barRef.current, {
      scaleX: 1,
      duration: 1.6,
      ease: 'power3.inOut',
    })
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0.3)
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => onComplete && onComplete(),
      }, '+=0.25');

    return () => clearInterval(counter);
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={logoRef} className="preloader-logo">
        <img src="/images/logo-card.png" alt="Rayyan Electricals" className="preloader-logo-img" />
        <span className="preloader-tagline">WATT YOU NEED, WHEN YOU NEED IT.</span>
      </div>
      <div className="preloader-bar-wrap">
        <div ref={barRef} className="preloader-bar" />
      </div>
      <span ref={percentRef} className="preloader-percent">{count}%</span>
    </div>
  );
}
