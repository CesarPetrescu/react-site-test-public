import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import { CHALLENGES, ACCENT_COLORS, FINAL_SCORES } from '../data/constants'

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
        <div className="section-label">Competition</div>
        <h1 className="page-title">The Challenges</h1>
        <p className="page-desc">
          Four visual effects of escalating difficulty. Each model gets one shot. No second chances.
        </p>
      </motion.div>
    </section>
  )
}

function DifficultyBar({ level }) {
  return (
    <div className="diff-bar">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`diff-bar-segment ${i < level ? 'active' : ''}`}
          style={{
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  )
}

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

function ChallengeCard({ ch, index }) {
  const [ref, inView] = useFadeIn()

  return (
    <motion.div
      ref={ref}
      className="challenge-block-full"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="challenge-top-bar">
        <div className="challenge-number">Challenge {index + 1}</div>
        <span className={`challenge-diff ${ch.diffClass}`}>Difficulty {ch.difficulty}</span>
      </div>

      <h2 className="challenge-name-lg">{ch.name}</h2>
      <p className="challenge-long-desc">{ch.longDesc}</p>

      <div className="challenge-meta">
        <div className="challenge-meta-label">Technique</div>
        <div className="challenge-meta-value">{ch.technique}</div>
      </div>

      <div className="challenge-meta">
        <div className="challenge-meta-label">Difficulty Level</div>
        <DifficultyBar level={ch.diffNum} />
      </div>

      <div className="challenge-scores-heading">Model Scores</div>
      <div className="scores-row">
        {ch.scores.map((s, si) => (
          <ScoreCell key={si} s={s} delay={0.1 * si} inView={inView} />
        ))}
      </div>
    </motion.div>
  )
}

function Summary() {
  const [ref, inView] = useFadeIn()
  const rankClass = ['gold', 'silver', 'bronze', 'fourth']

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Results</div>
        <h2 className="section-title">Final Rankings</h2>
        <p className="section-subtitle">
          Combined scores across all four challenges.
        </p>
      </motion.div>
      <div className="summary-grid">
        {FINAL_SCORES.map((m, i) => (
          <motion.div
            key={m.id}
            className={`summary-card ${i === 0 ? 'summary-winner' : ''}`}
            data-accent={m.accent}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <div className={`summary-rank ${rankClass[i]}`}>#{m.rank}</div>
            <div className="summary-logo">{m.logo}</div>
            <div className="summary-name">{m.name}</div>
            <div className="summary-company">{m.company}</div>
            <div className="summary-score" style={{ color: ACCENT_COLORS[m.accent] }}>
              {m.total}<span className="summary-score-max">/40</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function ChallengesPage() {
  return (
    <PageTransition>
      <PageHeader />
      <section className="section">
        {CHALLENGES.map((ch, i) => (
          <ChallengeCard key={ch.id} ch={ch} index={i} />
        ))}
      </section>
      <div className="divider" />
      <Summary />
    </PageTransition>
  )
}
