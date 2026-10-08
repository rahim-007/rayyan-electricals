import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientTrustBanner from './components/ClientTrustBanner';
import IntroStory from './components/IntroStory';
import About from './components/About';
import Customers from './components/Customers';
import CoreBusiness from './components/CoreBusiness';
import Services from './components/Services';
import SupplyInstallation from './components/SupplyInstallation';
import VisionMission from './components/VisionMission';
import CoreValues from './components/CoreValues';
import OperationalCapability from './components/OperationalCapability';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

import './styles/globals.css';
import './styles/preloader.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/trust-banner.css';
import './styles/about.css';
import './styles/services.css';
import './styles/customers.css';
import './styles/vision-mission.css';
import './styles/core-values.css';
import './styles/contact.css';
import './styles/floating.css';
import './styles/responsive.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const progressRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    if (!preloaderDone) return;

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.__lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll progress bar
    lenis.on('scroll', ({ progress }) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    });

    // Refresh ScrollTrigger after DOM settlements
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      window.__lenis = null;
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [preloaderDone]);

  return (
    <>
      {/* Branded preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Scroll progress indicator */}
      <div ref={progressRef} className="scroll-progress" />

      <Navbar />
      <main>
        <Hero />
        {/* Immediate Post-Hero Customer Trust Strip */}
        <ClientTrustBanner />
        <IntroStory />
        <About />
        {/* Customers Highlighted Higher in the Flow */}
        <Customers />
        <CoreBusiness />
        <Services />
        <SupplyInstallation />
        <VisionMission />
        <CoreValues />
        <OperationalCapability />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
