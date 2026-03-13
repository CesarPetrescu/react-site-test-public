import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import { FINAL_SCORES, CHALLENGES, ACCENT_COLORS } from '../data/constants'

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
        <div className="section-label">Rankings</div>
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-desc">
          The definitive standings after all four visual challenges. See how each model stacked up when given zero second chances.
        </p>
      </motion.div>
    </section>
  )
}

function FinalStandings() {
  const [ref, inView] = useFadeIn()
  const rankClass = ['gold', 'silver', 'bronze', 'fourth']
  const barColors = ['linear-gradient(90deg, #00f0ff, #a855f7)', '#c0c0c0', '#cd7f32', '#555570']
  const medals = ['1st', '2nd', '3rd', '4th']

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Overall</div>
        <h2 className="section-title">Final Standings</h2>
        <p className="section-subtitle">
          Total possible score: 40 points across four challenges. Every point earned through raw, unassisted generation.
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
    </section>
  )
}

function PerChallengeBreakdown() {
  const [ref, inView] = useFadeIn()

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Breakdown</div>
        <h2 className="section-title">Challenge-by-Challenge Scores</h2>
        <p className="section-subtitle">
          How each model performed on every individual challenge — revealing strengths, weaknesses, and surprising gaps.
        </p>
      </motion.div>
      <div className="score-matrix">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Challenge</th>
              {FINAL_SCORES.map(m => (
                <th key={m.id} style={{ color: ACCENT_COLORS[m.accent] }}>{m.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHALLENGES.map((c, ci) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * ci }}
              >
                <td className="matrix-challenge">{c.name}</td>
                {c.scores.map((s, si) => {
                  const maxScore = Math.max(...c.scores.map(sc => sc.score))
                  return (
                    <td key={si} className={`matrix-score ${s.score === maxScore ? 'matrix-best' : ''}`}>
                      <span className="matrix-num">{s.score}</span>
                      <span className="matrix-bar" style={{ width: `${(s.score / 10) * 100}%`, background: s.accent === 'cyan' ? ACCENT_COLORS.cyan : s.accent === 'purple' ? ACCENT_COLORS.purple : s.accent === 'green' ? ACCENT_COLORS.green : ACCENT_COLORS.orange }} />
                    </td>
                  )
                })}
              </motion.tr>
            ))}
            <tr className="matrix-total-row">
              <td className="matrix-challenge"><strong>Total</strong></td>
              {FINAL_SCORES.map(m => (
                <td key={m.id} className="matrix-score">
                  <strong style={{ color: ACCENT_COLORS[m.accent] }}>{m.total}/40</strong>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

function KeyInsights() {
  const [ref, inView] = useFadeIn()
  const insights = [
    { title: 'Consistency Wins', desc: 'Gemini 3 Pro never scored below 9 on any challenge, proving that steady performance across the board beats occasional brilliance.' },
    { title: 'Difficulty Matters', desc: 'All models aced the easiest challenge, but the gap widened dramatically as complexity increased — separating real understanding from pattern matching.' },
    { title: 'Speed vs. Quality', desc: 'The fastest model (Grok) placed last overall. Raw generation speed means nothing if the output misses the mark.' },
  ]

  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Analysis</div>
        <h2 className="section-title">Key Insights</h2>
      </motion.div>
      <div className="takeaway-grid">
        {insights.map((item, i) => (
          <motion.div
            key={i}
            className="takeaway-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 * i }}
          >
            <div className="takeaway-title">{item.title}</div>
            <div className="takeaway-desc">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function LeaderboardPage() {
  return (
    <PageTransition>
      <PageHeader />
      <div className="divider" />
      <FinalStandings />
      <div className="divider" />
      <PerChallengeBreakdown />
      <div className="divider" />
      <KeyInsights />
    </PageTransition>
  )
}
