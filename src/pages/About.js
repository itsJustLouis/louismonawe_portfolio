import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import profile from "../data/profile";
import hero from "../images/hero.webp";
import "../styles/about.scss";

function About() {
  return (
    <Layout title="About">
      <div className="page container">
        <section className="about">
          <div className="about__photo">
            <img src={hero} alt="Louis Monawe" />
          </div>

          <div className="about__text">
            <h1 className="t-h1">Hi, I'm Louis.</h1>
            <p className="t-lead">
              Based in {profile.location}. {profile.aboutLead}
            </p>
            {profile.about.map((para) => (
              <p key={para.slice(0, 24)} className="t-body">
                {para}
              </p>
            ))}
            <div className="about__actions">
              <Link to="/contact" className="btn btn--primary">
                Get in touch
              </Link>
              <a href={profile.linkedIn} target="_blank" rel="noreferrer" className="btn btn--secondary">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn--ghost">
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section className="about__block" aria-labelledby="experience">
          <h2 id="experience" className="t-h2">
            Experience
          </h2>
          <ol className="timeline">
            {profile.experience.map((e) => (
              <li key={e.title + e.org} className="timeline__item">
                <p className="timeline__period t-small">{e.period}</p>
                <div>
                  <h3 className="t-h3">{e.title}</h3>
                  <p className="timeline__org">{e.org}</p>
                  <p className="t-body">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about__block" aria-labelledby="toolkit">
          <h2 id="toolkit" className="t-h2">
            Toolkit
          </h2>
          <div className="toolkit">
            {profile.toolkit.map((g) => (
              <div key={g.group} className="toolkit__group">
                <h3 className="t-h3">{g.group}</h3>
                <ul className="tags">
                  {g.items.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default About;
