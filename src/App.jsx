import { useEffect, useState } from 'react'
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import './App.css'

const MAP_EMBED =
  'https://maps.google.com/maps?q=173+Pitt+Street+Merrylands+NSW+2160&t=&z=15&ie=UTF8&iwloc=&output=embed'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const hashLink = (id) =>
    location.pathname === '/' ? `#${id}` : `/#${id}`

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    const counters = document.querySelectorAll('[data-count]')
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const target = Number.parseInt(el.dataset.count ?? '0', 10)
          const duration = 1400
          const start = performance.now()
          const startVal = 0
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - (1 - t) ** 3
            el.textContent = Math.round(startVal + (target - startVal) * eased)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          counterIO.unobserve(el)
        })
      },
      { threshold: 0.5 },
    )
    counters.forEach((c) => counterIO.observe(c))

    const nav = document.querySelector('.nav')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const onResize = () => {
      if (window.innerWidth > 980) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)

    return () => {
      io.disconnect()
      counterIO.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [location.pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const id = requestAnimationFrame(() => setMenuOpen(false))
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="utility">
        <div className="wrap utility-inner">
          <div className="utility-l">
            <span className="live">Open · Mon–Fri · 8:00–4:30</span>
            <span>173 Pitt St, Merrylands NSW 2160</span>
          </div>
          <div className="utility-r">
            <a href="mailto:service@mjautoelectrics.com.au">service@mjautoelectrics.com.au</a>
            <a href="tel:0296373605" className="tel">
              (02) 9637 3605
            </a>
          </div>
        </div>
      </div>

      <nav className="nav">
        <div className="wrap nav-inner">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-mark">M&J</span>
            <span className="logo-text">
              <span>Auto Electrics</span>
              <small>Est. 1980 · Merrylands NSW</small>
            </span>
          </Link>
          <ul
            className={`nav-links${menuOpen ? ' nav-links--panel-open' : ''}`}
          >
            <li>
              <a href={hashLink('services')} onClick={closeMenu}>
                Services
              </a>
            </li>
            <li>
              <a href={hashLink('diagnostics')} onClick={closeMenu}>
                Diagnostics
              </a>
            </li>
            <li>
              <a href={hashLink('interlocks')} onClick={closeMenu}>
                Smart Start
              </a>
            </li>
            <li>
              <a href={hashLink('parts')} onClick={closeMenu}>
                Parts
              </a>
            </li>
            <li>
              <a href={hashLink('faq')} onClick={closeMenu}>
                FAQ
              </a>
            </li>
            <li>
              <a href={hashLink('contact')} onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>
          <a href="tel:0296373605" className="nav-cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call</span>
            <span>(02) 9637 3605</span>
          </a>
          <button
            type="button"
            className={`nav-toggle${menuOpen ? ' nav-toggle--open' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </nav>

      <Outlet />

      <footer>
        <div className="wrap">
          <div className="footer-map-wrap">
            <iframe
              title="M&J Auto Electrics location map"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="footer-grid">
            <div className="footer-brand">
              <h5>M&amp;J Auto Electrics</h5>
              <p>
                Family-run auto electrical specialists serving Sydney since 1980. Authorised Smart
                Start Interlock agent and Philips Lighting partner.
              </p>
            </div>
            <div className="footer-col">
              <h6>Services</h6>
              <ul>
                <li>
                  <Link to="/services/auto-electrics">Auto Electrics</Link>
                </li>
                <li>
                  <a href={hashLink('diagnostics')}>Diagnostics</a>
                </li>
                <li>
                  <a href={hashLink('interlocks')}>Smart Start</a>
                </li>
                <li>
                  <a href={hashLink('services')}>Air Conditioning</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h6>Parts</h6>
              <ul>
                <li>
                  <a href={hashLink('parts')}>Car Battery</a>
                </li>
                <li>
                  <a href={hashLink('parts')}>Accessories</a>
                </li>
                <li>
                  <a href={hashLink('parts')}>4WD Equipment</a>
                </li>
                <li>
                  <a href={hashLink('parts')}>Lighting</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h6>Visit</h6>
              <ul>
                <li>173 Pitt Street</li>
                <li>Merrylands NSW 2160</li>
                <li>
                  <a href="tel:0296373605">(02) 9637 3605</a>
                </li>
                <li>Mon – Fri · 8:00–4:30</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© M&amp;J Auto Electrics NSW Pty Ltd · Est. 1980</span>
            <span>ABN 00 000 000 000 · NSW MVRL Licensed</span>
          </div>
        </div>
      </footer>

      <a href="tel:0296373605" className="mobile-call">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="16"
          height="16"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Tap to call · (02) 9637 3605
      </a>
    </>
  )
}

function HomePage({ onContactSubmit }) {
  return (
    <>
<section className="hero">
  <div className="wrap hero-grid">
    <div>
      <div className="eyebrow">Auto Electrical Specialists · Sydney</div>
      <h1>
        <span className="line"><span>Sydney&rsquo;s most</span></span>
        <span className="line"><span><em>trusted</em> auto</span></span>
        <span className="line"><span>electrical garage.</span></span>
      </h1>
      <p className="hero-sub">
        Family-run since 1980. Diagnostics, Smart Start Interlocks, air conditioning, 4WD electrical — all done right the first time, two minutes from Merrylands station.
      </p>
      <div className="hero-ctas">
        <a href="#contact" className="btn btn-primary">
          Book a Service
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="tel:0296373605" className="btn btn-ghost">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          (02) 9637 3605
        </a>
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="hero-visual">
        <img src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=1200&q=80" alt="Auto electrical workshop" />
        <span className="hero-visual-tag"><span className="dot"></span>Latest G-Scan 2 Diagnostics</span>
      </div>
      <div className="hero-meta">
        <div className="hero-meta-block">
          <div className="label">Diagnostics from</div>
          <div className="val">$50<span style={{ fontSize: "0.5em", color: "var(--c-mute)", marginLeft: "0.4rem" }}>incl. fault scan</span></div>
          <div className="desc">No-obligation quote before any work begins.</div>
        </div>
      </div>
    </div>
  </div>
  <div className="scroll-cue">Scroll</div>
</section>


<div className="ticker">
  <div className="ticker-track">
    <span>Auto Electrics</span>
    <span>SRS &amp; ABS Diagnostics</span>
    <span>Smart Start Interlocks</span>
    <span>Air Conditioning Re-gas</span>
    <span>Battery Replacement</span>
    <span>4WD Electrical</span>
    <span>Starter Motors &amp; Alternators</span>
    <span>Auto Electrics</span>
    <span>SRS &amp; ABS Diagnostics</span>
    <span>Smart Start Interlocks</span>
    <span>Air Conditioning Re-gas</span>
    <span>Battery Replacement</span>
    <span>4WD Electrical</span>
    <span>Starter Motors &amp; Alternators</span>
  </div>
</div>


<section className="stats">
  <div className="wrap stats-grid">
    <div className="stat reveal">
      <div className="num"><span data-count="46">46</span><sup>YRS</sup></div>
      <div className="lbl">Servicing Sydney since 1980 — three generations of expertise.</div>
    </div>
    <div className="stat reveal">
      <div className="num"><span data-count="2">2</span><sup>MIN</sup></div>
      <div className="lbl">Walk from Merrylands station, shopping &amp; transport — drop and run.</div>
    </div>
    <div className="stat reveal">
      <div className="num">$<span data-count="50">50</span></div>
      <div className="lbl">Starting cost for a full electrical diagnostic scan.</div>
    </div>
    <div className="stat reveal">
      <div className="num">100<sup>%</sup></div>
      <div className="lbl">Authorised Smart Start Interlock agent for NSW alcohol interlock program.</div>
    </div>
  </div>
</section>


<section className="section section-light" id="services">
  <div className="wrap">
    <div className="section-head">
      <div>
        <div className="section-tag">01 — Services</div>
        <h2 className="section-title">Specialist work, <em>done properly</em>.</h2>
      </div>
      <a href="#contact" className="section-link">Get a quote →</a>
    </div>

    <div className="services-grid">
      <a href="#" className="svc-card reveal">
        <img className="svc-card-img" src="https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1400&q=80" alt="Auto electrical diagnostics" />
        <div className="svc-card-overlay"></div>
        <span className="svc-card-price"><strong>From</strong> $50</span>
        <span className="svc-card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l10-10M7 7h10v10"/></svg>
        </span>
        <div className="svc-card-content">
          <div className="svc-card-num">SVC / 01</div>
          <h3 className="svc-card-title">Auto Electrical Diagnostics</h3>
          <p className="svc-card-desc">SRS, ABS and full electrical fault diagnosis using the latest G-Scan 2 equipment. We find faults faster — and quote before any work begins.</p>
        </div>
      </a>

      <a href="#" className="svc-card reveal">
        <img className="svc-card-img" src="https://images.unsplash.com/photo-1635775017492-1eb935a082a2?w=1200&q=80" alt="Smart Start Interlocks" />
        <div className="svc-card-overlay"></div>
        <span className="svc-card-price"><strong>From</strong> $500</span>
        <span className="svc-card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l10-10M7 7h10v10"/></svg>
        </span>
        <div className="svc-card-content">
          <div className="svc-card-num">SVC / 02</div>
          <h3 className="svc-card-title">Smart Start Interlocks</h3>
          <p className="svc-card-desc">Authorised NSW agent. Professional install in 1–2 hours, fully compliant with the alcohol interlock program.</p>
        </div>
      </a>

      <a href="#" className="svc-card reveal">
        <img className="svc-card-img" src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1200&q=80" alt="Car air conditioning" />
        <div className="svc-card-overlay"></div>
        <span className="svc-card-price"><strong>Re-gas</strong> from $165</span>
        <span className="svc-card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l10-10M7 7h10v10"/></svg>
        </span>
        <div className="svc-card-content">
          <div className="svc-card-num">SVC / 03</div>
          <h3 className="svc-card-title">Car Air Conditioning</h3>
          <p className="svc-card-desc">Re-gas, leak detection and full system service. 45–60 minute turnaround for a standard re-gas.</p>
        </div>
      </a>

      <a href="/services/auto-electrics" className="svc-card reveal">
        <img className="svc-card-img" src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=80" alt="Starter motors and alternators" />
        <div className="svc-card-overlay"></div>
        <span className="svc-card-price"><strong>New ·</strong> Recon · Repair</span>
        <span className="svc-card-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l10-10M7 7h10v10"/></svg>
        </span>
        <div className="svc-card-content">
          <div className="svc-card-num">SVC / 04</div>
          <h3 className="svc-card-title">Starter Motors &amp; Alternators</h3>
          <p className="svc-card-desc">New, reconditioned, repaired and rebuilt — for cars, 4WDs, trucks and light commercial.</p>
        </div>
      </a>
    </div>
  </div>
</section>


<section className="section section-paper" id="diagnostics">
  <div className="wrap">
    <div className="feature-split">
      <div className="feature-visual reveal">
        <span className="feature-visual-badge">Latest Tech</span>
        <img src="https://images.unsplash.com/photo-1597766353939-3b1ecdaaa9c7?w=1400&q=80" alt="G-Scan 2 diagnostic equipment" />
      </div>
      <div className="feature-content reveal">
        <div className="section-tag">02 — Why Diagnostics Matter</div>
        <h3>The fault stays hidden until the right tool finds it.</h3>
        <p>Most general mechanics don't have specialised diagnostic equipment. We do — the G-Scan 2 reads SRS, ABS, engine, transmission and body control modules across nearly every make and model.</p>
        <ul className="feature-list">
          <li><strong>SRS &amp; ABS systems</strong> — full module-level fault diagnosis</li>
          <li><strong>Check engine lights</strong> — exact fault codes, no guesswork</li>
          <li><strong>Intermittent faults</strong> — the ones general mechanics miss</li>
          <li><strong>All makes &amp; models</strong> — Japanese, European, American, 4WDs</li>
        </ul>
        <a href="#contact" className="btn btn-dark">
          Book a Diagnostic
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>


<section className="section interlock" id="interlocks">
  <div className="wrap">
    <div className="interlock-grid">
      <div className="reveal">
        <div className="section-tag">03 — Smart Start Interlocks</div>
        <h3>Authorised NSW agent for the <em>alcohol interlock</em> program.</h3>
        <p>If you've been required to install an interlock device by NSW courts, we make the process simple. Professional installation, fully compliant, and we'll walk you through the whole thing on the phone before you book in.</p>
        <p>1–2 hour install. No damage to your vehicle. Discreet design.</p>
        <div className="interlock-cta">
          <a href="tel:0296373605" className="btn btn-primary">
            Call Now — (02) 9637 3605
          </a>
          <a href="#contact" className="btn btn-ghost">Send an enquiry</a>
        </div>
      </div>

      <div className="interlock-checks reveal">
        <div className="interlock-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          <span>Professionally installed without damaging your vehicle</span>
        </div>
        <div className="interlock-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          <span>Fully qualified specialist auto electricians</span>
        </div>
        <div className="interlock-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          <span>User friendly, simple device to operate</span>
        </div>
        <div className="interlock-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          <span>24-hour phone support, 7 days a week</span>
        </div>
        <div className="interlock-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          <span>Cheapest monthly service on the market</span>
        </div>
        <div className="interlock-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          <span>Discreet, low-profile device design</span>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="section section-light" id="parts">
  <div className="wrap">
    <div className="section-head">
      <div>
        <div className="section-tag">04 — Parts &amp; Accessories</div>
        <h2 className="section-title">Quality parts, fitted on-site.</h2>
      </div>
      <a href="#contact" className="section-link">Enquire →</a>
    </div>

    <div className="parts-grid">
      <div className="part-card reveal">
        <div className="part-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V3m8 4V3M6 12h2m4 0h2"/></svg>
        </div>
        <h4>Car Battery</h4>
        <p>Premium replacement batteries with on-the-spot fitment. Full electrical health check included.</p>
        <span className="part-card-link">View options</span>
      </div>
      <div className="part-card reveal">
        <div className="part-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
        </div>
        <h4>Car Accessories</h4>
        <p>Stereo, reversing cameras, sensors, dashcams, immobilisers — installed by qualified auto electricians.</p>
        <span className="part-card-link">View options</span>
      </div>
      <div className="part-card reveal">
        <div className="part-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="17" r="2"/><circle cx="18" cy="17" r="2"/><path d="M2 17h2m4 0h8m4 0h2M5 11l2-5h10l2 5"/></svg>
        </div>
        <h4>4WD Equipment</h4>
        <p>Driving lights, dual-battery setups, REDARC products, winches, isolators and bull-bar wiring.</p>
        <span className="part-card-link">View options</span>
      </div>
      <div className="part-card reveal">
        <div className="part-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
        </div>
        <h4>Car Lighting</h4>
        <p>Authorised Philips Lighting partner. LED upgrades, headlights, work lights and emergency lighting.</p>
        <span className="part-card-link">View options</span>
      </div>
    </div>
  </div>
</section>


<section className="partners">
  <div className="wrap">
    <div className="partners-head reveal">
      <div className="section-tag">05 — Trusted Partners</div>
      <h3>Officially partnered with the names that matter.</h3>
    </div>
  </div>
  <div className="partners-marquee">
    <div className="partners-track">
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/smartlock.jpg" alt="Smart Start Interlocks" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/philip-lighting.jpg" alt="Philips Lighting" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/redarc.jpg" alt="REDARC" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/mta-logo.jpg" alt="Motor Traders Association NSW" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/smartlock.jpg" alt="Smart Start Interlocks" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/philip-lighting.jpg" alt="Philips Lighting" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/redarc.jpg" alt="REDARC" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/mta-logo.jpg" alt="Motor Traders Association NSW" /></a>
      
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/smartlock.jpg" alt="Smart Start Interlocks" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/philip-lighting.jpg" alt="Philips Lighting" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/redarc.jpg" alt="REDARC" /></a>
      <a href="#" className="partner-logo"><img src="https://www.mjautoelectrics.com.au/wp-content/uploads/2019/03/mta-logo.jpg" alt="Motor Traders Association NSW" /></a>
    </div>
  </div>
</section>


<section className="section why">
  <div className="wrap">
    <div className="section-head">
      <div>
        <div className="section-tag">06 — Why M&amp;J</div>
        <h2 className="section-title">Three generations. <em>One reputation</em>.</h2>
      </div>
    </div>

    <div className="why-row reveal">
      <div>
        <div className="why-num">01 / Heritage</div>
        <h4>46 years and counting.</h4>
        <p>M&amp;J Auto Electrics has been servicing customers from all over Sydney since 1980. We've watched cars go from carburettors to ECUs to electric drivetrains — and adapted with every step. The expertise compounds.</p>
      </div>
      <div className="why-visual">
        <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1400&q=80" alt="Workshop heritage" />
      </div>
    </div>

    <div className="why-row flip reveal">
      <div>
        <div className="why-num">02 / Specialism</div>
        <h4>Auto electricians, not general mechanics.</h4>
        <p>Auto electricians specialise in vehicle electrical systems — wiring, sensors, batteries, alternators, electronic modules. Most general mechanics don't diagnose this in depth. We focus exclusively on electrical work, so faults get found faster and fixed correctly the first time.</p>
      </div>
      <div className="why-visual">
        <img src="https://images.unsplash.com/photo-1632823471565-1ecdf7a92aa6?w=1400&q=80" alt="Auto electrical specialist work" />
      </div>
    </div>

    <div className="why-row reveal">
      <div>
        <div className="why-num">03 / Convenience</div>
        <h4>Drop and run. Two minutes from the station.</h4>
        <p>We're at 173 Pitt Street, Merrylands — two minutes' walk to the station, the shopping centre and main transport links. Drop your car off, get on with your day, pick it up when it's ready. No hassle, no wasted time.</p>
      </div>
      <div className="why-visual">
        <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1400&q=80" alt="Convenient location Merrylands" />
      </div>
    </div>
  </div>
</section>


<section className="section faq" id="faq">
  <div className="wrap">
    <div className="faq-grid">
      <div>
        <div className="section-tag">07 — Common Questions</div>
        <h2 className="section-title">Straight answers, no hidden fees.</h2>
        <p className="section-lede">If your question isn't here, give us a call — we'll talk you through it on the phone, no obligation.</p>
      </div>

      <div className="faq-list">
        <details className="faq-item" open>
          <summary>How much does car electrical diagnostics cost? <span className="faq-icon"></span></summary>
          <div className="faq-answer">Diagnostic and servicing work starts at $50 at M&amp;J Auto Electrics. The final cost depends on the fault found and the repair required — we'll quote you before any work begins.</div>
        </details>
        <details className="faq-item">
          <summary>How much does a SmartStart Interlock installation cost? <span className="faq-icon"></span></summary>
          <div className="faq-answer">SmartStart Interlock installation starts at $500 — we can walk you through what's involved when you call.</div>
        </details>
        <details className="faq-item">
          <summary>How much does a car air conditioning re-gas cost? <span className="faq-icon"></span></summary>
          <div className="faq-answer">Air conditioning re-gas starts at $165. The price can vary depending on your vehicle and how much refrigerant is needed.</div>
        </details>
        <details className="faq-item">
          <summary>How long does a SmartStart Interlock installation take? <span className="faq-icon"></span></summary>
          <div className="faq-answer">Installation typically takes 1–2 hours depending on the vehicle. Please book in advance to arrange the installation.</div>
        </details>
        <details className="faq-item">
          <summary>How long does an air conditioning re-gas take? <span className="faq-icon"></span></summary>
          <div className="faq-answer">A standard re-gas takes around 45–60 minutes. If there's a leak or a fault in the system, diagnosis and repair will add time.</div>
        </details>
        <details className="faq-item">
          <summary>Do you service all areas of Sydney? <span className="faq-icon"></span></summary>
          <div className="faq-answer">We're based in Merrylands, in Western Sydney, and we see customers from across the greater Sydney region.</div>
        </details>
        <details className="faq-item">
          <summary>What makes an auto electrician different from a regular mechanic? <span className="faq-icon"></span></summary>
          <div className="faq-answer">Auto electricians specialise in vehicle electrical systems — wiring, sensors, batteries, alternators, and electronic modules — which most general mechanics don't diagnose in depth. M&amp;J focuses exclusively on electrical work, so faults get found faster and fixed correctly the first time.</div>
        </details>
        <details className="faq-item">
          <summary>What are the signs my car has an electrical fault? <span className="faq-icon"></span></summary>
          <div className="faq-answer">Common signs include a warning light on your dash, a car that won't start or starts intermittently, flickering lights, or a battery that keeps going flat. If any of these happen, a diagnostic check starting at $50 will identify the cause.</div>
        </details>
        <details className="faq-item">
          <summary>Why is my check engine light on? <span className="faq-icon"></span></summary>
          <div className="faq-answer">A check engine light means your vehicle's computer has logged a fault code — it could be anything from a faulty sensor to an emissions issue. A diagnostic scan will read the exact code and tell you what needs fixing.</div>
        </details>
      </div>
    </div>
  </div>
</section>


<section className="section contact" id="contact">
  <div className="wrap">
    <div className="section-head">
      <div>
        <div className="section-tag">08 — Get In Touch</div>
        <h2 className="section-title">
          Drop the keys. <em>We&apos;ll handle it.</em>
        </h2>
        <p className="section-lede">
          Call now to book in, or send us a message and we&apos;ll be back to you the same day.
        </p>
      </div>
    </div>

    <div className="contact-grid">
      <div className="contact-info reveal">
        <div className="contact-info-item">
          <div className="lbl">Call</div>
          <a href="tel:0296373605" className="val">(02) 9637 3605</a>
        </div>
        <div className="contact-info-item">
          <div className="lbl">Email</div>
          <a href="mailto:service@mjautoelectrics.com.au" className="val">service@mjautoelectrics.com.au</a>
        </div>
        <div className="contact-info-item">
          <div className="lbl">Workshop</div>
          <div className="val">173 Pitt Street, Merrylands<br />NSW 2160</div>
        </div>
        <div className="contact-info-item">
          <div className="lbl">Hours</div>
          <div className="val">Mon – Fri · 8:00 am – 4:30 pm</div>
        </div>
        <div
          style={{
            marginTop: '1rem',
            aspectRatio: '4 / 2.5',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid var(--c-line-dark)',
          }}
        >
          <iframe
            title="Workshop location"
            src="https://maps.google.com/maps?q=173+Pitt+Street+Merrylands+NSW+2160&t=&z=15&ie=UTF8&iwloc=&output=embed"
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              filter: 'invert(0.9) hue-rotate(180deg)',
            }}
            loading="lazy"
          />
        </div>
      </div>

      <form className="contact-form reveal" onSubmit={onContactSubmit}>
        <h4>Send us a message</h4>
        <div className="form-row two">
          <div className="field">
            <label>Your name</label>
            <input type="text" required placeholder="Full name" />
          </div>
          <div className="field">
            <label>Phone</label>
            <input type="tel" required placeholder="04XX XXX XXX" />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label>Email</label>
            <input type="email" required placeholder="you@example.com" />
          </div>
        </div>
        <div className="form-row two">
          <div className="field">
            <label>Service</label>
            <select>
              <option>Auto electrical diagnostic</option>
              <option>Smart Start Interlock</option>
              <option>Air conditioning</option>
              <option>Battery / Alternator / Starter</option>
              <option>Parts &amp; accessories</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label>Vehicle make / model</label>
            <input type="text" placeholder="e.g. Toyota Hilux 2019" />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label>Message</label>
            <textarea placeholder={"Tell us what's going on with your car..."} />
          </div>
        </div>
        <button type="submit">
          Send message →
        </button>
      </form>
    </div>
  </div>
</section>
    </>
  )
}


function AutoElectricsPage() {
  return (
    <>
      <section className="hero" style={{ minHeight: '58vh', padding: 'clamp(2.5rem, 6vw, 4rem) 0' }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="eyebrow">Service</div>
          <h1 style={{ marginBottom: '1rem' }}>
            <span className="line"><span>Auto Electrics</span></span>
          </h1>
          <p
            className="hero-sub"
            style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.85rem' }}
          >
            Starters &amp; alternator repair
          </p>
          <p className="hero-sub" style={{ maxWidth: '640px' }}>
            The electrical systems of today&apos;s cars are complex. Your alternator, starter motor,
            ignition and battery are crucial to performance — and safety.
          </p>
          <div className="hero-ctas">
            <a href="tel:0296373605" className="btn btn-primary">
              Call (02) 9637 3605
            </a>
            <a href="/#contact" className="btn btn-ghost">
              Send an enquiry
            </a>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="feature-split">
            <div className="feature-content reveal in">
              <p style={{ color: 'var(--c-stone)', marginBottom: '1.25rem', maxWidth: '720px' }}>
                The electrical systems of today&apos;s cars are complex and today&apos;s advanced
                automotive technology places increased demands on automotive components. Your
                alternator, starter motor, ignition and battery are all crucial to your
                vehicle&apos;s performance and, more importantly, its safety.
              </p>
              <p style={{ color: 'var(--c-stone)', marginBottom: '1.25rem', maxWidth: '720px' }}>
                More and more of today&apos;s vehicles are controlled by on-board computers — which
                is why the electrical system in modern vehicles is more important than ever.
              </p>
              <p style={{ color: 'var(--c-stone)', marginBottom: '1.25rem', maxWidth: '720px' }}>
                When an alternator or starter motor fails, chances are their components have outlived
                the intended service life.
              </p>
              <p style={{ color: 'var(--c-stone)', marginBottom: '1.5rem', maxWidth: '720px' }}>
                At M&amp;J&apos;s, we specialise in the supply, repair and refurbishment of starter
                motors and alternators for all vehicle makes and models. We offer a full repair and
                replace service so you are never kept waiting any longer than is absolutely necessary
                — and in some cases where your product is no longer available, we are able to rebuild
                one.
              </p>
            </div>
          </div>

          <div className="parts-grid" style={{ marginTop: '2rem' }}>
            <div className="part-card reveal in">
              <h4>Alternators</h4>
              <p>
                The alternator transforms mechanical energy into electrical energy. It sends power to
                essential parts of your vehicle like the headlights, the engine fan, ignition coils
                and various parts of the fuel injection system.
              </p>
            </div>
            <div className="part-card reveal in">
              <h4>Starter motors</h4>
              <p>
                The starter motor changes electrical energy into mechanical energy. It uses
                electricity from the battery to start the crankshaft turning — that gets your car
                going.
              </p>
            </div>
            <div className="part-card reveal in">
              <h4>Inspected by trained professionals</h4>
              <p>
                It&apos;s important to have your alternator or starter motor checked regularly —
                failure isn&apos;t always obvious until it&apos;s too late. We inspect, test and
                repair components across your car&apos;s electrical systems.
              </p>
            </div>
          </div>

          <blockquote
            style={{
              marginTop: '2.5rem',
              padding: '1.25rem 1.5rem',
              borderLeft: '3px solid var(--c-red)',
              background: 'var(--c-cream)',
              borderRadius: '4px',
              fontWeight: 600,
              color: 'var(--c-ink)',
              maxWidth: '720px',
            }}
          >
            Did you know, over 50% of all roadside vehicle breakdowns are electronically related
            faults?
          </blockquote>

          <p style={{ marginTop: '2rem', color: 'var(--c-stone)', maxWidth: '720px' }}>
            M&amp;J&apos;s has been established since 1980 servicing customers from all over Sydney.
            We&apos;re dedicated to delivering the highest quality of service — we&apos;ve adapted
            with every new model and upgrade to vehicle systems, with modern equipment to service your
            car.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <a href="tel:0296373605" className="btn btn-dark">
              Call now — (02) 9637 3605
            </a>
          </div>
        </div>
      </section>

      <section className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span><a href="/#contact" style={{ color: 'inherit' }}>Contact M &amp; J Electrics</a></span>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span><a href="/#contact" style={{ color: 'inherit' }}>Contact M &amp; J Electrics</a></span>
        </div>
      </section>
    </>
  )
}


function App() {
  const onContactSubmit = (e) => {
    e.preventDefault()
    window.alert("Thanks — we'll be in touch shortly.")
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage onContactSubmit={onContactSubmit} />} />
        <Route path="services/auto-electrics" element={<AutoElectricsPage />} />
      </Route>
    </Routes>
  )
}

export default App
