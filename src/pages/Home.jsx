import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import {
  MODELS, CHALLENGES, FINAL_SCORES, ACCENT_COLORS,
  RULES, TAKEAWAYS, CHARS,
} from '../data/constants'

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-radial" />
      <div className="hero-particles">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`hero-particle particle-${i}`} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hero-badge"
      >
        The LLM Visual Challenge
      </motion.div>
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
      >
        <span className="line1">UNO</span>
        <span className="line2">SHOT</span>
      </motion.h1>
      <motion.p
        className="hero-desc"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        One prompt. Zero follow-ups. No edits. Four of the most powerful LLMs battle to recreate complex visual effects from a single text description.
      </motion.p>
      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Link to="/challenges" className="btn btn-primary">See Challenges</Link>
        <Link to="/gallery" className="btn btn-ghost">View Gallery</Link>
      </motion.div>
      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="arrow" />
      </div>
    </section>
  )
}

/* ─── RULES ─── */
function RulesSection() {
  const [ref, inView] = useFadeIn()
  return (
    <section className="section" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="section-label">Protocol</div>
        <h2 className="section-title">The Rules</h2>
        <p className="section-subtitle">
          A strict, fair test designed to isolate each model's raw capability — no hand-holding, no second chances.
        </p>
      </motion.div>
      <div className="rules-grid">
        {RULES.map((r, i) => (
          <motion.div
            key={i}
            className="rule-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * i }}
          >
            <div className="rule-number">{r.icon}</div>
            <div className="rule-title">{r.title}</div>
            <div className="rule-desc">{r.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── CONTENDERS ─── */
function Contenders() {
  const [ref, inView] = useFadeIn()
  return (
    <section className="section" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="section-label">Contenders</div>
        <h2 className="section-title">The Models</h2>
        <p className="section-subtitle">
          Four frontier LLMs, each representing the cutting edge of their respective companies.
        </p>
      </motion.div>
      <div className="contenders-grid">
        {MODELS.map((m, i) => (
          <motion.div
            key={m.id}
            className="contender-card"
            data-accent={m.accent}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <div className="contender-logo">{m.logo}</div>
            <div className="contender-name">{m.name}</div>
            <div className="contender-company">{m.company}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── LEADERBOARD ─── */
function Leaderboard() {
  const [ref, inView] = useFadeIn()
  const rankClass = ['gold', 'silver', 'bronze', 'fourth']
  const barColors = ['linear-gradient(90deg, #00f0ff, #a855f7)', '#c0c0c0', '#cd7f32', '#555570']

  return (
    <section className="section" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="section-label">Final Standings</div>
        <h2 className="section-title">Leaderboard</h2>
        <p className="section-subtitle">
          The final rankings after all four challenges. Total possible score: 40.
        </p>
      </motion.div>
      <div className="leaderboard">
        {FINAL_SCORES.map((m, i) => (
          <motion.div
            key={m.id}
            className={`lb-row ${i === 0 ? 'winner' : ''}`}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 * i }}
          >
            <div className={`lb-rank ${rankClass[i]}`}>#{m.rank}</div>
            <div className="lb-info">
              <div className="lb-name">{m.name}</div>
              <div className="lb-company">{m.company}</div>
            </div>
            <div className="lb-bar-container">
              <motion.div
                className="lb-bar"
                style={{ background: barColors[i] }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${(m.total / 40) * 100}%` } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.3 + 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="lb-score" style={{ color: ACCENT_COLORS[m.accent] }}>
              {m.total}<span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/40</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Link to="/challenges" className="btn btn-primary">Explore All Challenges</Link>
      </div>
    </section>
  )
}

/* ─── DEMOS ─── */
function MouseTrailerDemo() {
  const canvasRef = useRef(null)
  const [stars, setStars] = useState([])
  const [glow, setGlow] = useState({ x: -200, y: -200, visible: false })
  const starId = useRef(0)

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGlow({ x, y, visible: true })
    if (Math.random() > 0.5) {
      const id = ++starId.current
      setStars(prev => [...prev.slice(-30), {
        id,
        x: x + (Math.random() - 0.5) * 40,
        y,
        char: ['\u2726', '\u2727', '\u22C6', '\u2736', '\u2734'][Math.floor(Math.random() * 5)],
      }])
      setTimeout(() => setStars(prev => prev.filter(s => s.id !== id)), 1200)
    }
  }, [])

  return (
    <div className="demo-area">
      <div
        className="demo-canvas"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setGlow(g => ({ ...g, visible: false }))}
      >
        <div
          className="demo-glow"
          style={{
            left: glow.x,
            top: glow.y,
            opacity: glow.visible ? 1 : 0,
            background: 'radial-gradient(circle, rgba(255, 120, 180, 0.3) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)',
          }}
        />
        {stars.map(s => (
          <span key={s.id} className="demo-star" style={{ left: s.x, top: s.y, color: 'rgba(255, 180, 220, 0.9)' }}>
            {s.char}
          </span>
        ))}
      </div>
      <div className="demo-label">
        <span style={{ color: 'var(--accent-pink)' }}>&#9679;</span> Magic Mouse Trailer &mdash; move your cursor above
      </div>
    </div>
  )
}

function GlitchTextDemo() {
  const containerRef = useRef(null)
  const [text, setText] = useState('')
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    setText(Array.from({ length: 800 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''))
  }, [])

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setText(Array.from({ length: 800 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''))
  }, [])

  return (
    <div className="demo-area">
      <div
        className="glitch-demo"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse({ x: -1000, y: -1000 })}
      >
        <div className="glitch-text-grid">{text}</div>
        <div
          className="glitch-mask"
          style={{
            background: `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px, transparent 0%, var(--bg-card) 100%)`,
          }}
        />
      </div>
      <div className="demo-label">
        <span style={{ color: 'var(--accent-cyan)' }}>&#9679;</span> Text Glitch Hover &mdash; move your cursor above
      </div>
    </div>
  )
}

function Demos() {
  const [ref, inView] = useFadeIn()
  const [tab, setTab] = useState('trailer')
  return (
    <section className="section" id="demo" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="section-label">Interactive</div>
        <h2 className="section-title">Try It Yourself</h2>
        <p className="section-subtitle">
          Experience two of the challenge effects live, right here in the browser.
        </p>
      </motion.div>
      <div className="demo-tabs">
        {[['trailer', 'Mouse Trailer'], ['glitch', 'Glitch Text']].map(([key, label]) => (
          <button
            key={key}
            className={`btn ${tab === key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'trailer' ? <MouseTrailerDemo /> : <GlitchTextDemo />}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

/* ─── TAKEAWAYS ─── */
const TAKEAWAY_ICONS = {
  trophy: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/><path d="M10 22V18"/><path d="M14 22V18"/>
      <path d="M6 4h12v5a6 6 0 0 1-12 0V4z"/><path d="M10 18h4a2 2 0 0 0 0-4h-4a2 2 0 0 0 0 4z"/>
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  bolt: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
}

function TakeawaysSection() {
  const [ref, inView] = useFadeIn()
  return (
    <section className="section" ref={ref}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="section-label">Conclusion</div>
        <h2 className="section-title">Key Takeaways</h2>
      </motion.div>
      <div className="takeaway-grid">
        {TAKEAWAYS.map((t, i) => (
          <motion.div
            key={i}
            className="takeaway-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 * i }}
          >
            <div className="takeaway-icon">{TAKEAWAY_ICONS[t.icon]}</div>
            <div className="takeaway-title">{t.title}</div>
            <div className="takeaway-desc">{t.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <div className="divider" />
      <RulesSection />
      <div className="divider" />
      <Contenders />
      <div className="divider" />
      <Leaderboard />
      <div className="divider" />
      <Demos />
      <div className="divider" />
      <TakeawaysSection />
    </PageTransition>
  )
}
