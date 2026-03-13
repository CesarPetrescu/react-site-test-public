import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import { CHALLENGES, FINAL_SCORES, ACCENT_COLORS } from '../data/constants'

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
        <div className="section-label">Analysis</div>
        <h1 className="page-title">Results & Analysis</h1>
        <p className="page-desc">
          A deep dive into what the scores reveal — performance patterns, surprising outcomes, and what it all means for AI-generated code.
        </p>
      </motion.div>
    </section>
  )
}

function OverviewStats() {
  const [ref, inView] = useFadeIn()
  const allScores = CHALLENGES.flatMap(c => c.scores.map(s => s.score))
  const avgScore = (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1)
  const perfectScores = allScores.filter(s => s === 10).length
  const totalChallenges = CHALLENGES.length
  const highestDifficulty = Math.max(...CHALLENGES.map(c => c.diffNum))

  const stats = [
    { label: 'Average Score', value: `${avgScore}/10`, color: 'var(--accent-cyan)' },
    { label: 'Perfect 10s Awarded', value: `${perfectScores}`, color: 'var(--accent-green)' },
    { label: 'Challenges Run', value: `${totalChallenges}`, color: 'var(--accent-purple)' },
    { label: 'Peak Difficulty', value: `${highestDifficulty}/10`, color: 'var(--accent-pink)' },
  ]

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Overview</div>
        <h2 className="section-title">By the Numbers</h2>
        <p className="section-subtitle">
          High-level statistics from the entire experiment.
        </p>
      </motion.div>
      <div className="rules-grid">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="rule-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 * i }}
          >
            <div className="rule-number" style={{ color: s.color }}>{s.value}</div>
            <div className="rule-title">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function DifficultyAnalysis() {
  const [ref, inView] = useFadeIn()

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Patterns</div>
        <h2 className="section-title">Difficulty vs. Performance</h2>
        <p className="section-subtitle">
          How scores shifted as challenges grew harder — revealing which models truly understand versus which rely on pattern matching.
        </p>
      </motion.div>
      <div className="faq-list">
        {CHALLENGES.map((c, i) => {
          const avgScore = (c.scores.reduce((a, s) => a + s.score, 0) / c.scores.length).toFixed(1)
          const bestModel = c.scores.reduce((best, s) => s.score > best.score ? s : best)
          const worstModel = c.scores.reduce((worst, s) => s.score < worst.score ? s : worst)

          return (
            <motion.div
              key={c.id}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <div className="faq-q">
                {c.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>— Difficulty {c.difficulty}</span>
              </div>
              <div className="faq-a">
                <strong>Average score: {avgScore}/10.</strong> {bestModel.model} led with {bestModel.score}/10 ({bestModel.note.toLowerCase()}). {worstModel.model} scored lowest at {worstModel.score}/10 ({worstModel.note.toLowerCase()}). {c.desc}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function HeadToHead() {
  const [ref, inView] = useFadeIn()
  const comparisons = [
    {
      title: 'Claude vs. Gemini',
      desc: 'The top two finishers battled closely. Gemini edged ahead with superior animation fluidity and spatial reasoning, taking the crown at 37 vs Claude\'s 33. Claude compensated with cleaner, more maintainable code — output you could actually ship to production.',
    },
    {
      title: 'GPT vs. Grok',
      desc: 'The bottom half told a cautionary tale. GPT 5.2 generated verbose but functional code (31 points), while Grok\'s speed-first approach left critical components broken or missing (19 points). Being fast means nothing when the output doesn\'t work.',
    },
    {
      title: 'Easy vs. Hard Challenges',
      desc: 'On the simplest challenge (Image Echo, 2/10), three models scored perfect 10s. On the hardest (Text Glitch Hover, 8/10), scores ranged from 3 to 9. Difficulty is the great separator — it exposes the gap between surface-level pattern matching and genuine code comprehension.',
    },
  ]

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Matchups</div>
        <h2 className="section-title">Head-to-Head Comparisons</h2>
      </motion.div>
      <div className="takeaway-grid">
        {comparisons.map((c, i) => (
          <motion.div
            key={i}
            className="takeaway-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 * i }}
          >
            <div className="takeaway-title">{c.title}</div>
            <div className="takeaway-desc">{c.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Verdict() {
  const [ref, inView] = useFadeIn()

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="about-story"
      >
        <div className="section-label">Conclusion</div>
        <h2 className="section-title">The Verdict</h2>
        <div className="about-text">
          <p>
            <strong>AI code generation is genuinely impressive — but far from infallible.</strong> Every model in this experiment produced working visual effects from nothing but a text description. That alone would have seemed impossible just a few years ago.
          </p>
          <p>
            But the results also reveal clear limits. As complexity rises, models diverge sharply. Surface-level correctness gives way to broken edge cases, missed spatial relationships, and performance bottlenecks that only a developer would catch.
          </p>
          <p>
            The takeaway isn't that AI can't code — it clearly can. The takeaway is that <em>understanding what it produces</em> is what separates useful AI assistance from dangerous overreliance. The developers who thrive in an AI-augmented world won't be the ones who blindly trust the output. They'll be the ones who can read it, evaluate it, and improve it.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default function Results() {
  return (
    <PageTransition>
      <PageHeader />
      <div className="divider" />
      <OverviewStats />
      <div className="divider" />
      <DifficultyAnalysis />
      <div className="divider" />
      <HeadToHead />
      <div className="divider" />
      <Verdict />
    </PageTransition>
  )
}
