import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ToggleButton from "../sub/sidebarLinks/ToggleButton";
import Wordmark from "../ui/Wordmark";
import "../../styles/nav.scss";

export const NAV_LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/style-guide", label: "Style guide" },
  { to: "/lab", label: "Lab" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label="Louis Monawe, home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="nav__links">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className="nav__link">
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn--primary btn--sm nav__cta">
            Get in touch
          </Link>
        </nav>

        <motion.div className="nav__toggle" animate={open ? "open" : "closed"} initial={false}>
          <ToggleButton setOpen={setOpen} open={open} />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            className="nav__sheet"
            initial={{ clipPath: "circle(0px at calc(100% - 44px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 36px)" }}
            exit={{ clipPath: "circle(0px at calc(100% - 44px) 36px)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <ul className="container">
              {[{ to: "/", label: "Home" }, ...NAV_LINKS, { to: "/contact", label: "Contact" }].map(
                (link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink to={link.to} end={link.to === "/"} className="nav__sheet-link">
                      {link.label}
                    </NavLink>
                  </motion.li>
                )
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
