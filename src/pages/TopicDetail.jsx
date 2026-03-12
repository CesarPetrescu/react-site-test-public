import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'
import { TOPICS, ACCENT_COLORS } from '../data/constants'

function PageHeader({ topic }) {
  const accentColor = ACCENT_COLORS[topic.accent]
  return (
    <section className="page-header">
      <div className="page-header-bg" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="page-header-content"
      >
        <div className="section-label">
          <Link to="/topics" className="topic-back-link">Topics</Link> / Deep Dive {topic.icon}
        </div>
        <h1 className="page-title">{topic.title}</h1>
        <p className="page-desc">{topic.subtitle}</p>
        <div className="topic-detail-stats">
          {topic.stats.map((stat, i) => (
            <div key={i} className="topic-detail-stat">
              <div className="topic-detail-stat-value" style={{ color: accentColor }}>{stat.value}</div>
              <div className="topic-detail-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function TopicSection({ section, index, accent }) {
  const [ref, inView] = useFadeIn()
  const accentColor = ACCENT_COLORS[accent]
  return (
    <section className="section" ref={ref}>
      <motion.div
        className="topic-section-content"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="topic-section-number" style={{ color: accentColor }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <h2 className="section-title">{section.heading}</h2>
        <p className="topic-section-body">{section.body}</p>
      </motion.div>
    </section>
  )
}

function RelatedTopics({ currentId }) {
  const [ref, inView] = useFadeIn()
  const related = TOPICS.filter(t => t.id !== currentId)
  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Continue Reading</div>
        <h2 className="section-title">Related Topics</h2>
      </motion.div>
      <div className="related-topics-grid">
        {related.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 * i }}
          >
            <Link to={`/topics/${topic.id}`} className="related-topic-card" data-accent={topic.accent}>
              <div className="related-topic-number">{topic.icon}</div>
              <h3 className="related-topic-title">{topic.title}</h3>
              <p className="related-topic-preview">{topic.preview}</p>
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

function NotFound() {
  return (
    <PageTransition>
      <section className="page-header">
        <div className="page-header-bg" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="page-header-content"
        >
          <h1 className="page-title">Topic Not Found</h1>
          <p className="page-desc">
            This topic doesn't exist. <Link to="/topics" className="topic-back-link">Browse all topics</Link>
          </p>
        </motion.div>
      </section>
    </PageTransition>
  )
}

export default function TopicDetail() {
  const { slug } = useParams()
  const topic = TOPICS.find(t => t.id === slug)

  if (!topic) return <NotFound />

  return (
    <PageTransition>
      <PageHeader topic={topic} />
      {topic.sections.map((section, i) => (
        <div key={i}>
          <div className="divider" />
          <TopicSection section={section} index={i} accent={topic.accent} />
        </div>
      ))}
      <div className="divider" />
      <RelatedTopics currentId={topic.id} />
    </PageTransition>
  )
}
