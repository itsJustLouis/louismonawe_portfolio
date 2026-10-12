import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { videoSrc } from "../../data/projects";

// Full-screen player. Closes on Escape, backdrop click or the close button.
function VideoModal({ item, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

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
        <video src={videoSrc(item.video)} controls autoPlay playsInline />
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
