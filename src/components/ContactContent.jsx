import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import profile from "../data/profile";
import "../styles/contact.scss";

// EmailJS keys from your account. Messages arrive in the inbox linked to this service.
const EMAILJS = {
  service: "service_2lqgb8h",
  template: "template_ykbjlb2",
  publicKey: "thL5vwGX_OWlBKT15",
};

function ContactContent() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const sendMessage = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(EMAILJS.service, EMAILJS.template, formRef.current, { publicKey: EMAILJS.publicKey })
      .then(
        () => {
          setStatus("sent");
          formRef.current.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <div className="contact">
      <header className="contact__intro">
        <h1 className="t-h1">Let's talk.</h1>
        <p className="t-lead">
          Hiring, looking for a collaborator, or have a problem worth solving? Send a message and I'll get back
          to you.
        </p>

        <dl className="contact__details">
          <div>
            <dt>Email</dt>
            <dd>
              <a className="link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a className="link" href={`tel:${profile.phoneHref}`}>
                {profile.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd className="contact__social">
              <a className="link" href={profile.linkedIn} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="link" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <form ref={formRef} className="contact__form" onSubmit={sendMessage}>
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <span className="field-hint">So I can reply to you.</span>
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={7} required />
        </div>

        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <p className="contact__status" role="status" aria-live="polite">
          {status === "sent" && <span className="is-success">Message sent. I'll reply to the email you gave.</span>}
          {status === "error" && (
            <span className="is-error">
              The message didn't send. Check your connection and try again, or email me at {profile.email}.
            </span>
          )}
        </p>
      </form>
    </div>
  );
}

export default ContactContent;
