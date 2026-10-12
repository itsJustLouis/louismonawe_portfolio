import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ThreeDMain from "../components/3DPage/ThreeDMain";
import Wordmark from "../components/ui/Wordmark";
import "../styles/lab.scss";

// The Lab: a full-screen 3D experiment. It skips the normal page frame on purpose.
function Lab() {
  useEffect(() => {
    document.title = "Lab | Louis Monawe";
  }, []);

  return (
    <main className="lab">
      <header className="lab__bar">
        <Link to="/" aria-label="Louis Monawe, home">
          <Wordmark />
        </Link>
        <Link to="/work" className="btn btn--secondary btn--sm">
          Back to portfolio
        </Link>
      </header>
      <p className="lab__hint">Drag or use the arrow keys to spin the planet.</p>
      <ThreeDMain />
    </main>
  );
}

export default Lab;
