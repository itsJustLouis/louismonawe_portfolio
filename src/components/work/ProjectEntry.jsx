import React, { useRef } from "react";
import { videoSrc } from "../../data/projects";

// One project in the archive: a thumbnail on one side, the details on the other.
// Video projects: hovering plays a silent preview; clicking opens the full video.
// Image projects: the first screenshot is the thumbnail; clicking opens the gallery.
function ProjectEntry({ project, onPlay }) {
  const previewRef = useRef(null);
  const src = videoSrc(project.video);
  const cover = !src && project.images?.length ? project.images[0] : null;
  const shots = project.images?.length || 0;

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

  let thumb;
  if (src) {
    thumb = (
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
    );
  } else if (cover) {
    thumb = (
      <button
        type="button"
        className="entry__thumb entry__thumb--image"
        onClick={() => onPlay(project)}
        aria-label={`View ${shots} screenshot${shots === 1 ? "" : "s"}: ${project.title}`}
      >
        <img src={cover.src} alt="" loading="lazy" decoding="async" />
        {shots > 1 && (
          <span className="entry__count" aria-hidden="true">
            1 / {shots}
          </span>
        )}
      </button>
    );
  } else {
    thumb = (
      <div className="entry__thumb entry__thumb--empty">
        <span className="entry__initial" aria-hidden="true">
          {project.title.charAt(0)}
        </span>
        <span className="entry__soon">Video coming soon</span>
      </div>
    );
  }

  return (
    <article className="entry">
      {thumb}

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

        {(src || cover || project.link) && (
          <div className="entry__actions">
            {src && (
              <button type="button" className="btn btn--secondary btn--sm" onClick={() => onPlay(project)}>
                Watch video
              </button>
            )}
            {cover && (
              <button type="button" className="btn btn--secondary btn--sm" onClick={() => onPlay(project)}>
                View screens
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
