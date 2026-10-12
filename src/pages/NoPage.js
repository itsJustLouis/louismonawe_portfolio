import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

function NoPage() {
  return (
    <Layout title="Page not found">
      <div className="page container">
        <header className="page-head">
          <p className="t-display" aria-hidden="true">
            404
          </p>
          <h1 className="t-h2">This page doesn't exist.</h1>
          <p className="t-lead">
            The link may be old or mistyped. Head back to the homepage or browse my work.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/" className="btn btn--primary">
              Go to homepage
            </Link>
            <Link to="/work" className="btn btn--secondary">
              See my work
            </Link>
          </div>
        </header>
      </div>
    </Layout>
  );
}

export default NoPage;
