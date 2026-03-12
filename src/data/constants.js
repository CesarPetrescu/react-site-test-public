export const MODELS = [
  { id: 'opus', name: 'Claude Opus 4.5', company: 'Anthropic', accent: 'cyan', logo: 'C' },
  { id: 'gemini', name: 'Gemini 3 Pro', company: 'Google', accent: 'purple', logo: 'G' },
  { id: 'gpt', name: 'GPT 5.2', company: 'OpenAI', accent: 'green', logo: 'O' },
  { id: 'grok', name: 'Grok Code Fast 1', company: 'xAI', accent: 'orange', logo: 'X' },
]

export const CHALLENGES = [
  {
    id: 'image-echo',
    name: 'Image Echo',
    difficulty: '2/10',
    diffNum: 2,
    diffClass: 'diff-easy',
    desc: 'An animated loop of stacking images that echo outward. A relatively straightforward CSS animation challenge — should be a warm-up for any competent model.',
    longDesc: 'The Image Echo challenge tests each model\'s ability to create CSS keyframe animations with stacking and fading image duplicates. The effect requires precise timing, opacity control, and transform layering to achieve the characteristic "echo" look where copies of an image fan outward in a smooth loop.',
    technique: 'CSS @keyframes with staggered animation-delay, transform: scale() + rotate(), opacity transitions',
    scores: [
      { model: 'Claude Opus 4.5', score: 10, note: 'Flawless execution — perfect timing, smooth loop, accurate echo effect', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 10, note: 'Perfect reproduction with clean animation curves', accent: 'purple' },
      { model: 'GPT 5.2', score: 10, note: 'Nailed every aspect of the animation', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 7, note: 'Centering issues caused misaligned echo layers', accent: 'orange' },
    ],
  },
  {
    id: 'glowing-border',
    name: 'Glowing Border',
    difficulty: '5/10',
    diffNum: 5,
    diffClass: 'diff-medium',
    desc: 'A 2x3 grid of cards with a mouse-following glow that bleeds through borders to adjacent cards. Requires nuanced CSS effects and precise mouse tracking.',
    longDesc: 'The Glowing Border challenge pushes models to implement mouse-tracking radial gradients that interact across multiple card elements. The glow must seamlessly bleed from one card\'s border into adjacent cards, requiring careful coordinate math and layered pseudo-elements.',
    technique: 'MouseEvent tracking, CSS radial-gradient on ::before pseudo-elements, shared coordinate space via CSS custom properties',
    scores: [
      { model: 'Claude Opus 4.5', score: 7, note: 'Faint glow, barely visible border effect — functional but underwhelming', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 9, note: 'Stronger glow, better design sense, near-perfect bleed effect', accent: 'purple' },
      { model: 'GPT 5.2', score: 8, note: 'Correct behavior, minor border weirdness at card edges', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 4, note: 'Glow not confined to border — fills entire card interior', accent: 'orange' },
    ],
  },
  {
    id: 'magic-mouse-trailer',
    name: 'Magic Mouse Trailer',
    difficulty: '7/10',
    diffNum: 7,
    diffClass: 'diff-hard',
    desc: 'A soft pink glow trails the cursor, spawning animated stars that drift and fade downward. Demands smooth animation with particle-like effects.',
    longDesc: 'The Magic Mouse Trailer is a particle system challenge disguised as a cursor effect. Models must create a smooth radial glow that follows the mouse with minimal latency, while simultaneously spawning star characters that animate downward with rotation and fade-out — all without janky performance.',
    technique: 'requestAnimationFrame / React state for glow position, particle spawning with cleanup timers, CSS keyframe animations for star drift',
    scores: [
      { model: 'Claude Opus 4.5', score: 8, note: 'Nice stars, but visible circle artifacts in glow rendering', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 9, note: 'Extremely smooth, best animation quality of all models', accent: 'purple' },
      { model: 'GPT 5.2', score: 7, note: 'All components present but laggy with circle artifacts', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 5, note: 'Star animation OK, but glow entirely missing from output', accent: 'orange' },
    ],
  },
  {
    id: 'text-glitch-hover',
    name: 'Text Glitch Hover',
    difficulty: '8/10',
    diffNum: 8,
    diffClass: 'diff-extreme',
    desc: 'A matrix of randomized alphanumeric characters that scramble on mouse move, masked by a radial gradient following the cursor. The hardest test.',
    longDesc: 'The Text Glitch Hover is the ultimate stress test. Models must generate a dense grid of randomized characters that re-scramble on every mouse movement, overlaid with a radial gradient mask that reveals/hides the text based on cursor proximity. It combines real-time DOM updates, CSS masking, and creative visual design.',
    technique: 'Array.from() character generation, onMouseMove re-renders, CSS radial-gradient mask-image or overlay div, word-break: break-all for grid layout',
    scores: [
      { model: 'Claude Opus 4.5', score: 8, note: 'Good overall, missed some border details in the mask', accent: 'cyan' },
      { model: 'Gemini 3 Pro', score: 9, note: 'Text confined to card correctly, minor tweaks needed', accent: 'purple' },
      { model: 'GPT 5.2', score: 6, note: 'Gradient blending broken, translucent white ruins effect', accent: 'green' },
      { model: 'Grok Code Fast 1', score: 3, note: 'No text wrap, gradient masking completely failed', accent: 'orange' },
    ],
  },
]

export const FINAL_SCORES = [
  { ...MODELS[1], total: 37, rank: 1 },
  { ...MODELS[0], total: 33, rank: 2 },
  { ...MODELS[2], total: 31, rank: 3 },
  { ...MODELS[3], total: 19, rank: 4 },
]

export const ACCENT_COLORS = {
  cyan: '#00f0ff',
  purple: '#a855f7',
  green: '#22ff88',
  orange: '#ff8c00',
}

export const RULES = [
  { icon: '01', title: 'One Prompt Only', desc: 'Each model gets exactly one attempt from a single, detailed text prompt.' },
  { icon: '02', title: 'No Follow-ups', desc: 'No refinement or nudging allowed. What you get is what you get.' },
  { icon: '03', title: 'Identical Prompts', desc: 'Every model receives the exact same prompt for each challenge.' },
  { icon: '04', title: 'Zero Edits', desc: 'The generated code is rendered as-is with no human modifications.' },
]

export const TAKEAWAYS = [
  {
    icon: 'trophy',
    title: 'AI Is Genuinely Powerful',
    desc: 'Models can generate complex visual effects from a single prompt. The quality of frontier LLMs is genuinely impressive and continues to improve rapidly.',
  },
  {
    icon: 'shield',
    title: 'Developers Still Needed',
    desc: 'Blindly trusting AI-generated code ("vibe coding") is risky. Security, correctness, and maintainability still demand human understanding.',
  },
  {
    icon: 'bolt',
    title: 'AI as Superpower',
    desc: 'The real advantage goes to developers who understand what the AI produces. A strong programming foundation turns AI into an incredible force multiplier.',
  },
]

export const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=-~'
