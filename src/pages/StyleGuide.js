import React from "react";
import Layout from "../components/layout/Layout";
import StyleGuideContent from "../components/StyleGuide";
import "../styles/work.scss";

function StyleGuide() {
  return (
    <Layout title="Style guide">
      <div className="page container">
        <StyleGuideContent />
      </div>
    </Layout>
  );
}

export default StyleGuide;
