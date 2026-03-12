import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="navbar-logo-text">UNO</span>
            <span className="navbar-logo-accent">SHOT</span>
          </div>
          <p className="footer-tagline">
            One prompt. Zero follow-ups. The definitive LLM visual challenge.
          </p>
        </div>
        <div className="footer-nav">
          <div className="footer-col">
            <div className="footer-col-title">Explore</div>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/challenges" className="footer-link">Challenges</Link>
            <Link to="/gallery" className="footer-link">Gallery</Link>
            <Link to="/topics" className="footer-link">Topics</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Project</div>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/about#methodology" className="footer-link">Methodology</Link>
            <Link to="/about#faq" className="footer-link">FAQ</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>UNO SHOT &mdash; An experiment in LLM capabilities &middot; 2026</span>
      </div>
    </footer>
  )
}
