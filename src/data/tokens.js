// Names, roles and usage notes for the Style Guide. The actual values live in
// src/styles/tokens.scss and are read from the page at runtime, so the guide never drifts.

export const colorGroups = [
  {
    name: "Ink",
    note: "The ground. A deep blue-violet night sky rather than black, so lilac and coral glow against it.",
    tokens: [
      { name: "ink-950", use: "Page background" },
      { name: "ink-900", use: "Surfaces, footer, forms" },
      { name: "ink-800", use: "Raised surfaces, tags" },
      { name: "ink-700", use: "Hairline borders" },
      { name: "ink-600", use: "Hover fills" },
      { name: "ink-500", use: "Strong borders, placeholders" },
    ],
  },
  {
    name: "Aura",
    note: "The brand family. Lilac leads; violet and periwinkle support it and form the one gradient.",
    tokens: [
      { name: "lilac-200", use: "Primary button hover" },
      { name: "lilac-300", use: "Primary actions, focus ring, links on hover" },
      { name: "violet-300", use: "Particle lines, secondary accent" },
      { name: "violet-500", use: "Glows and elevation light" },
      { name: "periwinkle-300", use: "Gradient end" },
      { name: "indigo-400", use: "Illustration mid-tone" },
    ],
  },
  {
    name: "Signal",
    note: "Coral, taken from the hair in the hero portrait. Small doses only: it marks where you are or what's live.",
    tokens: [
      { name: "coral-400", use: "Wordmark dot, active nav, nodes under the cursor" },
      { name: "coral-300", use: "Softer signal on hover" },
    ],
  },
  {
    name: "Feedback",
    note: "Feedback colours for forms and checks, always paired with a text label.",
    tokens: [
      { name: "mint-300", use: "Success messages" },
      { name: "amber-300", use: "Warnings" },
      { name: "rose-300", use: "Errors and invalid fields" },
    ],
  },
  {
    name: "Text",
    note: "Three steps of emphasis. Never go dimmer than muted for anything people need to read.",
    tokens: [
      { name: "white-100", use: "Primary text, headings" },
      { name: "grey-300", use: "Secondary text, body copy" },
      { name: "grey-400", use: "Muted text, meta, captions" },
    ],
  },
];

export const semanticTokens = [
  { name: "bg", maps: "ink-950", use: "Page background" },
  { name: "surface", maps: "ink-900", use: "Sections, forms, footer" },
  { name: "surface-raised", maps: "ink-800", use: "Tags, hover rows" },
  { name: "border", maps: "ink-700", use: "Dividers and hairlines" },
  { name: "border-strong", maps: "ink-500", use: "Buttons, inputs, emphasis rules" },
  { name: "text-primary", maps: "white-100", use: "Headings and key text" },
  { name: "text-secondary", maps: "grey-300", use: "Body copy" },
  { name: "text-muted", maps: "grey-400", use: "Meta and captions" },
  { name: "accent", maps: "lilac-300", use: "Primary action colour" },
  { name: "accent-soft", maps: "violet-300", use: "Supporting accent" },
  { name: "signal", maps: "coral-400", use: "Current location, live state" },
  { name: "focus", maps: "lilac-300", use: "Keyboard focus ring" },
  { name: "success", maps: "mint-300", use: "Confirmations" },
  { name: "warning", maps: "amber-300", use: "In progress" },
  { name: "danger", maps: "rose-300", use: "Errors" },
];

// Pairs checked on the page with the WCAG 2.x contrast formula.
export const contrastForegrounds = [
  "white-100",
  "grey-300",
  "grey-400",
  "lilac-300",
  "violet-300",
  "coral-400",
  "mint-300",
  "amber-300",
  "rose-300",
];
export const contrastBackgrounds = ["ink-950", "ink-900", "ink-800"];

export const typeScale = [
  { token: "display", size: "68–200px", leading: "0.88", weight: "800", width: "75", tracking: "-2%", use: "The hero name. Once per site.", className: "t-display", sample: "Monawe" },
  { token: "h1", size: "38–67px", leading: "1.0", weight: "750", width: "80", tracking: "-3%", use: "Page titles", className: "t-h1", sample: "Selected work" },
  { token: "h2", size: "28–51px", leading: "1.12", weight: "700", width: "85", tracking: "-2%", use: "Section titles", className: "t-h2", sample: "What I do" },
  { token: "h3", size: "21px", leading: "1.35", weight: "650", width: "100", tracking: "-1%", use: "Card and block titles", className: "t-h3", sample: "Strategy and business analysis" },
  { token: "lead", size: "18–21px", leading: "1.5", weight: "400", width: "100", tracking: "0", use: "Intro paragraphs, max 46ch", className: "t-lead", sample: "I work out what a problem really is, then solve it." },
  { token: "body", size: "16px", leading: "1.6", weight: "400", width: "100", tracking: "0", use: "Running text, max 66ch", className: "t-body", sample: "Research, flows, wireframes and a design system, then the build." },
  { token: "small", size: "14px", leading: "1.6", weight: "400", width: "100", tracking: "0", use: "Meta, captions, dates", className: "t-small", sample: "Founder, product designer and developer" },
  { token: "xs", size: "12px", leading: "1.5", weight: "600", width: "100", tracking: "0", use: "Small labels only", className: "t-xs", sample: "Video coming soon" },
  { token: "mono", size: "13px", leading: "1.5", weight: "400", width: "n/a", tracking: "0", use: "Code and token names only", className: "t-mono", sample: "--lilac-300: #e59cff;" },
];

export const spaceScale = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];

export const breakpoints = [
  { name: "base", min: "0", note: "Single column. Gutters 16px. Mobile menu." },
  { name: "sm", min: "560px", note: "Contact details split into two columns." },
  { name: "md", min: "820px", note: "Full nav appears. Project videos sit beside their details." },
  { name: "lg", min: "1080px", note: "Hero splits into name and portrait. Contact goes side by side." },
  { name: "xl", min: "1360px", note: "Content stops growing at 1240px; margins absorb the rest." },
];

export const radii = [
  { name: "radius-xs", use: "Tags" },
  { name: "radius-sm", use: "Inputs" },
  { name: "radius-md", use: "Video thumbnails, panels" },
  { name: "radius-lg", use: "Large panels, portraits" },
  { name: "radius-pill", use: "Buttons" },
];

export const durations = [
  { name: "dur-instant", use: "Button press feedback" },
  { name: "dur-fast", use: "Hover colour changes" },
  { name: "dur-base", use: "Underlines, small reveals" },
  { name: "dur-slow", use: "Modals, footer link sweep" },
  { name: "dur-reveal", use: "The hero name rise" },
];

export const easings = [
  { name: "ease-out", bezier: [0.16, 1, 0.3, 1], use: "Default. Things arriving or responding: fast start, soft landing." },
  { name: "ease-in-out", bezier: [0.65, 0, 0.35, 1], use: "Things that move from one place to another, like the menu sheet." },
  { name: "ease-in", bezier: [0.55, 0, 1, 0.45], use: "Things leaving the screen. Use rarely." },
];

export const signatureMotion = [
  { name: "Hero name rise", spec: "900ms, ease-out, 120ms stagger per line", trigger: "Page load, once" },
  { name: "Particle drift", spec: "1–2s per hop, circ in-out, looping", trigger: "Ambient, pauses off-screen" },
  { name: "Menu sheet", spec: "500ms clip-path circle, ease-in-out", trigger: "Menu button" },
  { name: "Nav underline", spec: "240ms scaleX, ease-out", trigger: "Hover and current page" },
  { name: "Button press", spec: "90ms scale to 0.97", trigger: "Pointer down" },
  { name: "Video preview", spec: "Plays muted on hover; glow 240ms ease-out", trigger: "Thumbnail hover or focus" },
];

export const exportTokens = [
  "ink-950", "ink-900", "ink-800", "ink-700", "ink-600", "ink-500",
  "lilac-200", "lilac-300", "violet-300", "violet-500", "periwinkle-300", "indigo-400",
  "coral-300", "coral-400", "mint-300", "amber-300", "rose-300",
  "white-100", "grey-300", "grey-400",
  "font-sans", "font-mono",
  "text-xs", "text-sm", "text-base", "text-md", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-display",
  "space-1", "space-2", "space-3", "space-4", "space-6", "space-8", "space-12", "space-16", "space-24",
  "radius-xs", "radius-sm", "radius-md", "radius-lg", "radius-pill",
  "dur-instant", "dur-fast", "dur-base", "dur-slow", "dur-reveal",
  "ease-out", "ease-in-out", "ease-in",
];
