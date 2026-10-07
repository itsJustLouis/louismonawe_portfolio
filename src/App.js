import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Design from "./pages/Design";
import WebArt from "./pages/InternetArt";
import Theory from "./pages/Theory";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";


function App() {
  return (
    <React.Fragment >
      <BrowserRouter basename="/louismonawe_portfolio">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/design" element={<Design />} />
          <Route path="/webart" element={<WebArt />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> {/* this is for when you search for a tab that does not exist */}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
