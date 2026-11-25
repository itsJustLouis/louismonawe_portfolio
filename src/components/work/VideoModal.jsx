import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { videoSrc } from "../../data/projects";

// Full-screen viewer. Plays the project's video, or shows its screenshots as a gallery
// (arrow keys or the Previous/Next buttons). Closes on Escape, backdrop click or Close.
function VideoModal({ item, onClose }) {
  const closeRef = useRef(null);
  const video = videoSrc(item.video);
  const images = !video && item.images?.length ? item.images : [];
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = useCallback((step) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (count > 1 && e.key === "ArrowRight") go(1);
      if (count > 1 && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose, go, count]);

  return (
    <motion.div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      onClick={onClose}
    >
      <motion.figure
        className="video-modal__frame"
        initial={{ scale: 0.96, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {video ? (
          <video src={video} controls autoPlay playsInline />
        ) : (
          <div className="gallery">
            <img key={images[index].src} src={images[index].src} alt={images[index].alt || item.title} />
            {count > 1 && (
              <div className="gallery__nav">
                <button type="button" className="btn btn--secondary btn--sm" onClick={() => go(-1)}>
                  Previous
                </button>
                <span className="gallery__count" aria-live="polite">
                  {index + 1} of {count}
                </span>
                <button type="button" className="btn btn--secondary btn--sm" onClick={() => go(1)}>
                  Next
                </button>
              </div>
            )}
          </div>
        )}
        <figcaption>
          <div>
            <h2 className="t-h3">{item.title}</h2>
            <p className="t-small">{item.description}</p>
          </div>
          <div className="video-modal__actions">
            {item.link && (
              <a className="btn btn--ghost btn--sm" href={item.link} target="_blank" rel="noreferrer">
                Visit site
              </a>
            )}
            <button ref={closeRef} type="button" className="btn btn--secondary btn--sm" onClick={onClose}>
              Close
            </button>
          </div>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

export default VideoModal;
