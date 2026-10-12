import React from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProjectCover from "../components/work/ProjectCover";
import StatusChip from "../components/ui/StatusChip";
import Placeholder, { PlaceholderText } from "../components/ui/Placeholder";
import projects from "../data/projects";
import NoPage from "./NoPage";
import "../styles/work.scss";
import "../styles/case.scss";

function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NoPage />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <Layout title={project.title}>
      <article className="page case">
        <header className="container case__head">
          <Link to="/work" className="case__back link">
            All work
          </Link>
          <h1 className="t-h1">{project.title}</h1>
          <p className="t-lead case__summary">
            {project.summary || <PlaceholderText>{project.summaryHint}</PlaceholderText>}
          </p>

          <dl className="case__meta">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <StatusChip status={project.status} />
              </dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>
                {project.stack.length ? (
                  project.stack.join(", ")
                ) : (
                  <PlaceholderText>Add the tools you used</PlaceholderText>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <div className="container">
          <ProjectCover project={project} size="hero" />
        </div>

        <div className="container case__body">
          {project.sections.map((s, i) => (
            <section key={s.heading} className="case__section">
              <h2 className="t-h3 case__section-title">{s.heading}</h2>
              <div className="case__section-body">
                {s.body ? (
                  <p className="t-body">{s.body}</p>
                ) : (
                  <Placeholder inline hint={s.hint} label="Write this section" />
                )}
                {/* Drop one media slot after the second section, the rest at the end. */}
                {i === 1 && project.media[1] && (
                  <Placeholder hint={project.media[1].hint} ratio="16 / 9" label="Image" />
                )}
              </div>
            </section>
          ))}

          <div className="case__gallery">
            {[project.media[0], ...project.media.slice(2)].filter(Boolean).map((m) => (
              <Placeholder key={m.hint} hint={m.hint} ratio={m.ratio} label="Image" />
            ))}
          </div>
        </div>

        <nav className="container case__next" aria-label="Next project">
          <span className="t-small">Next project</span>
          <Link to={`/work/${next.slug}`} className="case__next-link">
            {next.title}
          </Link>
        </nav>
      </article>
    </Layout>
  );
}

export default CaseStudy;
