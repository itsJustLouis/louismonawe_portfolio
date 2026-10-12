import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

// Every page except the Lab shares this frame: skip link, top bar, footer.
function Layout({ children, title, hideFooterCta = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.title = title ? `${title} | Louis Monawe` : "Louis Monawe | Portfolio";
  }, [title]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer hideCta={hideFooterCta} />
    </>
  );
}

export default Layout;
