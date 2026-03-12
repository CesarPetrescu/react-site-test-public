import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import { TOPICS, ACCENT_COLORS } from '../data/constants'

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
        <div className="section-label">Deep Dives</div>
        <h1 className="page-title">Topics</h1>
        <p className="page-desc">
          In-depth explorations of prompt engineering, model architecture, performance data, and community findings.
        </p>
      </motion.div>
    </section>
  )
}

function TopicGrid() {
  const [ref, inView] = useFadeIn()
  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Explore</div>
        <h2 className="section-title">All Topics</h2>
        <p className="section-subtitle">
          Four research areas that emerged from our LLM visual challenge experiment.
        </p>
      </motion.div>
      <div className="topics-grid">
        {TOPICS.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <Link to={`/topics/${topic.id}`} className="topic-card" data-accent={topic.accent}>
              <div className="topic-card-number">{topic.icon}</div>
              <h3 className="topic-card-title">{topic.title}</h3>
              <p className="topic-card-subtitle">{topic.subtitle}</p>
              <p className="topic-card-preview">{topic.preview}</p>
              <div className="topic-card-stats">
                {topic.stats.map((stat, j) => (
                  <div key={j} className="topic-card-stat">
                    <div className="topic-card-stat-value" style={{ color: ACCENT_COLORS[topic.accent] }}>{stat.value}</div>
                    <div className="topic-card-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="topic-card-cta">
                Read more <span className="topic-card-arrow">&rarr;</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function Topics() {
  return (
    <PageTransition>
      <PageHeader />
      <div className="divider" />
      <TopicGrid />
    </PageTransition>
  )
}
