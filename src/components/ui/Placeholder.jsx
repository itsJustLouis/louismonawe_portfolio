import React from "react";

// Dashed block that marks content still to come. The hint says exactly what belongs here.
export function Placeholder({ hint, ratio, inline = false, label = "Placeholder" }) {
  return (
    <div
      className={`placeholder ${inline ? "placeholder--inline" : ""}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <strong>{label}</strong>
      <span>{hint}</span>
    </div>
  );
}

// Inline text version for one-liners, e.g. a missing project summary.
export function PlaceholderText({ children }) {
  return <span className="placeholder-text">{children}</span>;
}

export default Placeholder;
