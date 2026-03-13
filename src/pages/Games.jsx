import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

/* ════════════════════════════════════════════
   1. TIC-TAC-TOE
   ════════════════════════════════════════════ */
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xNext, setXNext] = useState(true)
  const winner = calcWinner(board)
  const full = board.every(Boolean)

  function calcWinner(b) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ]
    for (const [a,c,d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
    }
    return null
  }

  function handleClick(i) {
    if (board[i] || winner) return
    const next = [...board]
    next[i] = xNext ? 'X' : 'O'
    setBoard(next)
    setXNext(!xNext)
  }

  const status = winner
    ? `Winner: ${winner}`
    : full
    ? 'Draw!'
    : `Next: ${xNext ? 'X' : 'O'}`

  return (
    <div className="game-container">
      <div className="game-status">{status}</div>
      <div className="ttt-board">
        {board.map((cell, i) => (
          <button
            key={i}
            className={`ttt-cell ${cell ? 'ttt-filled' : ''} ${cell === 'X' ? 'ttt-x' : ''} ${cell === 'O' ? 'ttt-o' : ''}`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="game-reset-btn" onClick={() => { setBoard(Array(9).fill(null)); setXNext(true) }}>
        Reset
      </button>
    </div>
  )
}

/* ════════════════════════════════════════════
   2. SNAKE
   ════════════════════════════════════════════ */
function Snake() {
  const GRID = 20
  const SPEED = 120
  const canvasRef = useRef(null)
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    running: false,
    score: 0,
    gameOver: false,
  })
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)
  const intervalRef = useRef(null)

  const spawnFood = useCallback((snake) => {
    let pos
    do {
      pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
    } while (snake.some(s => s.x === pos.x && s.y === pos.y))
    return pos
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cell = canvas.width / GRID

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim() || '#0c0c1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const st = stateRef.current
    // food
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-pink').trim() || '#ff2d7b'
    ctx.beginPath()
    ctx.arc(st.food.x * cell + cell / 2, st.food.y * cell + cell / 2, cell / 2.5, 0, Math.PI * 2)
    ctx.fill()

    // snake
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#00f0ff'
    st.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? accent : accent + 'aa'
      ctx.fillRect(seg.x * cell + 1, seg.y * cell + 1, cell - 2, cell - 2)
    })
  }, [])

  const tick = useCallback(() => {
    const st = stateRef.current
    if (!st.running) return

    st.dir = { ...st.nextDir }
    const head = { x: st.snake[0].x + st.dir.x, y: st.snake[0].y + st.dir.y }

    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID || st.snake.some(s => s.x === head.x && s.y === head.y)) {
      st.running = false
      st.gameOver = true
      setGameOver(true)
      if (intervalRef.current) clearInterval(intervalRef.current)
      draw()
      return
    }

    st.snake.unshift(head)
    if (head.x === st.food.x && head.y === st.food.y) {
      st.score++
      setScore(st.score)
      st.food = spawnFood(st.snake)
    } else {
      st.snake.pop()
    }
    draw()
  }, [draw, spawnFood])

  const startGame = useCallback(() => {
    const st = stateRef.current
    st.snake = [{ x: 10, y: 10 }]
    st.dir = { x: 1, y: 0 }
    st.nextDir = { x: 1, y: 0 }
    st.food = spawnFood(st.snake)
    st.score = 0
    st.running = true
    st.gameOver = false
    setScore(0)
    setGameOver(false)
    setStarted(true)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, SPEED)
    draw()
  }, [tick, draw, spawnFood])

  useEffect(() => {
    const handleKey = (e) => {
      const st = stateRef.current
      const dirs = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
        a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
      }
      const nd = dirs[e.key]
      if (nd && (nd.x + st.dir.x !== 0 || nd.y + st.dir.y !== 0)) {
        e.preventDefault()
        st.nextDir = nd
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => { draw() }, [draw])

  return (
    <div className="game-container">
      <div className="game-status">Score: {score}</div>
      <canvas ref={canvasRef} width={400} height={400} className="snake-canvas" />
      {(!started || gameOver) && (
        <button className="game-reset-btn" onClick={startGame}>
          {gameOver ? 'Play Again' : 'Start'}
        </button>
      )}
      <div className="game-hint">Arrow keys or WASD to move</div>
    </div>
  )
}

/* ════════════════════════════════════════════
   3. MEMORY MATCH
   ════════════════════════════════════════════ */
function MemoryMatch() {
  const SYMBOLS = ['A','B','C','D','E','F','G','H']
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const lockRef = useRef(false)

  const initGame = useCallback(() => {
    const deck = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((sym, i) => ({ id: i, symbol: sym }))
    setCards(deck)
    setFlipped([])
    setMatched([])
    setMoves(0)
    lockRef.current = false
  }, [])

  useEffect(() => { initGame() }, [initGame])

  function handleFlip(id) {
    if (lockRef.current || flipped.includes(id) || matched.includes(id)) return
    const next = [...flipped, id]
    setFlipped(next)
    if (next.length === 2) {
      setMoves(m => m + 1)
      lockRef.current = true
      const [a, b] = next
      if (cards[a].symbol === cards[b].symbol) {
        setMatched(m => [...m, a, b])
        setFlipped([])
        lockRef.current = false
      } else {
        setTimeout(() => {
          setFlipped([])
          lockRef.current = false
        }, 700)
      }
    }
  }

  const won = matched.length === cards.length && cards.length > 0

  return (
    <div className="game-container">
      <div className="game-status">
        {won ? `You won in ${moves} moves!` : `Moves: ${moves}`}
      </div>
      <div className="memory-board">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id)
          return (
            <button
              key={card.id}
              className={`memory-card ${isFlipped ? 'memory-flipped' : ''} ${matched.includes(card.id) ? 'memory-matched' : ''}`}
              onClick={() => handleFlip(card.id)}
            >
              <span className="memory-card-inner">
                {isFlipped ? card.symbol : '?'}
              </span>
            </button>
          )
        })}
      </div>
      <button className="game-reset-btn" onClick={initGame}>Reset</button>
    </div>
  )
}

/* ════════════════════════════════════════════
   4. MINESWEEPER (8x8, 10 mines)
   ════════════════════════════════════════════ */
function Minesweeper() {
  const ROWS = 8, COLS = 8, MINES = 10

  function createBoard() {
    const grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
    )
    let placed = 0
    while (placed < MINES) {
      const r = Math.floor(Math.random() * ROWS)
      const c = Math.floor(Math.random() * COLS)
      if (!grid[r][c].mine) {
        grid[r][c].mine = true
        placed++
      }
    }
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c].mine) continue
        let count = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].mine) count++
          }
        }
        grid[r][c].adjacent = count
      }
    }
    return grid
  }

  const [board, setBoard] = useState(createBoard)
  const [status, setStatus] = useState('playing') // playing | won | lost

  function reveal(grid, r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return
    if (grid[r][c].revealed || grid[r][c].flagged) return
    grid[r][c].revealed = true
    if (grid[r][c].adjacent === 0 && !grid[r][c].mine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          reveal(grid, r + dr, c + dc)
    }
  }

  function handleClick(r, c) {
    if (status !== 'playing') return
    const cell = board[r][c]
    if (cell.revealed || cell.flagged) return
    const next = board.map(row => row.map(cl => ({ ...cl })))
    if (next[r][c].mine) {
      // reveal all mines
      next.forEach(row => row.forEach(cl => { if (cl.mine) cl.revealed = true }))
      setBoard(next)
      setStatus('lost')
      return
    }
    reveal(next, r, c)
    // check win
    const unrevealed = next.flat().filter(cl => !cl.revealed && !cl.mine)
    if (unrevealed.length === 0) setStatus('won')
    setBoard(next)
  }

  function handleRightClick(e, r, c) {
    e.preventDefault()
    if (status !== 'playing' || board[r][c].revealed) return
    const next = board.map(row => row.map(cl => ({ ...cl })))
    next[r][c].flagged = !next[r][c].flagged
    setBoard(next)
  }

  function reset() {
    setBoard(createBoard())
    setStatus('playing')
  }

  const ADJ_COLORS = ['', 'var(--accent-cyan)', 'var(--accent-green)', 'var(--accent-pink)', 'var(--accent-purple)', 'var(--accent-orange)', 'var(--accent-yellow)', '#fff', '#aaa']

  return (
    <div className="game-container">
      <div className="game-status">
        {status === 'won' ? 'You won!' : status === 'lost' ? 'Game Over!' : 'Left-click reveal, right-click flag'}
      </div>
      <div className="ms-board">
        {board.map((row, r) => (
          <div key={r} className="ms-row">
            {row.map((cell, c) => (
              <button
                key={c}
                className={`ms-cell ${cell.revealed ? 'ms-revealed' : ''} ${cell.revealed && cell.mine ? 'ms-mine' : ''} ${cell.flagged ? 'ms-flagged' : ''}`}
                onClick={() => handleClick(r, c)}
                onContextMenu={(e) => handleRightClick(e, r, c)}
                style={cell.revealed && cell.adjacent > 0 ? { color: ADJ_COLORS[cell.adjacent] } : undefined}
              >
                {cell.flagged && !cell.revealed ? 'F' :
                  cell.revealed ? (cell.mine ? '*' : (cell.adjacent > 0 ? cell.adjacent : '')) : ''}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button className="game-reset-btn" onClick={reset}>New Game</button>
    </div>
  )
}

/* ════════════════════════════════════════════
   5. 2048
   ════════════════════════════════════════════ */
function Game2048() {
  const SIZE = 4

  function emptyBoard() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0))
  }

  function addRandom(b) {
    const empty = []
    b.forEach((row, r) => row.forEach((v, c) => { if (!v) empty.push([r, c]) }))
    if (empty.length === 0) return b
    const [r, c] = empty[Math.floor(Math.random() * empty.length)]
    const next = b.map(row => [...row])
    next[r][c] = Math.random() < 0.9 ? 2 : 4
    return next
  }

  function init() {
    return addRandom(addRandom(emptyBoard()))
  }

  const [board, setBoard] = useState(init)
  const [scoreVal, setScoreVal] = useState(0)
  const [over, setOver] = useState(false)

  function slideRow(row) {
    let arr = row.filter(v => v)
    let pts = 0
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2
        pts += arr[i]
        arr.splice(i + 1, 1)
      }
    }
    while (arr.length < SIZE) arr.push(0)
    return { row: arr, pts }
  }

  function move(dir) {
    if (over) return
    let b = board.map(r => [...r])
    let totalPts = 0
    let moved = false

    const rotate = (grid) => grid[0].map((_, i) => grid.map(row => row[i]).reverse())

    // normalize to left slide
    let rotations = { left: 0, up: 1, right: 2, down: 3 }[dir]
    for (let i = 0; i < rotations; i++) b = rotate(b)

    b = b.map(row => {
      const { row: newRow, pts } = slideRow(row)
      totalPts += pts
      if (newRow.join(',') !== row.join(',')) moved = true
      return newRow
    })

    // rotate back
    for (let i = 0; i < (4 - rotations) % 4; i++) b = rotate(b)

    if (!moved) return

    b = addRandom(b)
    setScoreVal(s => s + totalPts)
    setBoard(b)

    // check game over
    const hasEmpty = b.some(row => row.some(v => !v))
    if (!hasEmpty) {
      let canMove = false
      for (let r = 0; r < SIZE && !canMove; r++) {
        for (let c = 0; c < SIZE && !canMove; c++) {
          if (c < SIZE - 1 && b[r][c] === b[r][c + 1]) canMove = true
          if (r < SIZE - 1 && b[r][c] === b[r + 1][c]) canMove = true
        }
      }
      if (!canMove) setOver(true)
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' }
      if (map[e.key]) {
        e.preventDefault()
        move(map[e.key])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const TILE_COLORS = {
    0: 'transparent', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
    32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
    512: '#edc850', 1024: '#edc53f', 2048: '#edc22e',
  }

  function reset() {
    setBoard(init())
    setScoreVal(0)
    setOver(false)
  }

  return (
    <div className="game-container">
      <div className="game-status">
        {over ? `Game Over! Score: ${scoreVal}` : `Score: ${scoreVal}`}
      </div>
      <div className="g2048-board">
        {board.flat().map((val, i) => (
          <div
            key={i}
            className={`g2048-tile ${val ? 'g2048-filled' : ''}`}
            style={{
              background: TILE_COLORS[val] || '#3c3a32',
              color: val <= 4 ? '#776e65' : '#f9f6f2',
            }}
          >
            {val || ''}
          </div>
        ))}
      </div>
      <button className="game-reset-btn" onClick={reset}>New Game</button>
      <div className="game-hint">Arrow keys or WASD to move tiles</div>
    </div>
  )
}

/* ════════════════════════════════════════════
   GAMES PAGE
   ════════════════════════════════════════════ */
const GAMES = [
  { id: 'tictactoe', title: 'Tic-Tac-Toe', desc: 'Classic X and O — play against a friend.', component: TicTacToe },
  { id: 'snake', title: 'Snake', desc: 'Eat, grow, and don\'t hit the walls.', component: Snake },
  { id: 'memory', title: 'Memory Match', desc: 'Flip cards and find all matching pairs.', component: MemoryMatch },
  { id: 'minesweeper', title: 'Minesweeper', desc: '8x8 grid, 10 mines. Clear the board.', component: Minesweeper },
  { id: '2048', title: '2048', desc: 'Slide tiles and merge to reach 2048.', component: Game2048 },
]

export default function Games() {
  const [active, setActive] = useState(null)

  return (
    <PageTransition>
      <section className="games-page">
        <div className="games-header">
          <h1 className="games-title">
            <span className="games-title-accent">Arcade</span> Games
          </h1>
          <p className="games-subtitle">
            Take a break with 5 classic browser games — all running locally, no server needed.
          </p>
        </div>

        {active === null ? (
          <div className="games-grid">
            {GAMES.map((game, i) => (
              <motion.button
                key={game.id}
                className="game-card"
                onClick={() => setActive(game.id)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
              >
                <h3 className="game-card-title">{game.title}</h3>
                <p className="game-card-desc">{game.desc}</p>
                <span className="game-card-play">Play</span>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="game-active">
            <button className="game-back-btn" onClick={() => setActive(null)}>
              Back to Games
            </button>
            <h2 className="game-active-title">{GAMES.find(g => g.id === active).title}</h2>
            {(() => {
              const G = GAMES.find(g => g.id === active).component
              return <G />
            })()}
          </div>
        )}
      </section>
    </PageTransition>
  )
}
