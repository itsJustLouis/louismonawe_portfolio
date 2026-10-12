import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Layout from "../components/layout/Layout";
import ParticleField from "../components/ui/ParticleField";
import ProjectEntry from "../components/work/ProjectEntry";
import VideoModal from "../components/work/VideoModal";
import projects from "../data/projects";
import profile from "../data/profile";
import hero from "../images/hero.webp";
import "../styles/home.scss";
import "../styles/work.scss";

const ease = [0.16, 1, 0.3, 1];

function Home() {
  const reduce = useReducedMotion();
  const featured = projects.filter((p) => p.featured);
  const [playing, setPlaying] = useState(null);
  const close = useCallback(() => setPlaying(null), []);

  // The page's one orchestrated moment: the name rises into place, then everything else settles.
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: 0 },
          transition: { duration: 0.9, delay, ease },
        };
  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <Layout>
      <section className="hero" aria-labelledby="hero-name">
        <ParticleField />
        <div className="container hero__grid">
          <div className="hero__text">
            <h1 id="hero-name" className="t-display hero__name">
              <span className="hero__line">
                <motion.span {...rise(0.1)}>Louis</motion.span>
              </span>
              <span className="hero__line">
                <motion.span {...rise(0.22)}>Monawe</motion.span>
              </span>
            </h1>

            <motion.div className="hero__copy" {...fade(0.6)}>
              <p className="hero__role">{profile.location}</p>
              <p className="t-lead">{profile.intro}</p>
              <div className="hero__actions">
                <Link to="/work" className="btn btn--primary">
                  See my work
                </Link>
                <Link to="/contact" className="btn btn--secondary">
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div className="hero__photo" {...fade(0.35)}>
            <img src={hero} alt="Louis Monawe smiling in his graduation gown, holding his degree" />
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="selected-work">
        <div className="container">
          <div className="section__head">
            <h2 id="selected-work" className="t-h2">
              Selected work
            </h2>
            <Link to="/work" className="link">
              All work
            </Link>
          </div>
          <div className="entries">
            {featured.map((p) => (
              <ProjectEntry key={p.title} project={p} onPlay={setPlaying} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="what-i-do">
        <div className="container">
          <h2 id="what-i-do" className="t-h2 section__title">
            What I do
          </h2>
          <ul className="services">
            {profile.services.map((s) => (
              <li key={s.title} className="services__item">
                <h3 className="t-h3">{s.title}</h3>
                <p className="t-body">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="about-teaser">
        <div className="container about-teaser">
          <h2 id="about-teaser" className="t-h2">
            Strategy first. Then I build it.
          </h2>
          <div className="about-teaser__body">
            <p className="t-body">{profile.about[0]}</p>
            <p className="t-body">{profile.about[1]}</p>
            <Link to="/about" className="btn btn--secondary">
              More about me
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>{playing && <VideoModal item={playing} onClose={close} />}</AnimatePresence>
    </Layout>
  );
}

export default Home;
