import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Wordmark from "./ui/Wordmark";
import ProjectEntry from "./work/ProjectEntry";
import projects from "../data/projects";
import {
  colorGroups,
  semanticTokens,
  contrastForegrounds,
  contrastBackgrounds,
  typeScale,
  spaceScale,
  breakpoints,
  radii,
  durations,
  easings,
  signatureMotion,
  exportTokens,
} from "../data/tokens";
import "../styles/styleguide.scss";

/* ---------- Helpers ---------- */

const SECTIONS = [
  { id: "principles", title: "Principles" },
  { id: "logo", title: "Logo" },
  { id: "colour", title: "Colour" },
  { id: "typography", title: "Typography" },
  { id: "spacing", title: "Spacing" },
  { id: "layout", title: "Layout and grid" },
  { id: "shape", title: "Shape and elevation" },
  { id: "iconography", title: "Iconography" },
  { id: "components", title: "Components" },
  { id: "motion", title: "Motion" },
  { id: "imagery", title: "Imagery" },
  { id: "voice", title: "Voice and tone" },
  { id: "accessibility", title: "Accessibility" },
  { id: "tokens", title: "Tokens" },
];

// Reads every CSS custom property we need from :root once the page has mounted.
function useTokenValues(names) {
  const [values, setValues] = useState({});
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const out = {};
    names.forEach((n) => {
      out[n] = css.getPropertyValue(`--${n}`).trim();
    });
    setValues(out);
  }, [names]);
  return values;
}

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const luminance = ([r, g, b]) => {
  const c = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const contrast = (a, b) => {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  if (!ra || !rb) return null;
  const [l1, l2] = [luminance(ra), luminance(rb)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const grade = (ratio) => {
  if (ratio == null) return { label: "", tone: "" };
  if (ratio >= 7) return { label: "AAA", tone: "pass" };
  if (ratio >= 4.5) return { label: "AA", tone: "pass" };
  if (ratio >= 3) return { label: "Large text only", tone: "warn" };
  return { label: "Decorative only", tone: "fail" };
};

function Section({ id, index, title, intro, children }) {
  return (
    <section id={id} className="sg-section" aria-labelledby={`${id}-title`}>
      <header className="sg-section__head">
        <span className="sg-section__num t-mono">{String(index + 1).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className="t-h2">
          {title}
        </h2>
        {intro && <p className="t-body sg-section__intro">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

function Sub({ title, children, note }) {
  return (
    <div className="sg-sub">
      <h3 className="t-h3">{title}</h3>
      {note && <p className="t-body sg-sub__note">{note}</p>}
      {children}
    </div>
  );
}

function Rule({ kind, children }) {
  return (
    <div className={`sg-rule sg-rule--${kind}`}>
      <span className="sg-rule__label">{kind === "do" ? "Do" : "Don't"}</span>
      <div>{children}</div>
    </div>
  );
}

/* ---------- Table of contents ---------- */

function Toc() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="sg-toc" aria-label="Style guide sections">
      <ol>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- Motion demos ---------- */

function EasingCurve({ name, bezier, use }) {
  const [run, setRun] = useState(0);
  const [x1, y1, x2, y2] = bezier;
  const S = 120;
  const pad = 10;
  const px = (v) => pad + v * S;
  const py = (v) => pad + (1 - v) * S;
  return (
    <figure className="sg-easing">
      <svg viewBox={`0 0 ${S + pad * 2} ${S + pad * 2}`} aria-hidden="true">
        <rect x={pad} y={pad} width={S} height={S} className="sg-easing__frame" />
        <line x1={px(0)} y1={py(0)} x2={px(x1)} y2={py(y1)} className="sg-easing__handle" />
        <line x1={px(1)} y1={py(1)} x2={px(x2)} y2={py(y2)} className="sg-easing__handle" />
        <circle cx={px(x1)} cy={py(y1)} r="3" className="sg-easing__knob" />
        <circle cx={px(x2)} cy={py(y2)} r="3" className="sg-easing__knob" />
        <path
          d={`M ${px(0)} ${py(0)} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${px(1)} ${py(1)}`}
          className="sg-easing__curve"
        />
      </svg>
      <div className="sg-easing__track">
        <motion.span
          key={run}
          className="sg-easing__ball"
          initial={{ left: "0%" }}
          animate={{ left: "calc(100% - 14px)" }}
          transition={{ duration: 1.1, ease: bezier }}
        />
      </div>
      <figcaption>
        <div className="sg-easing__title">
          <code className="t-mono">--{name}</code>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRun((r) => r + 1)}>
            Replay
          </button>
        </div>
        <span className="t-mono t-small">cubic-bezier({bezier.join(", ")})</span>
        <p className="t-small">{use}</p>
      </figcaption>
    </figure>
  );
}

function DurationDemo({ name, value, use }) {
  const [on, setOn] = useState(false);
  return (
    <li className="sg-duration">
      <code className="t-mono">--{name}</code>
      <span className="t-mono t-small">{value}</span>
      <button
        type="button"
        className="sg-duration__track"
        onClick={() => setOn((v) => !v)}
        aria-label={`Play ${name} demo`}
      >
        <span className="sg-duration__dot" style={{ transitionDuration: value, left: on ? "calc(100% - 18px)" : "4px" }} />
      </button>
      <span className="t-small">{use}</span>
    </li>
  );
}

/* ---------- Icons (drawn on a 24px grid, 1.75px stroke) ---------- */

const ICONS = {
  "Arrow right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "Arrow left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  External: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  Mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  Play: <path d="M8 5v14l11-7z" />,
  Close: <path d="M6 6l12 12M18 6L6 18" />,
  Menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  Copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a1 1 0 0 1 1-1h10" />
    </>
  ),
};

function Icon({ children }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

/* ---------- Tokens export ---------- */

function TokenExport({ values }) {
  const [copied, setCopied] = useState(false);
  const css = useMemo(
    () => `:root {\n${exportTokens.map((t) => `  --${t}: ${values[t] || ""};`).join("\n")}\n}`,
    [values]
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="sg-code">
      <div className="sg-code__bar">
        <span className="t-mono t-small">tokens.css</span>
        <button type="button" className="btn btn--secondary btn--sm" onClick={copy}>
          {copied ? "Copied" : "Copy tokens"}
        </button>
      </div>
      <pre>
        <code className="t-mono">{css}</code>
      </pre>
    </div>
  );
}

/* ---------- The guide ---------- */

function StyleGuide() {
  const reduce = useReducedMotion();
  const allColorNames = useMemo(() => colorGroups.flatMap((g) => g.tokens.map((t) => t.name)), []);
  const tokenNames = useMemo(
    () => [
      ...allColorNames,
      ...spaceScale.map((s) => `space-${s}`),
      ...radii.map((r) => r.name),
      ...durations.map((d) => d.name),
      ...exportTokens,
    ],
    [allColorNames]
  );
  const v = useTokenValues(tokenNames);

  return (
    <div className="sg">
      <header className="page-head sg-head">
        <h1 className="t-h1">Style guide</h1>
        <p className="t-lead">
          The system behind this site: principles, colour, type, space, components, motion and voice. Every value on
          this page is read live from the code, so it is always current.
        </p>
      </header>

      <div className="sg-layout">
        <Toc />

        <div className="sg-content">
          {/* 01 Principles */}
          <Section id="principles" index={0} title="Principles" intro="Four rules that settle most design arguments on this site.">
            <ol className="sg-principles">
              <li>
                <h3 className="t-h3">Real problems first</h3>
                <p className="t-body">
                  Every screen traces back to a person and a task. Show who the work is for and what changed before
                  showing polish.
                </p>
              </li>
              <li>
                <h3 className="t-h3">One loud thing per view</h3>
                <p className="t-body">
                  The hero name and particle field are the bold move. Everything around them stays quiet: plain
                  surfaces, few colours, lots of space.
                </p>
              </li>
              <li>
                <h3 className="t-h3">Depth is light</h3>
                <p className="t-body">
                  On a night-sky ground, things come forward with brighter borders and a soft violet glow, never grey
                  drop shadows.
                </p>
              </li>
              <li>
                <h3 className="t-h3">Say it plainly</h3>
                <p className="t-body">
                  Sentence case, active verbs, no hype. If a label needs explaining, the label is wrong.
                </p>
              </li>
            </ol>
          </Section>

          {/* 02 Logo */}
          <Section
            id="logo"
            index={1}
            title="Logo"
            intro="A wordmark, not a symbol. The name is set in Bricolage Grotesque at its narrowest width and heaviest weight, finished with the coral signal dot."
          >
            <div className="sg-logo-grid">
              <figure className="sg-logo sg-logo--primary">
                <div className="sg-logo__stage">
                  <Wordmark className="sg-logo__mark" />
                </div>
                <figcaption className="t-small">Primary wordmark. Use wherever there's room.</figcaption>
              </figure>
              <figure className="sg-logo">
                <div className="sg-logo__stage">
                  <Wordmark variant="monogram" className="sg-logo__mark" />
                </div>
                <figcaption className="t-small">Monogram. Footer, favicon and tight spaces.</figcaption>
              </figure>
              <figure className="sg-logo">
                <div className="sg-logo__stage sg-logo__stage--light">
                  <Wordmark className="sg-logo__mark" />
                </div>
                <figcaption className="t-small">On light backgrounds the letters switch to ink-950. The dot stays coral.</figcaption>
              </figure>
            </div>

            <div className="sg-two">
              <Sub title="Construction">
                <ul className="sg-list">
                  <li>Typeface: Bricolage Grotesque, weight 800, width 75, tracking −3%.</li>
                  <li>Dot: a circle 0.26 × the font size, coral-400, sitting on the baseline.</li>
                  <li>Clear space: keep the height of the capital L free on every side.</li>
                  <li>Minimum size: 18px font size for the wordmark, 16px for the monogram.</li>
                </ul>
              </Sub>
              <Sub title="Misuse">
                <div className="sg-misuse">
                  <figure>
                    <div className="sg-logo__stage">
                      <span className="wordmark sg-misuse--stretch">Louis Monawe<span className="wordmark__dot" /></span>
                    </div>
                    <figcaption className="t-small">Don't stretch or squash it.</figcaption>
                  </figure>
                  <figure>
                    <div className="sg-logo__stage">
                      <span className="wordmark">
                        Louis Monawe<span className="wordmark__dot" style={{ background: "var(--lilac-300)" }} />
                      </span>
                    </div>
                    <figcaption className="t-small">Don't recolour the dot.</figcaption>
                  </figure>
                  <figure>
                    <div className="sg-logo__stage">
                      <span className="wordmark sg-misuse--font">Louis Monawe<span className="wordmark__dot" /></span>
                    </div>
                    <figcaption className="t-small">Don't set it in another typeface.</figcaption>
                  </figure>
                </div>
              </Sub>
            </div>
          </Section>

          {/* 03 Colour */}
          <Section
            id="colour"
            index={2}
            title="Colour"
            intro="Ink for the ground, lilac for action, coral for signal. Roughly 80% ink, 15% text, 5% colour."
          >
            <div className="sg-ratio" aria-hidden="true">
              <span style={{ flex: 80, background: "var(--ink-950)" }} />
              <span style={{ flex: 15, background: "var(--white-100)" }} />
              <span style={{ flex: 4, background: "var(--lilac-300)" }} />
              <span style={{ flex: 1, background: "var(--coral-400)" }} />
            </div>

            {colorGroups.map((g) => (
              <Sub key={g.name} title={g.name} note={g.note}>
                <ul className="sg-swatches">
                  {g.tokens.map((t) => {
                    const hex = v[t.name] || "";
                    const rgb = hexToRgb(hex);
                    return (
                      <li key={t.name} className="sg-swatch">
                        <span className="sg-swatch__chip" style={{ background: `var(--${t.name})` }} />
                        <code className="t-mono">--{t.name}</code>
                        <span className="t-mono t-small">
                          {hex.toUpperCase()}
                          {rgb && <> / {rgb.join(" ")}</>}
                        </span>
                        <span className="t-small">{t.use}</span>
                      </li>
                    );
                  })}
                </ul>
              </Sub>
            ))}

            <Sub title="Gradient" note="One gradient, used on the second line of the hero name and nowhere else. It is never a background fill.">
              <div className="sg-gradient">
                <span className="sg-gradient__bar" />
                <code className="t-mono t-small">--gradient-aura: linear-gradient(100deg, lilac-300, violet-300, periwinkle-300)</code>
              </div>
            </Sub>

            <Sub title="Semantic roles" note="Components use roles, not raw colours. Change a role once and every component follows.">
              <div className="sg-table-wrap">
                <table className="sg-table">
                  <thead>
                    <tr>
                      <th scope="col">Role</th>
                      <th scope="col">Maps to</th>
                      <th scope="col">Used for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semanticTokens.map((t) => (
                      <tr key={t.name}>
                        <td>
                          <span className="sg-dot" style={{ background: `var(--${t.name})` }} />
                          <code className="t-mono">--{t.name}</code>
                        </td>
                        <td>
                          <code className="t-mono">{t.maps}</code>
                        </td>
                        <td>{t.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Sub>

            <Sub
              title="Contrast"
              note="Calculated live with the WCAG formula. Body text needs 4.5:1 (AA). Large text (24px, or 19px bold) needs 3:1."
            >
              <div className="sg-table-wrap">
                <table className="sg-table sg-contrast">
                  <thead>
                    <tr>
                      <th scope="col">Text colour</th>
                      {contrastBackgrounds.map((b) => (
                        <th key={b} scope="col">
                          on {b}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {contrastForegrounds.map((f) => (
                      <tr key={f}>
                        <th scope="row">
                          <code className="t-mono">{f}</code>
                        </th>
                        {contrastBackgrounds.map((b) => {
                          const r = v[f] && v[b] ? contrast(v[f], v[b]) : null;
                          const gr = grade(r);
                          return (
                            <td key={b} style={{ background: `var(--${b})` }}>
                              <span className="sg-contrast__sample" style={{ color: `var(--${f})` }}>
                                Aa
                              </span>
                              <span className="t-mono">{r ? `${r.toFixed(2)}:1` : ""}</span>
                              <span className={`sg-grade sg-grade--${gr.tone}`}>{gr.label}</span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr>
                      <th scope="row">
                        <code className="t-mono">ink-950</code>
                      </th>
                      <td colSpan={contrastBackgrounds.length} style={{ background: "var(--lilac-300)" }}>
                        <span className="sg-contrast__sample" style={{ color: "var(--ink-950)" }}>
                          Aa
                        </span>
                        <span className="t-mono" style={{ color: "var(--ink-950)" }}>
                          {v["ink-950"] && v["lilac-300"] ? `${contrast(v["ink-950"], v["lilac-300"]).toFixed(2)}:1 on lilac-300` : ""}
                        </span>
                        <span className="sg-grade sg-grade--pass sg-grade--on-light">Primary button label</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Sub>
          </Section>

          {/* 04 Typography */}
          <Section
            id="typography"
            index={3}
            title="Typography"
            intro="One family does all the work. Bricolage Grotesque is a variable grotesque with three axes (weight, width and optical size), so headlines can be narrow and heavy while body text stays open and calm."
          >
            <div className="sg-specimen">
              <div className="sg-specimen__aa" aria-hidden="true">
                Aa
              </div>
              <div className="sg-specimen__meta">
                <h3 className="t-h3">Bricolage Grotesque</h3>
                <p className="t-small">Weights 200–800. Width 75–100. Optical size 12–96. SIL Open Font Licence, self-hosted with the site.</p>
                <p className="sg-specimen__glyphs" aria-hidden="true">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  0123456789 &amp; ? ! @ ( ) R 1 299,00
                </p>
                <div className="sg-axes" aria-hidden="true">
                  <span style={{ fontWeight: 300 }}>Light</span>
                  <span style={{ fontWeight: 500 }}>Medium</span>
                  <span style={{ fontWeight: 800 }}>Heavy</span>
                  <span style={{ fontWeight: 800, fontVariationSettings: '"wdth" 75' }}>Condensed</span>
                </div>
              </div>
            </div>

            <div className="sg-specimen sg-specimen--mono">
              <div className="sg-specimen__aa t-mono" aria-hidden="true">
                {"{}"}
              </div>
              <div className="sg-specimen__meta">
                <h3 className="t-h3">JetBrains Mono</h3>
                <p className="t-small">Code and token names only. Never for labels, headings or UI text.</p>
              </div>
            </div>

            <Sub title="Type scale" note="A perfect-fourth scale (×1.333) from a 16px base. The larger the size, the tighter the leading and the narrower the width.">
              <div className="sg-scale">
                {typeScale.map((t) => (
                  <div key={t.token} className="sg-scale__row">
                    <div className="sg-scale__spec">
                      <code className="t-mono">{t.token}</code>
                      <span className="t-small">
                        {t.size} / {t.leading}
                      </span>
                      <span className="t-small">
                        Weight {t.weight}, width {t.width}, tracking {t.tracking}
                      </span>
                      <span className="t-small">{t.use}</span>
                    </div>
                    <p className={`sg-scale__sample ${t.className}`}>{t.sample}</p>
                  </div>
                ))}
              </div>
            </Sub>

            <div className="sg-two">
              <Rule kind="do">
                <p>Use sentence case for every heading, button and label.</p>
                <p className="sg-rule__eg t-h3">Selected work</p>
              </Rule>
              <Rule kind="dont">
                <p>Set labels in tracked-out capitals.</p>
                <p className="sg-rule__eg sg-caps">SELECTED WORK</p>
              </Rule>
              <Rule kind="do">
                <p>Keep body text between 45 and 75 characters a line. The body token caps it at 66.</p>
              </Rule>
              <Rule kind="dont">
                <p>Highlight a single word in a headline with a different colour or italic.</p>
              </Rule>
              <Rule kind="do">
                <p>Use the condensed width only from 28px up, where it reads as confident rather than cramped.</p>
              </Rule>
              <Rule kind="dont">
                <p>Mix in a second display face. Weight and width give enough contrast on their own.</p>
              </Rule>
            </div>
          </Section>

          {/* 05 Spacing */}
          <Section
            id="spacing"
            index={4}
            title="Spacing"
            intro="Every gap is a multiple of 4px. Small steps group things together; big steps separate ideas."
          >
            <ul className="sg-space">
              {spaceScale.map((s) => (
                <li key={s}>
                  <code className="t-mono">--space-{s}</code>
                  <span className="t-mono t-small">{v[`space-${s}`]}</span>
                  <span className="sg-space__bar" style={{ width: `var(--space-${s})` }} />
                </li>
              ))}
            </ul>
            <div className="sg-three">
              <Sub title="4–12px">
                <p className="t-body">Inside a component: icon to label, chip padding, label to input.</p>
              </Sub>
              <Sub title="16–32px">
                <p className="t-body">Between related things: card elements, form fields, paragraphs.</p>
              </Sub>
              <Sub title="48–128px">
                <p className="t-body">Between sections and ideas. When in doubt, add more space here, not more lines.</p>
              </Sub>
            </div>
          </Section>

          {/* 06 Layout */}
          <Section
            id="layout"
            index={5}
            title="Layout and grid"
            intro="Content is left-aligned on a 12-column grid inside a 1240px container. Gutters scale from 16px on phones to 40px on large screens."
          >
            <div className="sg-grid-demo" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <p className="t-small sg-caption">Columns collapse to 8 on tablets and 4 on phones. Resize the window to see it.</p>

            <div className="sg-table-wrap">
              <table className="sg-table">
                <thead>
                  <tr>
                    <th scope="col">Breakpoint</th>
                    <th scope="col">From</th>
                    <th scope="col">What changes</th>
                  </tr>
                </thead>
                <tbody>
                  {breakpoints.map((b) => (
                    <tr key={b.name}>
                      <td>
                        <code className="t-mono">{b.name}</code>
                      </td>
                      <td className="t-mono">{b.min}</td>
                      <td>{b.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sg-three">
              <Sub title="Container">
                <p className="t-body">1240px wide, plus gutters. Used by every page.</p>
              </Sub>
              <Sub title="Reading width">
                <p className="t-body">760px for long text, so lines stay comfortable to read.</p>
              </Sub>
              <Sub title="Top bar">
                <p className="t-body">72px tall and fixed. Pages start 48px below it.</p>
              </Sub>
            </div>
          </Section>

          {/* 07 Shape */}
          <Section
            id="shape"
            index={6}
            title="Shape and elevation"
            intro="Radius grows with the size of the thing. Small parts are nearly square; big panels are soft; anything you press is a pill."
          >
            <ul className="sg-radii">
              {radii.map((r) => (
                <li key={r.name}>
                  <span className="sg-radii__shape" style={{ borderRadius: `var(--${r.name})` }} />
                  <code className="t-mono">--{r.name}</code>
                  <span className="t-mono t-small">{v[r.name]}</span>
                  <span className="t-small">{r.use}</span>
                </li>
              ))}
            </ul>

            <Sub title="Elevation" note="Three levels, all made of light. Most things sit at level 0 or 1.">
              <ul className="sg-elevation">
                <li>
                  <span className="sg-elevation__box" style={{ boxShadow: "none" }} />
                  <span className="t-small">0: flat on the page</span>
                </li>
                <li>
                  <span className="sg-elevation__box" style={{ boxShadow: "var(--elevation-1)" }} />
                  <span className="t-small">1: forms and panels</span>
                </li>
                <li>
                  <span className="sg-elevation__box" style={{ boxShadow: "var(--elevation-2)" }} />
                  <span className="t-small">2: floating cards</span>
                </li>
                <li>
                  <span className="sg-elevation__box" style={{ boxShadow: "var(--elevation-3)" }} />
                  <span className="t-small">3: dialogs</span>
                </li>
              </ul>
            </Sub>
          </Section>

          {/* 08 Iconography */}
          <Section
            id="iconography"
            index={7}
            title="Iconography"
            intro="Words first. An icon appears only when it is faster to read than the word, and it always sits next to the word or has an accessible label."
          >
            <ul className="sg-icons">
              {Object.entries(ICONS).map(([name, paths]) => (
                <li key={name}>
                  <Icon>{paths}</Icon>
                  <span className="t-small">{name}</span>
                </li>
              ))}
            </ul>
            <div className="sg-two">
              <Sub title="Drawing rules">
                <ul className="sg-list">
                  <li>24px grid with 2px of padding.</li>
                  <li>1.75px stroke, round caps and joins.</li>
                  <li>Outline only. Fill is reserved for the play triangle.</li>
                  <li>Always currentColor, so icons follow the text around them.</li>
                </ul>
              </Sub>
              <Sub title="Social links">
                <p className="t-body">
                  LinkedIn and GitHub are written as words, not shown as brand logos. It reads cleaner and keeps the
                  page in one visual voice.
                </p>
              </Sub>
            </div>
          </Section>

          {/* 09 Components */}
          <Section id="components" index={8} title="Components" intro="The parts every page is built from. Each one shown in its real states.">
            <Sub title="Buttons" note="One primary button per view. Labels are verbs that say what happens.">
              <div className="sg-states">
                <div className="sg-states__head">
                  <span />
                  <span className="t-small">Default</span>
                  <span className="t-small">Hover</span>
                  <span className="t-small">Focus</span>
                  <span className="t-small">Disabled</span>
                </div>
                {[
                  { cls: "btn--primary", name: "Primary" },
                  { cls: "btn--secondary", name: "Secondary" },
                  { cls: "btn--ghost", name: "Ghost" },
                ].map((b) => (
                  <div key={b.cls} className="sg-states__row">
                    <span className="t-small">{b.name}</span>
                    <span><button type="button" className={`btn ${b.cls}`}>Send message</button></span>
                    <span><button type="button" className={`btn ${b.cls} is-hover`} tabIndex={-1}>Send message</button></span>
                    <span><button type="button" className={`btn ${b.cls} is-focus`} tabIndex={-1}>Send message</button></span>
                    <span><button type="button" className={`btn ${b.cls}`} disabled>Send message</button></span>
                  </div>
                ))}
              </div>
              <div className="sg-inline">
                <button type="button" className="btn btn--primary">
                  Default size, 48px
                </button>
                <button type="button" className="btn btn--primary btn--sm">
                  Small, 38px
                </button>
              </div>
            </Sub>

            <Sub title="Links" note="Underlined by default so they never rely on colour alone. The underline brightens on hover.">
              <p className="t-body">
                Watch the <a className="link" href="#components">WashBook video</a> or{" "}
                <a className="link" href="#components">email me directly</a>.
              </p>
            </Sub>

            <Sub title="Form fields" note="Label above, hint below, error replaces the hint. Never use placeholder text as the label.">
              <div className="sg-fields">
                <div className="field">
                  <label htmlFor="sg-1">Your name</label>
                  <input id="sg-1" type="text" defaultValue="" placeholder="" />
                </div>
                <div className="field">
                  <label htmlFor="sg-2">Email address</label>
                  <input id="sg-2" type="email" className="is-focus" defaultValue="louis@" />
                  <span className="field-hint">So I can reply to you.</span>
                </div>
                <div className="field is-invalid">
                  <label htmlFor="sg-3">Email address</label>
                  <input id="sg-3" type="email" defaultValue="louis@" aria-invalid="true" aria-describedby="sg-3-err" />
                  <span id="sg-3-err" className="field-error">
                    Enter an email address in the format name@example.com.
                  </span>
                </div>
              </div>
            </Sub>

            <Sub title="Tags" note="Tags describe a project's tools and skills. They are labels, never buttons.">
              <div className="sg-inline">
                <span className="tag">Next.js</span>
                <span className="tag">Supabase</span>
                <span className="tag">Figma</span>
                <span className="tag">Product strategy</span>
              </div>
            </Sub>

            <Sub
              title="Project entry"
              note="The one building block of the Work page: a video on one side, the details on the other. Hovering the video plays a silent preview; selecting it opens the full video."
            >
              <div className="entries sg-entry-demo">
                <ProjectEntry project={projects.find((p) => p.video) || projects[0]} onPlay={() => {}} />
              </div>
            </Sub>

            <Sub
              title="Entry without a video"
              note="Until a video is added, the thumbnail shows the project's initial and says so plainly. Nothing else changes."
            >
              <div className="entries sg-entry-demo">
                <ProjectEntry project={projects.find((p) => !p.video) || projects[0]} onPlay={() => {}} />
              </div>
            </Sub>
          </Section>

          {/* 10 Motion */}
          <Section
            id="motion"
            index={9}
            title="Motion"
            intro="Motion either answers something you did or happens once, on purpose. Nothing moves just to fill silence."
          >
            <p className={`sg-reduced ${reduce ? "is-on" : ""}`}>
              {reduce
                ? "Your device asks for reduced motion, so this site is showing still frames and instant transitions."
                : "Your device allows motion. If you switch on reduced motion in your system settings, this site removes animation and freezes the particle field."}
            </p>

            <Sub title="Durations" note="Select a track to play it.">
              <ul className="sg-durations">
                {durations.map((d) => (
                  <DurationDemo key={d.name} name={d.name} value={v[d.name]} use={d.use} />
                ))}
              </ul>
            </Sub>

            <Sub title="Easing">
              <div className="sg-easings">
                {easings.map((e) => (
                  <EasingCurve key={e.name} {...e} />
                ))}
              </div>
            </Sub>

            <Sub title="Signature moments">
              <div className="sg-table-wrap">
                <table className="sg-table">
                  <thead>
                    <tr>
                      <th scope="col">Moment</th>
                      <th scope="col">Spec</th>
                      <th scope="col">Triggered by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signatureMotion.map((m) => (
                      <tr key={m.name}>
                        <td>{m.name}</td>
                        <td className="t-mono">{m.spec}</td>
                        <td>{m.trigger}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Sub>

            <div className="sg-two">
              <Rule kind="do">
                <p>Give each page at most one orchestrated entrance. On Home it's the name rising into place.</p>
              </Rule>
              <Rule kind="dont">
                <p>Fade and slide every section in as you scroll. It slows reading and adds nothing.</p>
              </Rule>
            </div>
          </Section>

          {/* 11 Imagery */}
          <Section
            id="imagery"
            index={10}
            title="Imagery"
            intro="Real people and real work. Every project is shown as a short screen recording, so visitors see the thing working instead of a static picture of it."
          >
            <div className="sg-two">
              <Sub title="Portraits">
                <ul className="sg-list">
                  <li>Warm, natural light. Smiling or mid-task, never stiff.</li>
                  <li>Cut-outs sit on ink with a soft lilac glow behind them.</li>
                  <li>Fade the bottom edge into the page instead of cropping hard.</li>
                </ul>
              </Sub>
              <Sub title="Project videos">
                <ul className="sg-list">
                  <li>MP4 (H.264), 1080p at most, ideally under 50MB.</li>
                  <li>16:10 or 16:9. Thumbnails crop to 16:10.</li>
                  <li>30 to 90 seconds. Show the main flow, not every screen.</li>
                  <li>The frame at half a second becomes the thumbnail, so open on something clear.</li>
                  <li>Previews play muted, so the video must make sense without sound.</li>
                </ul>
              </Sub>
            </div>
          </Section>

          {/* 12 Voice */}
          <Section
            id="voice"
            index={11}
            title="Voice and tone"
            intro="Write like you'd explain your work to a smart friend across the table: first person, specific, unhurried."
          >
            <div className="sg-three">
              <Sub title="Plain">
                <p className="t-body">Everyday words. Say "booking app", not "mobility-adjacent service orchestration platform".</p>
              </Sub>
              <Sub title="Specific">
                <p className="t-body">Name the tool, the user and the result. Specific claims are believable claims.</p>
              </Sub>
              <Sub title="Confident, not loud">
                <p className="t-body">Let the work make the case. No exclamation marks, no superlatives about yourself.</p>
              </Sub>
            </div>

            <div className="sg-pairs">
              <Rule kind="do">
                <p className="sg-quote">I designed the booking flow and built it in Next.js.</p>
              </Rule>
              <Rule kind="dont">
                <p className="sg-quote">I'm a web wizard who does it all!</p>
              </Rule>
              <Rule kind="do">
                <p className="sg-quote">See my work</p>
              </Rule>
              <Rule kind="dont">
                <p className="sg-quote">Explore my creative universe</p>
              </Rule>
              <Rule kind="do">
                <p className="sg-quote">The message didn't send. Check your connection and try again.</p>
              </Rule>
              <Rule kind="dont">
                <p className="sg-quote">Oops! Something went wrong :(</p>
              </Rule>
            </div>

            <Sub title="Words we use">
              <div className="sg-table-wrap">
                <table className="sg-table">
                  <thead>
                    <tr>
                      <th scope="col">Say</th>
                      <th scope="col">Instead of</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Work</td><td>Portfolio pieces, creations</td></tr>
                    <tr><td>Get in touch</td><td>Contact me, Hit me up, Submit</td></tr>
                    <tr><td>Watch video</td><td>Click here, Play now</td></tr>
                    <tr><td>In development</td><td>WIP, Coming soon</td></tr>
                    <tr><td>Send message</td><td>Submit</td></tr>
                  </tbody>
                </table>
              </div>
            </Sub>
          </Section>

          {/* 13 Accessibility */}
          <Section
            id="accessibility"
            index={12}
            title="Accessibility"
            intro="The floor, not a feature. These are the WCAG 2.2 AA checks every page is built to."
          >
            <ul className="sg-checklist">
              <li>Body text at 4.5:1 contrast or better. Checked live in the colour section.</li>
              <li>A visible 2px lilac focus ring, offset 3px, on everything you can tab to.</li>
              <li>A "Skip to content" link as the first thing on every page.</li>
              <li>Targets at least 24×24px; main buttons are 48px tall.</li>
              <li>Reduced motion respected everywhere, including the particle field.</li>
              <li>Menu and video player close with Escape and return focus where it was.</li>
              <li>Form status messages are announced to screen readers.</li>
              <li>Information is never shown by colour alone; every colour cue has a text label.</li>
              <li>Every image has alt text, or empty alt if it's decorative.</li>
              <li>Headings follow order: one h1 per page, then h2, then h3.</li>
            </ul>
          </Section>

          {/* 14 Tokens */}
          <Section
            id="tokens"
            index={13}
            title="Tokens"
            intro="Copy these into any project to use the system. The source of truth is src/styles/tokens.scss."
          >
            <TokenExport values={v} />
          </Section>
        </div>
      </div>
    </div>
  );
}

export default StyleGuide;
