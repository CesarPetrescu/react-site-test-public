import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─── DATA ─── */
const MODELS = [
  { id: 'opus', name: 'Claude Opus 4.5', company: 'Anthropic', accent: 'cyan', logo: 'C' },
  { id: 'gemini', name: 'Gemini 3 Pro', company: 'Google', accent: 'purple', logo: 'G' },
  { id: 'gpt', name: 'GPT 5.2', company: 'OpenAI', accent: 'green', logo: 'O' },
  { id: 'grok', name: 'Grok Code Fast 1', company: 'xAI', accent: 'orange', logo: 'X' },
]

const CHALLENGES = [
  {
    name: 'Image Echo',
    difficulty: '2/10',
    diffClass: 'diff-easy',
    desc: 'An animated loop of stacking images that echo outward. A relatively straightforward CSS animation challenge — should be a warm-up for any competent model.',
    scores: [
      { model: 'Claude Opus 4.5', score: 10, note: 'Flawless execution', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 10, note: 'Perfect', accent: 'purple' },
      { model: 'GPT 5.2', score: 10, note: 'Nailed it', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 7, note: 'Centering issues', accent: 'orange' },
    ],
  },
  {
    name: 'Glowing Border',
    difficulty: '5/10',
    diffClass: 'diff-medium',
    desc: 'A 2×3 grid of cards with a mouse-following glow that bleeds through borders to adjacent cards. Requires nuanced CSS effects and precise mouse tracking.',
    scores: [
      { model: 'Claude Opus 4.5', score: 7, note: 'Faint glow, barely visible border effect', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 9, note: 'Stronger glow, better design sense', accent: 'purple' },
      { model: 'GPT 5.2', score: 8, note: 'Correct behavior, minor border weirdness', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 4, note: 'Glow not confined to border', accent: 'orange' },
    ],
  },
  {
    name: 'Magic Mouse Trailer',
    difficulty: '7/10',
    diffClass: 'diff-hard',
    desc: 'A soft pink glow trails the cursor, spawning animated stars that drift and fade downward. Demands smooth animation with particle-like effects.',
    scores: [
      { model: 'Claude Opus 4.5', score: 8, note: 'Nice stars, but visible circle artifacts in glow', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 9, note: 'Extremely smooth, best animation', accent: 'purple' },
      { model: 'GPT 5.2', score: 7, note: 'All components present but laggy with circle artifacts', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 5, note: 'Star animation OK, but glow entirely missing', accent: 'orange' },
    ],
  },
  {
    name: 'Text Glitch Hover',
    difficulty: '8/10',
    diffClass: 'diff-extreme',
    desc: 'A matrix of randomized alphanumeric characters that scramble on mouse move, masked by a radial gradient following the cursor. The hardest test.',
    scores: [
      { model: 'Claude Opus 4.5', score: 8, note: 'Good overall, missed some border details', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 9, note: 'Text confined to card correctly, minor tweaks needed', accent: 'purple' },
      { model: 'GPT 5.2', score: 6, note: 'Gradient blending broken, translucent white ruins effect', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 3, note: 'No text wrap, gradient masking failed', accent: 'orange' },
    ],
  },
]

const FINAL_SCORES = [
  { ...MODELS[1], total: 37, rank: 1 },
  { ...MODELS[0], total: 33, rank: 2 },
  { ...MODELS[2], total: 31, rank: 3 },
  { ...MODELS[3], total: 19, rank: 4 },
]

const ACCENT_COLORS = {
  cyan: '#00f0ff',
  purple: '#a855f7',
  green: '#22ff88',
  orange: '#ff8c00',
}

/* ─── HOOKS ─── */
function useFadeIn() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return [ref, inView]
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-radial" />
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
        <a href="#results" className="btn btn-primary">See Results</a>
        <a href="#demo" className="btn btn-ghost">Try the Effects</a>
      </motion.div>
      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="arrow" />
      </div>
    </section>
  )
}

/* ─── RULES ─── */
const RULES = [
  { icon: '🎯', title: 'One Prompt Only', desc: 'Each model gets exactly one attempt from a single, detailed text prompt.' },
  { icon: '🚫', title: 'No Follow-ups', desc: 'No refinement or nudging allowed. What you get is what you get.' },
  { icon: '⚖️', title: 'Identical Prompts', desc: 'Every model receives the exact same prompt for each challenge.' },
  { icon: '🔒', title: 'Zero Edits', desc: 'The generated code is rendered as-is with no human modifications.' },
]

function Rules() {
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
            <div className="rule-number">0{i + 1}</div>
            <div className="rule-icon">{r.icon}</div>
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

/* ─── CHALLENGES ─── */
function ScoreCell({ s, delay, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      let frame = 0
      const steps = 20
      const interval = setInterval(() => {
        frame++
        setCount(Math.round((s.score / steps) * frame * 10) / 10)
        if (frame >= steps) { setCount(s.score); clearInterval(interval) }
      }, 30)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, s.score, delay])

  return (
    <div className="score-cell">
      <div className="score-value" style={{ color: ACCENT_COLORS[s.accent] }}>
        {count}<span className="score-max">/10</span>
      </div>
      <div>
        <div className="score-model">{s.model}</div>
        <div className="score-note">{s.note}</div>
      </div>
    </div>
  )
}

function ChallengesSection() {
  return (
    <section className="section" id="results">
      <div className="section-label">Challenges</div>
      <h2 className="section-title">The Gauntlet</h2>
      <p className="section-subtitle">
        Four visual effects of escalating difficulty. Each scored 1–10 on fidelity to the original.
      </p>
      {CHALLENGES.map((ch, ci) => {
        const [ref, inView] = useFadeIn()
        return (
          <motion.div
            key={ci}
            ref={ref}
            className="challenge-block"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="challenge-header">
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 8 }}>
                  CHALLENGE {ci + 1}
                </div>
                <div className="challenge-name">{ch.name}</div>
              </div>
              <span className={`challenge-diff ${ch.diffClass}`}>Difficulty {ch.difficulty}</span>
            </div>
            <div className="challenge-desc">{ch.desc}</div>
            <div className="scores-row">
              {ch.scores.map((s, si) => (
                <ScoreCell key={si} s={s} delay={0.1 * si} inView={inView} />
              ))}
            </div>
          </motion.div>
        )
      })}
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
    </section>
  )
}

/* ─── INTERACTIVE MOUSE DEMO ─── */
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
        char: ['✦', '✧', '⋆', '✶', '✴'][Math.floor(Math.random() * 5)],
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
        style={{ background: 'linear-gradient(180deg, #0a0a18 0%, #0f0f24 100%)' }}
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
        <span style={{ color: 'var(--accent-pink)' }}>●</span> Magic Mouse Trailer — move your cursor above
      </div>
    </div>
  )
}

/* ─── INTERACTIVE GLITCH TEXT DEMO ─── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=-~'

function GlitchTextDemo() {
  const containerRef = useRef(null)
  const [text, setText] = useState('')
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const gen = () => Array.from({ length: 800 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    setText(gen())
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
        <span style={{ color: 'var(--accent-cyan)' }}>●</span> Text Glitch Hover — move your cursor above
      </div>
    </div>
  )
}

/* ─── DEMOS SECTION ─── */
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
      <div style={{ display: 'flex', gap: 12, marginTop: 32, marginBottom: 8 }}>
        {[['trailer', 'Mouse Trailer'], ['glitch', 'Glitch Text']].map(([key, label]) => (
          <button
            key={key}
            className={`btn ${tab === key ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setTab(key)}
            style={{ padding: '10px 20px', fontSize: '0.72rem' }}
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
const TAKEAWAYS = [
  {
    icon: '🏆',
    title: 'AI Is Powerful',
    desc: 'Models can generate complex visual effects from a single prompt. The quality of frontier LLMs is genuinely impressive and continues to improve rapidly.',
  },
  {
    icon: '🛡️',
    title: 'Developers Still Needed',
    desc: 'Blindly trusting AI-generated code ("vibe coding") is risky. Security, correctness, and maintainability still demand human understanding.',
  },
  {
    icon: '⚡',
    title: 'AI as Superpower',
    desc: 'The real advantage goes to developers who understand what the AI produces. A strong programming foundation turns AI into an incredible force multiplier.',
  },
]

function Takeaways() {
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
            <div className="takeaway-icon">{t.icon}</div>
            <div className="takeaway-title">{t.title}</div>
            <div className="takeaway-desc">{t.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── APP ─── */
export default function App() {
  return (
    <>
      <Hero />
      <div className="divider" />
      <Rules />
      <div className="divider" />
      <Contenders />
      <div className="divider" />
      <ChallengesSection />
      <div className="divider" />
      <Leaderboard />
      <div className="divider" />
      <Demos />
      <div className="divider" />
      <Takeaways />
      <footer className="footer">
        UNO SHOT — An experiment in LLM capabilities &nbsp;·&nbsp; 2026
      </footer>
    </>
  )
}
