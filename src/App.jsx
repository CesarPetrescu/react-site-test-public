import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Challenges from './pages/Challenges'
import Gallery from './pages/Gallery'
import LeaderboardPage from './pages/LeaderboardPage'
import ModelsPage from './pages/Models'
import Results from './pages/Results'
import About from './pages/About'
import Games from './pages/Games'
import Topics from './pages/Topics'
import TopicDetail from './pages/TopicDetail'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:slug" element={<TopicDetail />} />
            <Route path="/games" element={<Games />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
