import { useEffect, useId, useRef, useState } from 'react'
import './App.css'

const FAQ_ITEMS = [
  {
    q: 'How much does car electrical diagnostics cost?',
    a: "Diagnostic and servicing work starts at $50. The final cost depends on the fault found and the repair required — we'll quote you before any work begins, no surprises.",
  },
  {
    q: 'What car makes do you specialise in?',
    a: "We're confident specialists on Audi, BMW, Jeep and Citroën — including ECU repairs, climate control diagnostics and electronic systems. We service every other make on the road too: Toyota, Ford, Holden, Mazda, Hyundai, Mercedes, VW and the rest.",
  },
  {
    q: 'How much does a Smart Start Interlock installation cost?',
    a: "Installation starts at $500. We'll walk you through what's involved when you call — including the cheapest monthly service rate on the market.",
  },
  {
    q: 'How much does a car air-conditioning regas cost?',
    a: "Regas starts at $165. The price varies depending on your vehicle and how much refrigerant is needed. A standard regas takes 45–60 minutes; if there's a leak or fault, diagnosis and repair will add time.",
  },
  {
    q: 'How long does a Smart Start Interlock installation take?',
    a: 'Typically 1–2 hours depending on the vehicle. Please book in advance so we can get the install slot organised properly.',
  },
  {
    q: 'What makes an auto electrician different from a regular mechanic?',
    a: "Auto electricians specialise in vehicle electrical systems — wiring, sensors, batteries, alternators and electronic modules — which most general mechanics don't diagnose in depth. We focus exclusively on electrical work, so faults get found faster and fixed correctly the first time.",
  },
  {
    q: 'What are the signs my car has an electrical fault?',
    a: "Common signs: a warning light on the dash, a car that won't start or starts intermittently, flickering lights, or a battery that keeps going flat. If any of these are happening, a $50 diagnostic check will identify the cause.",
  },
  {
    q: 'Do you service all areas of Sydney?',
    a: "We're based at 173 Pitt St in Merrylands — Western Sydney — and we see customers from across the greater Sydney region. The shop is a 2-minute walk to Merrylands station, so plenty of customers drop and run.",
  },
]

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function StarIcon({ dim }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={dim ? { opacity: 0.45 } : undefined}>
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
    </svg>
  )
}

function GooglePinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4.5 8-12a8 8 0 1 0-16 0c0 7.5 8 12 8 12z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function UtilityBar() {
  return (
    <div className="utility">
      <div className="wrap">
        <div className="util-l">
          <span className="live">
            <span className="dot" /> Workshop open • Mon–Fri 8:00–4:30
          </span>
        </div>
        <div className="util-r">
          <span>173 Pitt St, Merrylands NSW</span>
          <span className="phone-mini">02 9637 3605</span>
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a href="/" className="brand" aria-label="M&J Auto Electrics home">
          <span className="brand-mark">
            <span>M&amp;J</span>
          </span>
          <span className="brand-name">
            <b>M&amp;J Auto Electrics</b>
            <small>NSW PTY LTD · Est. 1980</small>
          </span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#interlocks">Smart Start</a>
          <a href="#parts">Parts</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="tel:0296373605" className="cta-call">
          <PhoneIcon />
          <span className="cta-text">Call 02 9637 3605</span>
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="badge label">
                <svg
                  className="ico"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2 4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5z" />
                </svg>
                Family-run · 46 years
              </span>
              <span className="badge label">
                <svg
                  className="ico"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: 'var(--signal)' }}
                >
                  <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
                </svg>
                4.2 ★ · 106 Google reviews
              </span>
              <span className="badge label">
                <svg
                  className="ico"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                2 min walk to station
              </span>
            </div>

            <h1 className="hero-title">
              <span className="line">
                <span>Diagnosing</span>
              </span>
              <span className="line">
                <span>
                  Sydney&apos;s <em>cars.</em>
                </span>
              </span>
              <span className="line">
                <span>Since 1980.</span>
              </span>
            </h1>

            <p className="hero-sub">
              The same workshop on Pitt St in Merrylands. Three generations of drivers. SRS &amp; ABS faults,
              electrical gremlins, air-con regas, Smart Start Interlock fitments — all done by qualified auto
              electricians, not general mechanics.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn--primary">
                Book a diagnostic
                <svg
                  className="arr"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="tel:0296373605" className="btn btn--ghost">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                02 9637 3605
              </a>
            </div>
          </div>

          <aside className="readout" data-reveal>
            <div className="readout-head">
              <span>
                <span className="live-dot" />
                G-SCAN 2 · Live readout
              </span>
              <span>VIN ··· 47KM</span>
            </div>
            <div className="readout-row">
              <span className="k">Module</span>
              <span className="v">SRS / ABS</span>
            </div>
            <div className="readout-row">
              <span className="k">DTC Status</span>
              <span className="v ok">
                Cleared ✓
              </span>
            </div>
            <div className="readout-row">
              <span className="k">Battery health</span>
              <span className="v ok">
                12.6 V · OK
              </span>
            </div>
            <div className="readout-row">
              <span className="k">A/C charge</span>
              <span className="v amber">Regas advised</span>
            </div>
            <div className="readout-row">
              <span className="k">Quote</span>
              <span className="v">From $50</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function MarqueeSection() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>
          <span className="hi">SRS Diagnostics</span>
          <span className="star">✻</span> <span>ABS Faults</span>
          <span className="star">✻</span> <span className="hi">Smart Start Interlocks</span>
          <span className="star">✻</span> <span>Air-Con Regas</span>
          <span className="star">✻</span> <span className="hi">Battery &amp; Alternator</span>
          <span className="star">✻</span> <span>4WD Lighting</span>
          <span className="star">✻</span>
        </span>
        <span>
          <span className="hi">SRS Diagnostics</span>
          <span className="star">✻</span> <span>ABS Faults</span>
          <span className="star">✻</span> <span className="hi">Smart Start Interlocks</span>
          <span className="star">✻</span> <span>Air-Con Regas</span>
          <span className="star">✻</span> <span className="hi">Battery &amp; Alternator</span>
          <span className="star">✻</span> <span>4WD Lighting</span>
          <span className="star">✻</span>
        </span>
      </div>
    </div>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats-grid">
          <div className="stat" data-reveal>
            <div className="num tnum">
              <span data-count="46">0</span>
            </div>
            <div className="lbl">Years on Pitt St · Est. 1980</div>
          </div>
          <div className="stat" data-reveal>
            <div className="num tnum">
              $<span data-count="50">0</span>
            </div>
            <div className="lbl">Diagnostic from</div>
          </div>
          <div className="stat" data-reveal>
            <div className="num tnum">
              <span data-count="2">0</span>
              <em>·</em>min
            </div>
            <div className="lbl">Walk to Merrylands Stn.</div>
          </div>
          <div className="stat" data-reveal>
            <div className="num tnum">
              4<em>·</em>2<em>★</em>
            </div>
            <div className="lbl">From 106 Google reviews</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

function Services() {
  return (
    <section id="services" className="services section-pad">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-num">/01 — Services</div>
            <h2>
              What we
              <br />
              actually <em>fix.</em>
            </h2>
          </div>
          <p>
            We&apos;re auto <em>electricians</em> — specialised in vehicle electrical systems: wiring, sensors,
            modules, alternators, batteries, ECUs. The stuff most general mechanics won&apos;t touch in depth.
            Confident specialists on <b>Audi, BMW, Jeep and Citroën</b> — at home with everything else on the road.
          </p>
        </div>

        <div className="svc-grid">
          <article className="svc" data-reveal>
            <div className="svc-head">
              <div className="svc-num">/01</div>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h3l2-8 4 16 2-8h7" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="svc-title">
                SRS &amp;
                <br />
                ABS Diagnostics
              </h3>
              <p className="svc-desc">
                Latest G-Scan 2 equipment reads SRS, ABS and on-board control modules across every modern make.
              </p>
            </div>
            <div className="svc-foot">
              <span className="price">From $50</span>
              <span className="arr">
                <ArrowIcon />
              </span>
            </div>
          </article>

          <article className="svc" data-reveal>
            <div className="svc-head">
              <div className="svc-num">/02</div>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h4M18 12h4M12 2v4M12 18v4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="svc-title">
                Air-Con
                <br />
                Regas &amp; Service
              </h3>
              <p className="svc-desc">
                Lost cool? Full regas, leak detection and component repair. Standard regas takes 45–60 minutes.
              </p>
            </div>
            <div className="svc-foot">
              <span className="price">From $165</span>
              <span className="arr">
                <ArrowIcon />
              </span>
            </div>
          </article>

          <article className="svc" data-reveal>
            <div className="svc-head">
              <div className="svc-num">/03</div>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="16" height="10" rx="2" />
                  <path d="M22 11v2" />
                  <path d="M6 11v2M10 11v2" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="svc-title">
                Battery,
                <br />
                Alt &amp; Starter
              </h3>
              <p className="svc-desc">
                Won&apos;t start? Flat battery? We test, repair, recondition and rebuild starters and alternators
                in-house.
              </p>
            </div>
            <div className="svc-foot">
              <span className="price">Quote on call</span>
              <span className="arr">
                <ArrowIcon />
              </span>
            </div>
          </article>

          <article className="svc" data-reveal>
            <div className="svc-head">
              <div className="svc-num">/04</div>
              <div className="svc-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="svc-title">
                4WD Lighting
                <br />
                &amp; Accessories
              </h3>
              <p className="svc-desc">
                Driving lights, light bars, dual battery, isolators, UHF — installed properly, wired neatly, every time.
              </p>
            </div>
            <div className="svc-foot">
              <span className="price">Quote on call</span>
              <span className="arr">
                <ArrowIcon />
              </span>
            </div>
          </article>
        </div>

        <div className="also-do" data-reveal>
          <span className="lead">We also do</span>
          <span className="tag">ECU Repairs</span>
          <span className="tag">Log Book Servicing</span>
          <span className="tag">Reversing Cameras &amp; Sensors</span>
          <span className="tag">Car Security</span>
          <span className="tag">Wiring Repairs</span>
          <span className="tag">Climate Control Diagnostics</span>
          <span className="tag">Solar Panels</span>
          <span className="tag">Charging Systems</span>
          <span className="tag">Commercial Vehicles</span>
          <span className="tag">Vehicle Breakdowns</span>
        </div>
      </div>
    </section>
  )
}

function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Interlocks() {
  return (
    <section id="interlocks" className="interlocks section-pad">
      <div className="wrap">
        <div className="intl-grid">
          <div className="intl-vis" data-reveal aria-hidden="true">
            <div className="signal-stack">
              <div className="lamp red" />
              <div className="lamp amber" />
              <div className="lamp green" />
            </div>
            <div className="intl-vis-cap">
              <b>Smart Start Interlocks</b>
              <br />
              Authorised NSW agent
            </div>
          </div>
          <div className="intl-body" data-reveal>
            <div className="section-num">/02 — Smart Start Interlocks</div>
            <h2>
              Separating <em>drinking</em>
              <br />
              from driving.
            </h2>
            <p>
              Court-ordered an Interlock device? We&apos;re an authorised Smart Start NSW agent and proudly distribute
              Smart Start Interlocks Australia, the franchisee of Smart Start Inc — North America&apos;s leader in
              alcohol ignition interlock devices. Installation in 1–2 hours, fully compliant with the NSW alcohol
              interlock program.
            </p>

            <ul className="intl-list">
              <li>
                <span className="tick">
                  <TickIcon />
                </span>{' '}
                Professionally installed without damage to the vehicle
              </li>
              <li>
                <span className="tick">
                  <TickIcon />
                </span>{' '}
                Fully qualified specialist auto electricians on every job
              </li>
              <li>
                <span className="tick">
                  <TickIcon />
                </span>{' '}
                Cheapest monthly service on the market
              </li>
              <li>
                <span className="tick">
                  <TickIcon />
                </span>{' '}
                Discreet design — minimal delay and fuss
              </li>
              <li>
                <span className="tick">
                  <TickIcon />
                </span>{' '}
                Best advice over the phone, 24 hours, 7 days a week
              </li>
            </ul>

            <div className="hero-actions" style={{ marginTop: '36px' }}>
              <a href="tel:0296373605" className="btn btn--primary">
                Book installation · From $500
                <svg
                  className="arr"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#faq" className="btn btn--ghost">
                Read the FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PartnerSet() {
  return (
    <>
      <div className="partner partner-smartstart">
        <div className="ss-light">
          <i className="r" />
          <i className="y" />
          <i className="g" />
        </div>
        <div className="ss-text">
          Smart
          <br />
          Start
          <br />
          <small>Authorised</small>
        </div>
      </div>
      <div className="partner">
        <div className="partner-philips">
          Philips<small>Lighting</small>
        </div>
      </div>
      <div className="partner">
        <div className="partner-redarc">
          <div className="name">REDARC</div>
          <small>Power Conversion</small>
        </div>
      </div>
      <div className="partner partner-mta">
        <div className="mta-shield">MTA</div>
        <div className="mta-text">
          NSW
          <br />
          Member
        </div>
      </div>
    </>
  )
}

function Partners() {
  return (
    <section className="partners">
      <div className="wrap">
        <div className="partners-head" data-reveal>
          <span className="label label--red">/03 — Trusted by the brands we install</span>
          <h3>Authorised partners</h3>
        </div>
      </div>
      <div className="partner-track-wrap">
        <div className="partner-track">
          {[0, 1, 2].map((i) => (
            <PartnerSet key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials section-pad">
      <div className="wrap">
        <div className="t-grid">
          <div className="t-aside" data-reveal>
            <div className="section-num">/04 — What Sydney drivers say</div>
            <h2>
              Earned over
              <br />
              <em>106</em> reviews.
            </h2>

            <div className="rating-row">
              <span className="rating-big tnum">
                4<em>·</em>2
              </span>
              <div>
                <div className="stars">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon dim />
                </div>
                <div className="rating-meta" style={{ marginTop: '8px' }}>
                  <b>4.2 / 5</b> · Google Reviews
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--bone-2)', marginTop: '24px', lineHeight: 1.7, maxWidth: '380px' }}>
              The reviews keep saying the same thing — honest workshop, finds the actual fault, doesn&apos;t guess.
              Forty-six years in the same spot tends to do that.
            </p>
          </div>

          <div className="t-cards">
            <article className="t-card" data-reveal>
              <span className="quote-mark">&quot;</span>
              <div className="stars-mini">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <blockquote>
                Pulled the alternator down to confirm the actual fault — no guessing — then sorted the fuel leak the
                same trip. Couldn&apos;t recommend them more.
              </blockquote>
              <div className="by">
                <b>— Verified customer</b>
                <span className="src">
                  <GooglePinIcon />
                  Google
                </span>
              </div>
            </article>

            <article className="t-card" data-reveal>
              <span className="quote-mark">&quot;</span>
              <div className="stars-mini">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <blockquote>
                Honest, hard-working owner — and the team match him. That&apos;s the kind of workshop you stick with.
              </blockquote>
              <div className="by">
                <b>— Verified customer</b>
                <span className="src">
                  <GooglePinIcon />
                  Google
                </span>
              </div>
            </article>

            <article className="t-card" data-reveal>
              <span className="quote-mark">&quot;</span>
              <div className="stars-mini">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <blockquote>
                Great people. Great service. We&apos;ve been bringing the family cars here for years and won&apos;t go
                anywhere else.
              </blockquote>
              <div className="by">
                <b>— Verified customer</b>
                <span className="src">
                  <GooglePinIcon />
                  Google
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

function Parts() {
  return (
    <section id="parts" className="parts section-pad">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="section-num">/05 — Parts &amp; Accessories</div>
            <h2>
              Off the shelf
              <br />
              or <em>fitted on site.</em>
            </h2>
          </div>
          <p>
            Walk-in or call ahead. We stock and supply the gear we trust to fit on customer vehicles every day — no
            internet specials with mystery warranties.
          </p>
        </div>

        <div className="parts-grid">
          <article className="part" data-reveal>
            <div className="part-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="16" height="10" rx="2" />
                <path d="M22 11v2" />
                <path d="M6 11v2M10 11v2" />
              </svg>
            </div>
            <h4>
              Car
              <br />
              Batteries
            </h4>
            <div className="part-meta">Test · Supply · Fit</div>
          </article>
          <article className="part" data-reveal>
            <div className="part-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 12a9 9 0 0 1 18 0M3 12a9 9 0 0 0 18 0" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h4>
              Car
              <br />
              Accessories
            </h4>
            <div className="part-meta">Genuine &amp; aftermarket</div>
          </article>
          <article className="part" data-reveal>
            <div className="part-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17h2l1-3h12l1 3h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path d="M5 11V7h14v4" />
              </svg>
            </div>
            <h4>
              4WD
              <br />
              Equipment
            </h4>
            <div className="part-meta">REDARC · Dual battery</div>
          </article>
          <article className="part" data-reveal>
            <div className="part-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21h6M12 17v4M7 4h10v9a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z" />
              </svg>
            </div>
            <h4>
              Driving
              <br />
              Lighting
            </h4>
            <div className="part-meta">Philips · LED upgrades</div>
          </article>
        </div>
      </div>
    </section>
  )
}

function FaqPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section id="faq" className="faq section-pad">
      <div className="wrap">
        <div className="faq-grid">
          <div className="faq-aside" data-reveal>
            <div className="section-num">/06 — Frequently asked</div>
            <h2>
              Real questions
              <br />
              <em>from real</em> drivers.
            </h2>
            <p>
              Everything we get asked over the phone, written out plain. Still stuck? Give us a ring — best advice over
              the phone, 7 days.
            </p>

            <div className="ph-card">
              <span className="label">Talk to a real auto sparky</span>
              <a className="phn" href="tel:0296373605">
                02 9637 3605
              </a>
            </div>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={item.q} className={`faq-item${openIndex === i ? ' open' : ''}`}>
                <button type="button" className="faq-q" aria-expanded={openIndex === i} onClick={() => toggle(i)}>
                  {item.q}
                  <span className="plus">
                    <FaqPlusIcon />
                  </span>
                </button>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniMap() {
  const uid = useId()
  const streetsId = `${uid}-streets`
  const streets2Id = `${uid}-streets2`
  return (
    <div className="mini-map" aria-hidden="true">
      <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={streetsId} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 H40 M20 0 V40" stroke="#1c1c1c" strokeWidth="1" />
          </pattern>
          <pattern id={streets2Id} width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M-10 50 L90 50 M40 -10 L40 90" stroke="#252525" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#0d0d0d" />
        <rect width="100%" height="100%" fill={`url(#${streetsId})`} />
        <rect width="100%" height="100%" fill={`url(#${streets2Id})`} />
        <path d="M0 110 Q100 100 200 115 T400 130" stroke="#3a3a3a" strokeWidth="3" fill="none" opacity=".7" />
        <path d="M180 0 L210 220" stroke="#e8362f" strokeWidth="2" strokeDasharray="4 6" opacity=".4" />
        <text x="14" y="28" fill="#3a3a3a" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2">
          PARRAMATTA RD
        </text>
        <text x="14" y="200" fill="#3a3a3a" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2">
          M4 MOTORWAY
        </text>
        <text x="225" y="80" fill="#3a3a3a" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="2">
          PITT ST
        </text>
      </svg>
      <div className="map-pin">
        <svg className="pin-svg" viewBox="0 0 24 30" fill="none">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18c0-6.6-5.4-12-12-12z" fill="#e8362f" />
          <circle cx="12" cy="12" r="4" fill="#fff" />
        </svg>
        <span className="pin-pulse" />
      </div>
      <div className="mini-map-cap">
        <b>M&amp;J Auto Electrics</b>
        <br />
        173 Pitt St · Merrylands NSW
      </div>
    </div>
  )
}

function Contact() {
  const formRef = useRef(null)
  const [submitState, setSubmitState] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitState('sending')
    window.setTimeout(() => {
      setSubmitState('sent')
      window.setTimeout(() => {
        setSubmitState('idle')
        formRef.current?.reset()
      }, 2400)
    }, 600)
  }

  return (
    <section id="contact" className="contact section-pad">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-info" data-reveal>
            <div className="section-num">/07 — Find us / Talk to us</div>
            <h2>
              Drop in.
              <br />
              Drop &amp; <em>run.</em>
            </h2>
            <p>
              Two minutes from Merrylands station, the shopping centre and the bus interchange. Leave the car with us in
              the morning — pick it up after lunch, sorted.
            </p>

            <div className="info-blocks">
              <div className="info-card">
                <span className="label">Workshop</span>
                <a
                  className="v"
                  href="https://maps.google.com/?q=173+Pitt+St+Merrylands+NSW"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  173 Pitt St,
                  <br />
                  Merrylands NSW 2160
                  <small>Open in Google Maps →</small>
                </a>
              </div>
              <div className="info-card">
                <span className="label">Phone</span>
                <a className="v" href="tel:0296373605">
                  02 9637 3605
                  <small>Mon–Fri · 8:00–4:30</small>
                </a>
              </div>
              <div className="info-card">
                <span className="label">Email</span>
                <a className="v" href="mailto:service@mjautoelectrics.com.au">
                  service@
                  <br />
                  mjautoelectrics.com.au
                  <small>Reply within 1 business day</small>
                </a>
              </div>
              <div className="info-card">
                <span className="label">Booking</span>
                <a className="v" href="tel:0296373605">
                  Call to book
                  <small>Walk-ins welcome</small>
                </a>
              </div>
            </div>

            <MiniMap />
          </div>

          <div className="form-card" data-reveal>
            <div className="form-head">
              <h3>
                Quote me
                <br />
                before you start.
              </h3>
              <span className="form-num">/07.01</span>
            </div>

            <form id="enquiry" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" placeholder="John Smith" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="0400 000 000" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@email.com" required />
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="vehicle">Vehicle</label>
                  <input id="vehicle" name="vehicle" type="text" placeholder="2018 Toyota Hilux" />
                </div>
                <div className="field">
                  <label htmlFor="service">Service required</label>
                  <select id="service" name="service" defaultValue="Diagnostic ($50)">
                    <option>Diagnostic ($50)</option>
                    <option>Air-con regas ($165)</option>
                    <option>Smart Start Interlock ($500)</option>
                    <option>Battery / starter / alternator</option>
                    <option>4WD lighting / dual battery</option>
                    <option>Other / not sure</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="msg">Tell us what&apos;s going on</label>
                <textarea
                  id="msg"
                  name="msg"
                  placeholder="Check engine light came on yesterday, A/C also blowing warm…"
                />
              </div>
              <button
                type="submit"
                className="submit"
                style={submitState === 'sent' ? { background: '#1c9a4a' } : undefined}
              >
                {submitState === 'sending' && 'Sending…'}
                {submitState === 'sent' && "✓ Sent — we'll be in touch"}
                {submitState === 'idle' && (
                  <>
                    Send enquiry
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col foot-brand">
            <a href="/" className="brand">
              <span className="brand-mark">
                <span>M&amp;J</span>
              </span>
              <span className="brand-name">
                <b>M&amp;J Auto Electrics</b>
                <small>NSW PTY LTD · Est. 1980</small>
              </span>
            </a>
            <p>
              Family-run auto electrician on Pitt St in Merrylands. Three generations of Sydney drivers, 4.2★ across
              106 Google reviews, one workshop, and a full set of modern diagnostic tools. Proud MTA NSW member.
            </p>
          </div>
          <div className="foot-col">
            <h5>Services</h5>
            <a href="#services">SRS &amp; ABS Diagnostics</a>
            <a href="#services">ECU Repairs</a>
            <a href="#services">Air-con Regas</a>
            <a href="#services">Battery / Starter / Alt</a>
            <a href="#services">4WD &amp; Driving Lights</a>
            <a href="#services">Reversing Cameras</a>
            <a href="#services">Log Book Servicing</a>
            <a href="#interlocks">Smart Start Interlocks</a>
          </div>
          <div className="foot-col">
            <h5>Visit</h5>
            <a href="https://maps.google.com/?q=173+Pitt+St+Merrylands+NSW" target="_blank" rel="noopener noreferrer">
              173 Pitt St, Merrylands NSW 2160
            </a>
            <span style={{ display: 'block', color: 'var(--bone-2)', fontSize: '14px', padding: '6px 0' }}>
              Mon–Fri · 8:00am – 4:30pm
            </span>
            <span style={{ display: 'block', color: 'var(--bone-2)', fontSize: '14px', padding: '6px 0' }}>
              Sat &amp; Sun · Closed
            </span>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <a href="tel:0296373605">02 9637 3605</a>
            <a href="mailto:service@mjautoelectrics.com.au">service@mjautoelectrics.com.au</a>
            <a href="#contact">Send an enquiry →</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 1980–2026 · M&amp;J Auto Electrics NSW Pty Ltd</span>
          <span>Mockup design preview · Site by your-name-here</span>
        </div>
      </div>
    </footer>
  )
}

function StickyCall() {
  return (
    <a href="tel:0296373605" className="sticky-call">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      Call · 02 9637 3605
    </a>
  )
}

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

    const cIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target
          const target = parseInt(el.dataset.count, 10)
          const dur = 1400
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur)
            const eased = 1 - (1 - t) ** 3
            el.textContent = Math.floor(eased * target).toString()
            if (t < 1) requestAnimationFrame(tick)
            else el.textContent = target.toString()
          }
          requestAnimationFrame(tick)
          cIO.unobserve(el)
        })
      },
      { threshold: 0.5 },
    )
    document.querySelectorAll('[data-count]').forEach((c) => cIO.observe(c))

    return () => {
      io.disconnect()
      cIO.disconnect()
    }
  }, [])

  return (
    <>
      <UtilityBar />
      <Header />
      <Hero />
      <MarqueeSection />
      <Stats />
      <Services />
      <Interlocks />
      <Partners />
      <Testimonials />
      <Parts />
      <Faq />
      <Contact />
      <Footer />
      <StickyCall />
    </>
  )
}
