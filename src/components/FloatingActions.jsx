import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdArrowUpward } from 'react-icons/md';
import '../styles/floating.css';

export default function FloatingActions() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <aside className="floating-actions" aria-label="Quick Actions">
      {/* Scroll to Top with Circular Progress */}
      <button
        type="button"
        className={`floating-scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <svg className="progress-ring" width="44" height="44" viewBox="0 0 44 44">
          <circle
            className="progress-ring-bg"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2.5"
            fill="transparent"
            r="18"
            cx="22"
            cy="22"
          />
          <circle
            className="progress-ring-indicator"
            stroke="#FFB81C"
            strokeWidth="2.5"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r="18"
            cx="22"
            cy="22"
          />
        </svg>
        <MdArrowUpward className="scroll-arrow-icon" />
      </button>

      {/* Floating WhatsApp Quick-Chat */}
      <a
        href="https://wa.me/918056810080?text=Hello%20Rayyan%20Electricals,%20I%20would%20like%20to%20discuss%20an%20industrial%20electrical%20requirement."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with Rayyan Electricals on WhatsApp"
      >
        <div className="whatsapp-pulse" />
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-label">
          <span className="whatsapp-status">● Live</span>
          <span className="whatsapp-title">WhatsApp Quote</span>
        </span>
      </a>
    </aside>
  );
}
