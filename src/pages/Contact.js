import React from "react";
import Layout from "../components/layout/Layout";
import ContactContent from "../components/ContactContent";

function Contact() {
  return (
    <Layout title="Contact" hideFooterCta>
      <div className="page container">
        <ContactContent />
      </div>
    </Layout>
  );
}

export default Contact;
