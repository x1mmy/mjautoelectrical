import { useEffect } from 'react'
import './App.css'

function App() {
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
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - (1 - t) ** 3
            el.textContent = Math.round(target * eased)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          counterIO.unobserve(el)
        })
      },
      { threshold: 0.5 },
    )
    counters.forEach((el) => counterIO.observe(el))

    const nav = document.querySelector('.nav')
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      io.disconnect()
      counterIO.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    window.alert("Thanks - we'll be in touch shortly.")
  }

  return (
    <>
      <div className="utility">
        <div className="wrap utility-inner">
          <div className="utility-l">
            <span className="live">Open · Mon-Fri · 8:00-4:30</span>
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
          <a href="#" className="logo">
            <span className="logo-mark">M&J</span>
            <span className="logo-text">
              <span>Auto Electrics</span>
              <small>Est. 1980 · Merrylands NSW</small>
            </span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#diagnostics">Diagnostics</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <a href="tel:0296373605" className="nav-cta">
            Call (02) 9637 3605
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Auto Electrical Specialists · Sydney</div>
            <h1>
              <span className="line">
                <span>Sydney&apos;s most</span>
              </span>
              <span className="line">
                <span>
                  <em>trusted</em> auto
                </span>
              </span>
              <span className="line">
                <span>electrical garage.</span>
              </span>
            </h1>
            <p className="hero-sub">
              Family-run since 1980. Diagnostics, Smart Start Interlocks, air conditioning, 4WD
              electrical - all done right the first time.
            </p>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary">
                Book a Service
              </a>
              <a href="tel:0296373605" className="btn btn-ghost">
                (02) 9637 3605
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=1200&q=80"
              alt="Auto electrical workshop"
            />
            <span className="hero-visual-tag">
              <span className="dot"></span>Latest G-Scan 2 Diagnostics
            </span>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          <div className="stat reveal">
            <div className="num">
              <span data-count="46">46</span>
              <sup>YRS</sup>
            </div>
          </div>
          <div className="stat reveal">
            <div className="num">
              <span data-count="2">2</span>
              <sup>MIN</sup>
            </div>
          </div>
          <div className="stat reveal">
            <div className="num">
              $<span data-count="50">50</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light" id="services">
        <div className="wrap section-head">
          <div>
            <div className="section-tag">01 - Services</div>
            <h2 className="section-title">Specialist work, done properly.</h2>
          </div>
        </div>
      </section>

      <section className="section section-paper" id="diagnostics">
        <div className="wrap feature-split">
          <div className="feature-visual reveal">
            <img
              src="https://images.unsplash.com/photo-1597766353939-3b1ecdaaa9c7?w=1400&q=80"
              alt="G-Scan 2 diagnostic equipment"
            />
          </div>
          <div className="feature-content reveal">
            <h3>The fault stays hidden until the right tool finds it.</h3>
            <p>
              We use G-Scan 2 diagnostics across SRS, ABS, engine and body control modules so you
              get an accurate answer quickly.
            </p>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="wrap contact-grid">
          <div className="contact-info reveal">
            <div className="contact-info-item">
              <div className="lbl">Call</div>
              <a href="tel:0296373605" className="val">
                (02) 9637 3605
              </a>
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={onSubmit}>
            <h4>Send us a message</h4>
            <div className="form-row two">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" type="text" required placeholder="Full name" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" required placeholder="04XX XXX XXX" />
              </div>
            </div>
            <button type="submit">Send message -&gt;</button>
          </form>
        </div>
      </section>

      <footer>
        <div className="wrap footer-bottom">
          <span>© M&amp;J Auto Electrics NSW Pty Ltd · Est. 1980</span>
          <span>ABN 00 000 000 000 · NSW MVRL Licensed</span>
        </div>
      </footer>

      <a href="tel:0296373605" className="mobile-call">
        Tap to call · (02) 9637 3605
      </a>
    </>
  )
}

export default App
