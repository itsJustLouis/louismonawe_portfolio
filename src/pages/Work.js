import React, { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layout/Layout";
import ProjectEntry from "../components/work/ProjectEntry";
import VideoModal from "../components/work/VideoModal";
import projects from "../data/projects";
import "../styles/work.scss";

function Work() {
  const [playing, setPlaying] = useState(null);
  const close = useCallback(() => setPlaying(null), []);

  return (
    <Layout title="Work">
      <div className="page container">
        <header className="page-head">
          <h1 className="t-h1">Work</h1>
          <p className="t-lead">
            Ventures, research, software and games I've worked on. Hover over a video for a preview, or select it to
            watch.
          </p>
        </header>

        <div className="entries">
          {projects.map((p) => (
            <ProjectEntry key={p.title} project={p} onPlay={setPlaying} />
          ))}
        </div>
      </div>

      <AnimatePresence>{playing && <VideoModal item={playing} onClose={close} />}</AnimatePresence>
    </Layout>
  );
}

export default Work;
