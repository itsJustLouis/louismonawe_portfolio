import React from "react";
import { Link } from "react-router-dom";
import profile from "../../data/profile";
import Wordmark from "../ui/Wordmark";
import "../../styles/footer.scss";

function Footer({ hideCta = false }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        {!hideCta && (
          <div className="footer__cta">
            <p className="footer__line">Hiring, collaborating, or have a problem worth solving?</p>
            <a className="footer__email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        )}

        <div className="footer__base">
          <Wordmark variant="monogram" />
          <ul className="footer__links">
            <li><Link className="link" to="/work">Work</Link></li>
            <li><Link className="link" to="/about">About</Link></li>
            <li><Link className="link" to="/style-guide">Style guide</Link></li>
            <li><a className="link" href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
          <p className="t-small">© {year} {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
