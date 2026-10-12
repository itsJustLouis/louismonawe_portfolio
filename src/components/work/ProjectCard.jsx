import React from "react";
import { Link } from "react-router-dom";
import ProjectCover from "./ProjectCover";
import StatusChip from "../ui/StatusChip";
import { PlaceholderText } from "../ui/Placeholder";

function ProjectCard({ project, size = "md" }) {
  return (
    <article className={`project-card project-card--${size}`}>
      <Link to={`/work/${project.slug}`} className="project-card__link">
        <ProjectCover project={project} size={size} />
        <div className="project-card__body">
          <div className="project-card__top">
            <h3 className="t-h3">{project.title}</h3>
            <StatusChip status={project.status} />
          </div>
          <p className="project-card__summary">
            {project.summary || <PlaceholderText>{project.summaryHint}</PlaceholderText>}
          </p>
          <p className="t-small">{project.role}</p>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
