import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import StyleGuide from "./pages/StyleGuide";
import Lab from "./pages/InternetArt";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter basename="/louismonawe_portfolio">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/contact" element={<Contact />} />

        {/* Old addresses, kept so existing links still land somewhere useful. */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/design" element={<Navigate to="/work" replace />} />
        <Route path="/profile" element={<Navigate to="/about" replace />} />
        <Route path="/webart" element={<Navigate to="/lab" replace />} />
        <Route path="/theory" element={<Navigate to="/" replace />} />
        <Route path="/work/:slug" element={<Navigate to="/work" replace />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
