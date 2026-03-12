import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import useFadeIn from '../hooks/useFadeIn'

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Challenge Design',
    desc: 'Each visual effect was carefully chosen to test a different aspect of code generation — from simple CSS animations to complex particle systems and real-time DOM manipulation.',
  },
  {
    step: '02',
    title: 'Prompt Engineering',
    desc: 'A single, detailed text prompt was crafted for each challenge. The same prompt was given identically to all four models with no modifications.',
  },
  {
    step: '03',
    title: 'Code Generation',
    desc: 'Each model generated its response in a single shot — no follow-up prompts, no iterative refinement, no human nudging of any kind.',
  },
  {
    step: '04',
    title: 'Blind Evaluation',
    desc: 'Generated code was rendered as-is in identical environments. Scoring was based on visual fidelity to the reference effect, smoothness, and correctness.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Why "one shot" only?',
    a: 'Single-shot generation reveals a model\'s true understanding. Iterative refinement can mask fundamental gaps in comprehension — we wanted to see raw capability.',
  },
  {
    q: 'How were the models selected?',
    a: 'We chose four frontier models from different companies (Anthropic, Google, OpenAI, xAI) that represent the current state of the art in code generation.',
  },
  {
    q: 'Are the scores subjective?',
    a: 'Scoring is based on a rubric measuring visual fidelity, animation smoothness, code correctness, and edge case handling. While visual assessment has a subjective element, the rubric keeps scores consistent and comparable.',
  },
  {
    q: 'Can I reproduce these results?',
    a: 'Yes! The exact prompts are available, and all generated code was used unmodified. Results may vary with model updates as providers frequently improve their systems.',
  },
  {
    q: 'Why focus on visual effects?',
    a: 'Visual effects require a unique blend of creativity, mathematical precision, and deep CSS/JS knowledge. They\'re immediately testable — you can see if it works or doesn\'t.',
  },
  {
    q: 'Will there be more challenges?',
    a: 'We plan to expand the challenge set with new effects and possibly include more models as the frontier evolves. Stay tuned for updates.',
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
        <div className="section-label">Project</div>
        <h1 className="page-title">About UNO SHOT</h1>
        <p className="page-desc">
          The story behind the experiment, our methodology, and answers to common questions.
        </p>
      </motion.div>
    </section>
  )
}

function Story() {
  const [ref, inView] = useFadeIn()
  return (
    <section className="section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="about-story"
      >
        <div className="section-label">Origin</div>
        <h2 className="section-title">Why We Built This</h2>
        <div className="about-text">
          <p>
            AI-generated code is everywhere. Models write entire applications, debug complex systems, and generate visual effects that would take developers hours. But how good are they <em>really</em> when given no second chances?
          </p>
          <p>
            UNO SHOT was born from a simple question: <strong>what happens when you remove the safety net?</strong> No iterative prompting, no "try again with these changes," no human tweaks. Just one prompt and the raw output.
          </p>
          <p>
            We designed four visual challenges of increasing difficulty and gave the exact same prompt to four frontier LLMs. The results were illuminating — showing both the remarkable capability and the clear limitations of today's AI code generators.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

function Methodology() {
  const [ref, inView] = useFadeIn()
  return (
    <section className="section" id="methodology" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Process</div>
        <h2 className="section-title">Methodology</h2>
        <p className="section-subtitle">
          A rigorous four-step process ensuring fair, reproducible results.
        </p>
      </motion.div>
      <div className="methodology-grid">
        {METHODOLOGY_STEPS.map((s, i) => (
          <motion.div
            key={i}
            className="methodology-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 * i }}
          >
            <div className="methodology-step">{s.step}</div>
            <h3 className="methodology-title">{s.title}</h3>
            <p className="methodology-desc">{s.desc}</p>
            {i < METHODOLOGY_STEPS.length - 1 && <div className="methodology-connector" />}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  const [ref, inView] = useFadeIn()
  return (
    <section className="section" id="faq" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Questions</div>
        <h2 className="section-title">FAQ</h2>
      </motion.div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.08 * i }}
          >
            <div className="faq-q">{item.q}</div>
            <div className="faq-a">{item.a}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function About() {
  return (
    <PageTransition>
      <PageHeader />
      <div className="divider" />
      <Story />
      <div className="divider" />
      <Methodology />
      <div className="divider" />
      <Faq />
    </PageTransition>
  )
}
