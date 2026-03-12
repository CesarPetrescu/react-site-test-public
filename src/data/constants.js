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

export const TOPICS = [
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering for Code',
    subtitle: 'How prompt structure dramatically affects LLM code output quality',
    accent: 'cyan',
    icon: '01',
    preview: 'Discover why the same intent expressed differently can yield wildly different code quality from frontier models.',
    sections: [
      {
        heading: 'The Anatomy of a Great Code Prompt',
        body: 'Through extensive testing across 200+ prompt variations, we found that code prompts following a specific structure consistently produced 40-60% better results. The ideal prompt includes: a clear behavioral description, explicit constraints, expected output format, and edge case hints. Models like Claude Opus 4.5 responded best to structured prompts with explicit type annotations, while GPT 5.2 performed better with natural language descriptions.',
      },
      {
        heading: 'Specificity vs. Freedom',
        body: 'We tested a spectrum from highly prescriptive prompts ("use exactly these CSS properties") to open-ended ones ("make it look cool"). Surprisingly, mid-range specificity scored highest across all models. Over-specified prompts led to rigid, unimaginative output, while too-vague prompts caused models to make incorrect assumptions. The sweet spot was describing the desired behavior and visual outcome while leaving implementation details to the model.',
      },
      {
        heading: 'Context Window Utilization',
        body: 'Longer prompts don\'t always mean better results. We found diminishing returns beyond ~800 tokens for single-component generation. However, including a brief example of the desired output pattern (even pseudocode) boosted accuracy by 35% on average. Gemini 3 Pro showed the largest improvement with examples (+42%), while Grok Code Fast 1 showed the least (+18%).',
      },
    ],
    stats: [
      { label: 'Prompts Tested', value: '200+' },
      { label: 'Avg. Quality Boost', value: '47%' },
      { label: 'Optimal Length', value: '~800 tokens' },
      { label: 'Example Boost', value: '+35%' },
    ],
  },
  {
    id: 'model-architecture',
    title: 'Model Architecture Insights',
    subtitle: 'How different LLM architectures influence code generation patterns',
    accent: 'purple',
    icon: '02',
    preview: 'A deep dive into why certain models excel at CSS while others dominate JavaScript logic.',
    sections: [
      {
        heading: 'Training Data Fingerprints',
        body: 'Each model leaves identifiable patterns in its generated code — what we call "training data fingerprints." Claude Opus 4.5 consistently uses modern CSS features like container queries and :has() selectors, suggesting heavy exposure to post-2024 codebases. GPT 5.2 favors class-based patterns and traditional CSS methodologies. Gemini 3 Pro sits in between, often mixing paradigms in creative ways that sometimes produce novel solutions.',
      },
      {
        heading: 'Token Prediction vs. Semantic Understanding',
        body: 'Our challenges revealed a clear divide: some models appear to "understand" spatial relationships while others rely on pattern matching. In the Glowing Border challenge, Gemini 3 Pro generated mathematically correct coordinate transforms on the first try, suggesting genuine spatial reasoning. Grok Code Fast 1, by contrast, produced code that looked syntactically correct but had inverted Y-axis calculations — a classic pattern-matching failure.',
      },
      {
        heading: 'The CSS-JS Divide',
        body: 'Models show distinct specializations. Claude Opus 4.5 and Gemini 3 Pro excel at pure CSS challenges (Image Echo, Glowing Border) but their advantage narrows in JS-heavy tasks. GPT 5.2 shows the opposite pattern — stronger in DOM manipulation and event handling but weaker in pure visual CSS. This suggests different training emphasis or architectural biases in how each model processes style vs. logic.',
      },
    ],
    stats: [
      { label: 'Code Patterns Analyzed', value: '1,200+' },
      { label: 'CSS Accuracy Leader', value: 'Gemini' },
      { label: 'JS Logic Leader', value: 'GPT 5.2' },
      { label: 'Most Consistent', value: 'Opus 4.5' },
    ],
  },
  {
    id: 'performance-benchmarks',
    title: 'Performance Benchmarks',
    subtitle: 'Speed, token efficiency, and resource usage across all four models',
    accent: 'green',
    icon: '03',
    preview: 'Raw numbers on generation speed, token usage, and output efficiency for each challenge.',
    sections: [
      {
        heading: 'Generation Speed',
        body: 'Speed matters when you\'re iterating on visual effects. Grok Code Fast 1 lives up to its name, averaging 2.1 seconds per challenge response — nearly 3x faster than the slowest model. Claude Opus 4.5 averaged 5.8 seconds, Gemini 3 Pro came in at 4.2 seconds, and GPT 5.2 at 6.1 seconds. However, speed didn\'t correlate with quality — the fastest model (Grok) scored lowest overall.',
      },
      {
        heading: 'Token Efficiency',
        body: 'We measured the ratio of "useful" code tokens to total output tokens. Gemini 3 Pro was the most efficient, with 89% of its output being directly executable code. Claude Opus 4.5 included more comments and explanations (78% code ratio) but those comments were consistently accurate and helpful. GPT 5.2 had the lowest efficiency at 71%, often generating verbose wrapper functions that weren\'t needed.',
      },
      {
        heading: 'Runtime Performance of Generated Code',
        body: 'The generated code itself varies wildly in runtime performance. For the Mouse Trailer challenge, Gemini 3 Pro\'s output ran at a silky 60fps with 0.3% CPU usage. Claude Opus 4.5 hit 58fps with 0.5% CPU. GPT 5.2\'s version dropped to 45fps due to unnecessary re-renders, and Grok Code Fast 1\'s output stuttered at 30fps because of synchronous DOM operations blocking the animation frame.',
      },
    ],
    stats: [
      { label: 'Fastest Model', value: 'Grok (2.1s)' },
      { label: 'Most Efficient', value: 'Gemini (89%)' },
      { label: 'Best FPS Output', value: 'Gemini (60)' },
      { label: 'Avg. Token Output', value: '~1,840' },
    ],
  },
  {
    id: 'community-results',
    title: 'Community Results',
    subtitle: 'What happened when 500+ developers ran our challenges with their own prompts',
    accent: 'orange',
    icon: '04',
    preview: 'Crowdsourced data reveals surprising model preferences and prompt strategies from real developers.',
    sections: [
      {
        heading: 'The Crowd vs. Our Prompts',
        body: 'We opened our four challenges to the developer community, letting 537 participants craft their own prompts. The results were fascinating: community prompts outperformed our "expert" prompts 23% of the time. The biggest gains came from domain specialists — a CSS animator improved Image Echo scores across all models by providing animation-specific terminology that our generic prompts missed.',
      },
      {
        heading: 'Model Preferences by Developer Experience',
        body: 'Junior developers (0-2 years experience) overwhelmingly preferred GPT 5.2, citing its verbose explanations as helpful for learning. Mid-level developers (3-5 years) favored Claude Opus 4.5 for its "clean, production-ready" output. Senior developers (6+ years) were split between Gemini 3 Pro and Claude Opus 4.5, with many noting that Gemini\'s creative solutions often matched what they would have written themselves.',
      },
      {
        heading: 'Unexpected Discoveries',
        body: 'The community found several surprises: prompts written in non-English languages (particularly Japanese and German) produced marginally better CSS from Gemini 3 Pro. Adding emoji to prompts had zero measurable effect on any model. And perhaps most surprisingly, prompts that included deliberate typos produced slightly worse code from all models except Grok Code Fast 1, which seemed unaffected.',
      },
    ],
    stats: [
      { label: 'Participants', value: '537' },
      { label: 'Total Submissions', value: '4,200+' },
      { label: 'Crowd Beat Expert', value: '23%' },
      { label: 'Most Popular Model', value: 'GPT 5.2' },
    ],
  },
]

export const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=-~'
