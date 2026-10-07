import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { MdPhone, MdEmail, MdLocationOn, MdLanguage, MdCheckCircle, MdSend, MdFlashOn, MdError } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

// ─── EmailJS Config ────────────────────────────────────────────────────────────
// Sign up at emailjs.com (free), create a service + template, paste IDs here
const EMAILJS_SERVICE_ID  = 'service_rayyan';    // replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_rayyan';   // replace with your Template ID
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // replace with your Public Key
// ───────────────────────────────────────────────────────────────────────────────

const servicesList = [
  'HT / LT Electrical Systems & Distribution',
  'Cable Trays & Sandwich Busduct Systems',
  'Industrial Lighting & Earthing Systems',
  'Turnkey Electrical Installation & Testing',
  'Electrical AMC & Planned Maintenance Support',
  'Utility & Substation Electrification',
];

const loadOptions = [
  'Up to 500 kVA',
  '500 kVA – 2 MVA',
  '2 MVA – 10 MVA',
  '10 MVA+ / Utility Scale',
  'Site Assessment Required',
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: servicesList[0],
    load: loadOptions[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-cta-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.contact-cta-title',
          start: 'top 80%',
        },
      });

      gsap.from('.contact-form-wrap', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-inner',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);

    const templateParams = {
      from_name:    formData.name,
      company:      formData.company,
      phone:        formData.phone,
      reply_to:     formData.email,
      service_type: formData.service,
      load_range:   formData.load,
      message:      formData.message || 'Please provide quotation & technical consultation.',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSubmitting(false);
      setSubmitError(true);
    }
  };

  const getWhatsAppRFPUrl = () => {
    const text = encodeURIComponent(
      `*New Industrial RFP / Inquiry - Rayyan Electricals*\n\n` +
      `*Client:* ${formData.name} (${formData.company || 'Enterprise'})\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Service:* ${formData.service}\n` +
      `*Connected Load:* ${formData.load}\n` +
      `*Scope:* ${formData.message || 'Please provide quotation & technical consultation.'}`
    );
    return `https://wa.me/918056810080?text=${text}`;
  };

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact-bg">
        <img
          src="/images/contact-engineers.webp"
          alt="Professional electrical engineers in industrial facility"
          loading="lazy"
        />
      </div>
      <div className="contact-overlay" />

      <div className="contact-inner">
        {/* Header */}
        <div className="contact-top-header">
          <div className="section-label" style={{ marginBottom: '16px' }}>
            <span className="golden-line" />
            Project RFQ & Technical Consultation
          </div>
          <h2 className="contact-cta-title">
            LET'S POWER<br />
            YOUR NEXT<br />
            <span className="text-golden">INDUSTRIAL PROJECT.</span>
          </h2>
          <p className="contact-cta-desc">
            Submit your electrical scope or RFP below. Our engineering leads will review
            your single-line diagrams or facility specs and provide a technical estimate within 2 business hours.
          </p>
        </div>

        {/* 2-Column Layout: Interactive Form + Contact Cards */}
        <div className="contact-grid-enhanced">
          {/* Interactive RFP Form */}
          <div className="contact-form-wrap">
            <div className="form-badge-header">
              <MdFlashOn className="form-bolt-icon" />
              <span>Request Engineering Quote / RFP</span>
            </div>

            {submitted ? (
              <div className="form-success-card">
                <MdCheckCircle className="success-icon" />
                <h3 className="success-title">Inquiry Submitted Successfully!</h3>
                <p className="success-desc">
                  Thank you, <strong>{formData.name}</strong>. Our engineering team will review your
                  requirements for <em>{formData.service}</em> and contact you at <strong>{formData.phone}</strong> within 2 business hours.
                </p>
                <div className="success-actions">
                  <a
                    href={getWhatsAppRFPUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-wa-send"
                  >
                    <FaWhatsapp />
                    <span>Also Send via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-reset"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError(false);
                      setFormData({
                        name: '',
                        company: '',
                        phone: '',
                        email: '',
                        service: servicesList[0],
                        load: loadOptions[0],
                        message: '',
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rfp-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company / Factory Name *</label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. Automotive Component Plant"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Work Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service">Required Electrical Service *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc}>{svc}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="load">Estimated Connected Load</label>
                    <select
                      id="load"
                      name="load"
                      value={formData.load}
                      onChange={handleChange}
                    >
                      {loadOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Scope / Technical Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Provide site details, transformer rating, panel requirements, or timeline..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit-rfp"
                    disabled={submitting}
                  >
                    <MdSend />
                    <span>{submitting ? 'Sending to Engineering Desk...' : 'Request Quotation & Consultation'}</span>
                  </button>
                  {submitError && (
                    <div className="form-error-row">
                      <MdError className="error-icon" />
                      <span>
                        Email failed — please&nbsp;
                        <a href={getWhatsAppRFPUrl()} target="_blank" rel="noopener noreferrer" className="wa-fallback-link">
                          send via WhatsApp
                        </a>
                        &nbsp;or call <a href="tel:+918056810080">+91 80568 10080</a>.
                      </span>
                    </div>
                  )}
                  <span className="form-privacy-note">
                    🔒 Inquiry sent directly to Rayyan Electricals engineering desk.
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Details & Compliance */}
          <div className="contact-details">
            {/* Phone */}
            <div className="contact-detail-group">
              <div className="contact-detail-label">Phone & Hotline</div>
              <a href="tel:+918056810080" className="contact-detail-value highlight">
                +91 80568 10080
              </a>
              <span className="contact-sub-text">24/7 Breakdown, Shutdown & Project Support</span>
            </div>

            {/* Email */}
            <div className="contact-detail-group">
              <div className="contact-detail-label">Official Correspondence</div>
              <div className="contact-detail-value">
                <a href="mailto:admin202@rayyanelectrical.com">
                  admin202@rayyanelectrical.com
                </a>
                <a href="mailto:rayyanelectrical203@gmail.com">
                  rayyanelectrical203@gmail.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="contact-detail-group">
              <div className="contact-detail-label">Registered Office & Work Centre</div>
              <div className="contact-detail-value" style={{ lineHeight: 1.7 }}>
                Plot No. A-107, 1st Floor,<br />
                Raga Apartments, Panruti, Kandigai,<br />
                Oragadam Industrial Area, Oragadam,<br />
                Kancheepuram, Tamil Nadu – 631 604, India.
              </div>
            </div>

            {/* Statutory Tax Badges */}
            <div className="contact-tax-grid">
              <div className="contact-tax-item">
                <label>GSTIN</label>
                <span>33BBMPA2863D1Z2</span>
              </div>
              <div className="contact-tax-item">
                <label>PAN</label>
                <span>BBMPA2863D</span>
              </div>
            </div>

            {/* Industrial Corridor Coverage Badge */}
            <div className="corridor-card">
              <div className="corridor-badge-title">
                <span className="live-dot" />
                <span>30-Minute Rapid Response Zone</span>
              </div>
              <p className="corridor-desc">
                Serving Oragadam, Sriperumbudur, Maraimalai Nagar, Vallam Vadagal, and Irungattukottai industrial clusters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
