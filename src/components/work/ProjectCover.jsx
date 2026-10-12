import React from "react";

// Generated cover used until a real screenshot is added (set `cover` in data/projects.js).
// Each project gets its accent colour, a pattern and an oversized initial on a tinted ink ground.

function Pattern({ id, type, color }) {
  const common = { stroke: color, fill: "none", strokeWidth: 1, opacity: 0.35 };
  switch (type) {
    case "dots":
      return (
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill={color} opacity="0.4" />
        </pattern>
      );
    case "rings":
      return (
        <pattern id={id} width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="22" {...common} />
          <circle cx="30" cy="30" r="10" {...common} />
        </pattern>
      );
    case "waves":
      return (
        <pattern id={id} width="80" height="24" patternUnits="userSpaceOnUse">
          <path d="M0 12 Q 20 0 40 12 T 80 12" {...common} />
        </pattern>
      );
    case "lines":
      return (
        <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14 L14 0" {...common} />
        </pattern>
      );
    case "grid":
    default:
      return (
        <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0 L0 0 0 28" {...common} />
        </pattern>
      );
  }
}

function ProjectCover({ project, size = "md" }) {
  const { slug, title, accent, pattern = "grid", cover } = project;

  if (cover) {
    return (
      <div className={`cover cover--${size}`}>
        <img src={cover} alt="" loading="lazy" />
      </div>
    );
  }

  const patternId = `cover-${slug}-${size}`;
  return (
    <div className={`cover cover--${size} cover--generated`} style={{ "--cover-accent": accent }}>
      <svg className="cover__pattern" aria-hidden="true">
        <defs>
          <Pattern id={patternId} type={pattern} color={accent} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className="cover__initial" aria-hidden="true">
        {title.charAt(0)}
      </span>
      <span className="cover__title" aria-hidden="true">
        {title}
      </span>
    </div>
  );
}

export default ProjectCover;
