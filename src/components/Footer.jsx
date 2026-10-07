import { MdPhone, MdEmail, MdLocationOn, MdLanguage } from 'react-icons/md';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Vision & Mission', href: '#vision' },
  { label: 'Core Values', href: '#values' },
  { label: 'Capabilities', href: '#core-business' },
  { label: 'Services', href: '#services' },
  { label: 'Customers', href: '#customers' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Power & Electrical Distribution',
  'Cable & Electrical Infrastructure',
  'Lighting, Protection & Power Backup',
  'Engineering & Project Services',
];

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-bg">
        <img
          src="/images/footer-industrial.webp"
          alt="Industrial silhouette at dusk"
          loading="lazy"
        />
      </div>

      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/images/logo-card.png"
                alt="Rayyan Electrical Enterprises"
                className="footer-logo-img"
              />
            </div>
            <p className="footer-brand-desc">
              Industrial electrical solutions and services company based in Oragadam
              Industrial Area, Kancheepuram, Tamil Nadu.
            </p>
            <div className="footer-tagline">
              "WATT YOU NEED,<br />WHEN YOU NEED IT.!"
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-nav">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul className="footer-nav">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" onClick={(e) => handleClick(e, '#services')}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MdPhone className="icon" />
                <a href="tel:+918056810080">+91 80568 10080</a>
              </div>
              <div className="footer-contact-item">
                <MdEmail className="icon" />
                <a href="mailto:admin202@rayyanelectrical.com">
                  admin202@rayyanelectrical.com
                </a>
              </div>
              <div className="footer-contact-item">
                <MdLanguage className="icon" />
                <a
                  href="https://www.rayyanelectrical.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.rayyanelectrical.com
                </a>
              </div>
              <div className="footer-contact-item">
                <MdLocationOn className="icon" />
                <span>
                  Plot No. A-107, 1st Floor,<br />
                  Oragadam, Kancheepuram,<br />
                  Tamil Nadu – 631 604
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>Rayyan Electricals and Enterprises.</span>{' '}
            All rights reserved. | GSTIN: 33BBMPA2863D1Z2
          </p>
          <div className="footer-bottom-right">
            <a href="https://www.rayyanelectrical.com" target="_blank" rel="noopener noreferrer">
              www.rayyanelectrical.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
