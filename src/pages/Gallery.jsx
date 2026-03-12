import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import { CHALLENGES, MODELS, ACCENT_COLORS, CHARS } from '../data/constants'

function PageHeader() {
  return (
    <section className="page-header">
      <div className="page-header-bg" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="page-header-content"
      >
        <div className="section-label">Showcase</div>
        <h1 className="page-title">Effect Gallery</h1>
        <p className="page-desc">
          Explore the visual effects from each challenge. Interact with live demos and see how each model performed.
        </p>
      </motion.div>
    </section>
  )
}

/* ─── LIVE DEMOS ─── */
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
    <div
      className="gallery-demo-canvas"
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
      <div className="gallery-demo-hint">Move your cursor here</div>
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
    <div
      className="gallery-demo-canvas glitch-canvas"
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
      <div className="gallery-demo-hint">Move your cursor here</div>
    </div>
  )
}

function ImageEchoDemo() {
  return (
    <div className="gallery-demo-canvas echo-canvas">
      <div className="echo-container">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="echo-layer"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function GlowingBorderDemo() {
  const containerRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <div
      className="gallery-demo-canvas glow-border-canvas"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="glow-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glow-card">
            <div
              className="glow-card-glow"
              style={{
                background: `radial-gradient(200px circle at ${mouse.x - (i % 3) * 160}px ${mouse.y - Math.floor(i / 3) * 120}px, rgba(0, 240, 255, 0.15), transparent 70%)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const DEMOS = [
  { id: 'echo', name: 'Image Echo', challenge: 0, component: ImageEchoDemo },
  { id: 'glow', name: 'Glowing Border', challenge: 1, component: GlowingBorderDemo },
  { id: 'trailer', name: 'Mouse Trailer', challenge: 2, component: MouseTrailerDemo },
  { id: 'glitch', name: 'Glitch Text', challenge: 3, component: GlitchTextDemo },
]

function GalleryShowcase() {
  const [ref, inView] = useFadeIn()
  const [activeDemo, setActiveDemo] = useState('echo')
  const ActiveComponent = DEMOS.find(d => d.id === activeDemo)?.component

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Live Effects</div>
        <h2 className="section-title">Interactive Demos</h2>
        <p className="section-subtitle">
          Select an effect below to interact with it live in the browser.
        </p>
      </motion.div>

      <div className="gallery-tabs">
        {DEMOS.map(d => (
          <button
            key={d.id}
            className={`gallery-tab ${activeDemo === d.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(d.id)}
          >
            <span className="gallery-tab-name">{d.name}</span>
            <span className={`gallery-tab-diff ${CHALLENGES[d.challenge].diffClass}`}>
              {CHALLENGES[d.challenge].difficulty}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="gallery-demo-wrapper"
        >
          {ActiveComponent && <ActiveComponent />}
        </motion.div>
      </AnimatePresence>

      <div className="gallery-demo-info">
        <div className="gallery-demo-info-title">
          {CHALLENGES[DEMOS.find(d => d.id === activeDemo).challenge].name}
        </div>
        <div className="gallery-demo-info-desc">
          {CHALLENGES[DEMOS.find(d => d.id === activeDemo).challenge].desc}
        </div>
      </div>
    </section>
  )
}

function ComparisonGrid() {
  const [ref, inView] = useFadeIn()

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Comparison</div>
        <h2 className="section-title">Score Matrix</h2>
        <p className="section-subtitle">
          How each model scored across every challenge.
        </p>
      </motion.div>

      <div className="matrix-table">
        <div className="matrix-header">
          <div className="matrix-cell matrix-corner" />
          {MODELS.map(m => (
            <div key={m.id} className="matrix-cell matrix-model" style={{ color: ACCENT_COLORS[m.accent] }}>
              {m.name}
            </div>
          ))}
        </div>
        {CHALLENGES.map((ch, ci) => (
          <motion.div
            key={ci}
            className="matrix-row"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 * ci }}
          >
            <div className="matrix-cell matrix-challenge">
              <span>{ch.name}</span>
              <span className={`matrix-diff ${ch.diffClass}`}>{ch.difficulty}</span>
            </div>
            {ch.scores.map((s, si) => (
              <div key={si} className="matrix-cell matrix-score">
                <span
                  className="matrix-score-value"
                  style={{ color: ACCENT_COLORS[s.accent] }}
                >
                  {s.score}
                </span>
                <span className="matrix-score-max">/10</span>
              </div>
            ))}
          </motion.div>
        ))}
        <div className="matrix-row matrix-total-row">
          <div className="matrix-cell matrix-challenge">
            <span style={{ fontWeight: 700 }}>Total</span>
          </div>
          {MODELS.map((m, mi) => {
            const total = CHALLENGES.reduce((sum, ch) => sum + ch.scores[mi].score, 0)
            return (
              <div key={mi} className="matrix-cell matrix-score matrix-total">
                <span className="matrix-score-value" style={{ color: ACCENT_COLORS[m.accent] }}>{total}</span>
                <span className="matrix-score-max">/40</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Gallery() {
  return (
    <PageTransition>
      <PageHeader />
      <div className="divider" />
      <GalleryShowcase />
      <div className="divider" />
      <ComparisonGrid />
    </PageTransition>
  )
}
