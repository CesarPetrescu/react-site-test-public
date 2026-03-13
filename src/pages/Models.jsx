import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import { MODELS, CHALLENGES, FINAL_SCORES, ACCENT_COLORS } from '../data/constants'

const MODEL_DETAILS = [
  {
    id: 'opus',
    tagline: 'The Reliable Powerhouse',
    description: 'Anthropic\'s flagship model delivers consistently clean, production-ready code. It rarely dazzles with creativity but almost never fails — a workhorse that developers trust for dependable output.',
    strengths: ['Clean, readable code structure', 'Accurate CSS animations', 'Helpful inline comments'],
    weaknesses: ['Conservative visual choices', 'Occasionally underwhelming glow effects'],
    codeStyle: 'Modern ES6+ with clear separation of concerns. Prefers CSS custom properties and :has() selectors.',
  },
  {
    id: 'gemini',
    tagline: 'The Creative Champion',
    description: 'Google\'s contender took the crown with the highest overall score. Gemini 3 Pro combines strong spatial reasoning with genuinely creative implementation choices that often surpass human expectations.',
    strengths: ['Exceptional spatial reasoning', 'Best animation fluidity', 'Creative problem-solving'],
    weaknesses: ['Occasionally mixes coding paradigms', 'Minor text containment issues'],
    codeStyle: 'Blends functional and declarative styles. Strong mathematical precision in coordinate transforms.',
  },
  {
    id: 'gpt',
    tagline: 'The Verbose Explainer',
    description: 'OpenAI\'s model generates thorough, well-documented code that reads like a tutorial. Its strength lies in DOM manipulation and event handling, though visual CSS isn\'t its strongest suit.',
    strengths: ['Excellent DOM manipulation', 'Thorough event handling', 'Detailed documentation'],
    weaknesses: ['Verbose wrapper functions', 'Weaker CSS visual effects', 'Occasional re-render issues'],
    codeStyle: 'Class-based patterns with traditional CSS. Favors explicit over implicit, sometimes to a fault.',
  },
  {
    id: 'grok',
    tagline: 'The Speed Demon',
    description: 'xAI\'s model generates responses nearly 3x faster than competitors, but speed comes at a cost. Grok\'s output often looks correct at first glance but breaks down under closer inspection.',
    strengths: ['Blazing fast generation (2.1s avg)', 'Decent star animations', 'Concise output'],
    weaknesses: ['Centering and alignment failures', 'Missing visual components', 'Pattern-matching errors'],
    codeStyle: 'Minimal and terse. Prioritizes speed of generation over thoroughness of implementation.',
  },
]

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
        <div className="section-label">Contenders</div>
        <h1 className="page-title">The Models</h1>
        <p className="page-desc">
          Deep profiles of the four frontier LLMs that competed. Their architectures, coding styles, and where they shine — or fall short.
        </p>
      </motion.div>
    </section>
  )
}

function ModelProfile({ model, detail, index }) {
  const [ref, inView] = useFadeIn()
  const finalScore = FINAL_SCORES.find(f => f.id === model.id)
  const challengeScores = CHALLENGES.map(c => {
    const score = c.scores.find(s => s.accent === model.accent)
    return { name: c.name, score: score?.score ?? 0, note: score?.note ?? '' }
  })

  return (
    <section className="section" ref={ref}>
      <motion.div
        className="model-profile"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="model-profile-header" style={{ borderColor: ACCENT_COLORS[model.accent] }}>
          <div className="contender-logo" data-accent={model.accent} style={{ fontSize: '2rem', width: 64, height: 64, borderColor: ACCENT_COLORS[model.accent], color: ACCENT_COLORS[model.accent] }}>{model.logo}</div>
          <div>
            <h2 className="section-title" style={{ marginBottom: 4 }}>{model.name}</h2>
            <div className="section-label" style={{ color: ACCENT_COLORS[model.accent] }}>{detail.tagline}</div>
            <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>{model.company} &bull; Rank #{finalScore?.rank} &bull; Score: {finalScore?.total}/40</div>
          </div>
        </div>

        <p className="about-text" style={{ marginTop: 24 }}>{detail.description}</p>

        <div className="model-profile-grid">
          <div className="model-profile-section">
            <h3 style={{ color: 'var(--accent-green)', marginBottom: 12 }}>Strengths</h3>
            {detail.strengths.map((s, i) => (
              <div key={i} className="model-trait">+ {s}</div>
            ))}
          </div>
          <div className="model-profile-section">
            <h3 style={{ color: 'var(--accent-pink)', marginBottom: 12 }}>Weaknesses</h3>
            {detail.weaknesses.map((w, i) => (
              <div key={i} className="model-trait">- {w}</div>
            ))}
          </div>
        </div>

        <div className="model-profile-section" style={{ marginTop: 24 }}>
          <h3 style={{ color: 'var(--accent-cyan)', marginBottom: 12 }}>Code Style</h3>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>{detail.codeStyle}</p>
        </div>

        <div className="model-profile-section" style={{ marginTop: 24 }}>
          <h3 style={{ color: 'var(--accent-purple)', marginBottom: 12 }}>Challenge Scores</h3>
          {challengeScores.map((cs, i) => (
            <motion.div
              key={i}
              className="model-score-row"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <span className="model-score-label">{cs.name}</span>
              <div className="lb-bar-container" style={{ flex: 1 }}>
                <motion.div
                  className="lb-bar"
                  style={{ background: ACCENT_COLORS[model.accent] }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(cs.score / 10) * 100}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + 0.1 * i }}
                />
              </div>
              <span className="model-score-value" style={{ color: ACCENT_COLORS[model.accent] }}>{cs.score}/10</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default function ModelsPage() {
  return (
    <PageTransition>
      <PageHeader />
      {MODELS.map((model, i) => {
        const detail = MODEL_DETAILS.find(d => d.id === model.id)
        return (
          <div key={model.id}>
            <div className="divider" />
            <ModelProfile model={model} detail={detail} index={i} />
          </div>
        )
      })}
    </PageTransition>
  )
}
