import React from "react";

// The wordmark: name set in Bricolage Grotesque, condensed, with the coral signal dot.
// variant="monogram" gives the compact LM mark for tight spaces.
function Wordmark({ variant = "full", className = "" }) {
  if (variant === "monogram") {
    return (
      <span className={`wordmark wordmark--monogram ${className}`} aria-hidden="true">
        LM<span className="wordmark__dot" />
      </span>
    );
  }
  return (
    <span className={`wordmark ${className}`}>
      Louis Monawe<span className="wordmark__dot" aria-hidden="true" />
    </span>
  );
}

export default Wordmark;
