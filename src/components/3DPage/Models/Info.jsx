import React from "react";
import { Link } from "react-router-dom";

// Message cards that change as the planet turns. Each stage maps to one card.
const InfoBox = ({ text, link, btnText }) => (
  <section className="lab-card">
    <p>{text}</p>
    <Link to={link} className="btn btn--primary btn--sm">
      {btnText}
    </Link>
  </section>
);

const renderContent = {
  1: (
    <section className="lab-card">
      <h1>Hi, I'm Louis.</h1>
      <p>
        This is my 3D playground, an experiment in building interactive worlds for the web with Three.js and React
        Three Fiber.
      </p>
    </section>
  ),
  2: <InfoBox text="Want the full story? See who I am and how I work." link="/about" btnText="About me" />,
  3: <InfoBox text="Ventures, research and software I've worked on." link="/work" btnText="See my work" />,
  4: <InfoBox text="Have a problem worth solving? Let's talk." link="/contact" btnText="Get in touch" />,
  5: (
    <section className="lab-card lab-card--credits">
      <p>
        Models used under CC BY 4.0: "Earth" by absolution (skfb.ly/6UoZv) and "Stylized WW1 plane" by
        AntijnvanderGun, both from Sketchfab.
      </p>
    </section>
  ),
};

const Info = ({ currentStage }) => renderContent[currentStage] || null;

export default Info;
