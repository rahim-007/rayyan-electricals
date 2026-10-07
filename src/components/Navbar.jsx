import { useEffect, useRef, useState } from 'react';
import '../styles/navbar.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#core-business' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#supply' },
  { label: 'Customers', href: '#customers' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <div className="navbar-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <img
            src="/images/logo-card.png"
            alt="Rayyan Electrical Enterprises"
            className="navbar-logo-img"
          />
        </div>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="navbar-cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Get In Touch
        </a>

        {/* Hamburger */}
        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Get In Touch
        </a>
      </div>
    </>
  );
}
