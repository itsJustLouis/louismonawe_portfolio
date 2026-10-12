import React, { useRef } from "react";
import { videoSrc } from "../../data/projects";

// One project in the archive: a video thumbnail on one side, the details on the other.
// Hovering the thumbnail plays a silent preview; clicking opens the full video.
function ProjectEntry({ project, onPlay }) {
  const previewRef = useRef(null);
  const src = videoSrc(project.video);

  const startPreview = () => {
    const v = previewRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  };
  const stopPreview = () => {
    const v = previewRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0.5;
  };

  return (
    <article className="entry">
      {src ? (
        <button
          type="button"
          className="entry__thumb"
          onClick={() => onPlay(project)}
          onMouseEnter={startPreview}
          onMouseLeave={stopPreview}
          onFocus={startPreview}
          onBlur={stopPreview}
          aria-label={`Play video: ${project.title}`}
        >
          <video ref={previewRef} src={`${src}#t=0.5`} preload="metadata" muted loop playsInline tabIndex={-1} />
          <span className="entry__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        </button>
      ) : (
        <div className="entry__thumb entry__thumb--empty">
          <span className="entry__initial" aria-hidden="true">
            {project.title.charAt(0)}
          </span>
          <span className="entry__soon">Video coming soon</span>
        </div>
      )}

      <div className="entry__body">
        <div className="entry__head">
          <h3 className="entry__title">{project.title}</h3>
          {(project.year || project.role) && (
            <p className="entry__meta">
              {project.year && <span className="entry__year">{project.year}</span>}
              {project.role && <span>{project.role}</span>}
            </p>
          )}
        </div>

        <p className="entry__desc">{project.description}</p>

        {project.tags?.length > 0 && (
          <ul className="tags">
            {project.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}

        {(src || project.link) && (
          <div className="entry__actions">
            {src && (
              <button type="button" className="btn btn--secondary btn--sm" onClick={() => onPlay(project)}>
                Watch video
              </button>
            )}
            {project.link && (
              <a className="btn btn--ghost btn--sm" href={project.link} target="_blank" rel="noreferrer">
                Visit site
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectEntry;
