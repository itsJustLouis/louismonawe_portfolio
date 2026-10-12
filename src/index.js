// Global styles load first so page styles can build on them.
// Fonts are self-hosted from npm, so the site works without Google Fonts.
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./index.css";
import "./styles/base.scss";
import "./styles/nav.scss";
import "./styles/footer.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
