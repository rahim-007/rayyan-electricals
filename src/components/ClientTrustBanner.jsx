import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/trust-banner.css';

const trustClients = [
  { name: 'DAIMLER', logo: '/images/customers/daimler-hq.png' },
  { name: 'BHARATBENZ', logo: '/images/customers/bharatbenz-hq.png' },
  { name: 'BLUE STAR', logo: '/images/customers/bluestar-hq.png' },
  { name: 'LUCAS TVS', logo: '/images/customers/lucas-tvs-hq.png' },
  { name: 'DANFOSS', logo: '/images/customers/danfoss-hq.png' },
  { name: 'MONTRA ELECTRIC / TIVOLT', logo: '/images/customers/montra-tivolt-hq.png' },
  { name: 'HYUNDAI KEFICO', logo: '/images/customers/hyundai-kefico-hq.png' },
  { name: 'MURUGAPPA', logo: '/images/customers/murugappa-hq.png' },
];

// Duplicate for infinite seamless ticker
const tickerList = [...trustClients, ...trustClients, ...trustClients, ...trustClients];

export default function ClientTrustBanner() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 32,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    track.addEventListener('mouseenter', () => tween.pause());
    track.addEventListener('mouseleave', () => tween.play());

    return () => {
      tween.kill();
    };
  }, []);

  const scrollToCustomers = () => {
    document.querySelector('#customers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="client-trust-banner">
      <div className="trust-banner-inner">
        <div className="trust-banner-header">
          <span className="trust-badge-line" />
          <span className="trust-banner-title">
            TRUSTED ELECTRICAL PARTNER FOR <strong>AUTOMOTIVE & INDUSTRIAL LEADERS</strong>
          </span>
          <span className="trust-badge-line" />
        </div>

        <div className="trust-marquee-wrapper" onClick={scrollToCustomers}>
          <div className="trust-marquee-track" ref={trackRef}>
            {tickerList.map((client, i) => (
              <div key={`${client.name}-${i}`} className="trust-logo-chip" title={`View ${client.name} Project Details`}>
                <img src={client.logo} alt={client.name} loading="lazy" />
                <span className="trust-logo-chip-text">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
