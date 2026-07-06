"use client";

import { useState } from "react";

export default function CityWindowCleaningPage({
  city,
  areaDescription,
  nearbyAreas,
  localAngle,
}) {
  const phoneHref = "tel:+18189424177";
  const phoneDisplay = "(818) 942-4177";
  const email = "info@magicglovecleaning.com";
  const emailHref = `mailto:${email}`;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city,
    service: "Residential Window Cleaning",
    propertyType: "Residential",
    bestTime: "Morning (9–12)",
    preferredContact: "Text",
    referralSource: "Landing Page",
    comments: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          leadSource: "Website Landing Page",
          pageTitle: `Window Cleaning in ${city}`,
          hp: "",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send request.");

      setStatus("sent");
      setMessage("Request sent — we’ll call or text you shortly.");
      setForm((previous) => ({
        ...previous,
        fullName: "",
        phone: "",
        email: "",
        comments: "",
      }));
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please call or text us instead.");
    }
  }

  const colors = {
    ink: "#0f172a",
    inkSoft: "#334155",
    muted: "#64748b",
    faint: "#94a3b8",
    line: "#e2e8f0",
    lineDark: "#cbd5e1",
    page: "#f8fafc",
    white: "#ffffff",
    soft: "#f1f5f9",
  };

  const wrapStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 18px",
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: "800",
    fontSize: "14px",
    border: `1px solid ${colors.ink}`,
    cursor: "pointer",
    lineHeight: 1.1,
  };

  const pillStyle = {
    border: `1px solid ${colors.line}`,
    background: colors.white,
    color: colors.inkSoft,
    padding: "7px 11px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    boxShadow: "0 1px 0 rgba(15,23,42,.04)",
  };

  const cardStyle = {
    border: `1px solid ${colors.line}`,
    background: colors.white,
    borderRadius: "18px",
    boxShadow: "0 1px 0 rgba(15,23,42,.04)",
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 12px",
    borderRadius: "14px",
    border: `1px solid ${colors.lineDark}`,
    fontSize: "14px",
    marginTop: "6px",
    boxSizing: "border-box",
    outline: "none",
    background: colors.white,
  };

  const labelStyle = {
    fontWeight: "800",
    fontSize: "13px",
    color: colors.inkSoft,
  };

  const valueCards = [
    {
      title: "Quality over rushing",
      text: "We are not trying to fly through the job and disappear. We slow down on edges, corners, tracks, screens, and the spots people actually notice.",
    },
    {
      title: "Fair, honest pricing",
      text: "We are not greedy with quotes. We explain what is included, what is optional, and what actually matters for your windows.",
    },
    {
      title: "Detail-focused service",
      text: "Glass is only part of the job. Dirty tracks, sills, screens, hard water, bug buildup, and leftover paint can all affect the final look.",
    },
  ];

  const processCards = [
    { title: "1. Tell us what you need", text: "Send your city, service, property type, and a few details about the windows." },
    { title: "2. Share photos if possible", text: "Photos help us quote more accurately, especially for hard water, tracks, screens, or tall windows." },
    { title: "3. Get a clear quote", text: "We give a straightforward price and explain what is included before anything is booked." },
    { title: "4. We clean with care", text: "We focus on the final result, not rushing through just to get to the next job." },
  ];

  const addOns = [
    "Interior & exterior glass",
    "Screens, tracks & sills",
    "Hard water spot inspection",
    "Paint or overspray removal",
    "Bug buildup removal",
    "Solar panel add-ons",
    "Storefront maintenance",
    "Exterior-only options",
  ];

  return (
    <main style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", color: colors.ink, background: colors.page }}>
      <div style={{ background: colors.white, borderBottom: `1px solid ${colors.line}` }}>
        <div style={{ ...wrapStyle, display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", paddingBottom: "10px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span style={pillStyle}>Free quotes</span>
            <span style={pillStyle}>Quality-focused</span>
            <span style={pillStyle}>$75 off first full-service clean</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", color: colors.inkSoft, fontSize: "13px", fontWeight: "700" }}>
            <a href={phoneHref}>{phoneDisplay}</a>
            <span style={{ color: colors.lineDark }}>•</span>
            <a href="/">Main website</a>
          </div>
        </div>
      </div>

      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${colors.line}` }}>
        <div style={{ ...wrapStyle, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px", paddingTop: "12px", paddingBottom: "12px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <span style={{ width: "42px", height: "42px", border: `1px solid ${colors.line}`, borderRadius: "14px", background: colors.soft, overflow: "hidden", display: "grid", placeItems: "center" }}>
              <img src="/magic-glove-logo.jpg" alt="Magic Glove Window Cleaning" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            </span>
            <span>
              <span style={{ display: "block", fontWeight: "900", letterSpacing: "-0.01em" }}>Magic Glove</span>
              <span style={{ display: "block", fontSize: "12px", color: colors.muted }}>Window Cleaning</span>
            </span>
          </a>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href={phoneHref} style={{ ...buttonStyle, background: colors.white, color: colors.ink, borderColor: colors.lineDark }}>Call</a>
            <a href="#quote" style={{ ...buttonStyle, background: colors.ink, color: colors.white }}>Get Quote</a>
          </div>
        </div>
      </div>

      <section style={{ ...wrapStyle, paddingTop: "44px", paddingBottom: "26px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
              <span style={pillStyle}>Window Cleaning in {city}</span>
              <span style={pillStyle}>Residential • Commercial • Solar add-ons</span>
            </div>

            <h1 style={{ margin: 0, fontSize: "clamp(38px, 6vw, 58px)", lineHeight: "1.02", letterSpacing: "-0.04em" }}>
              Detailed window cleaning in {city}, done with care.
            </h1>

            <p style={{ marginTop: "16px", fontSize: "17px", lineHeight: 1.7, color: colors.inkSoft, maxWidth: "660px" }}>
              Magic Glove helps homeowners in {areaDescription} get cleaner, brighter windows without the rushed, careless service. We focus on quality, clear communication, and fair pricing.
            </p>

            <p style={{ marginTop: "16px", fontSize: "18px", lineHeight: 1.6, color: colors.ink, fontWeight: "800", maxWidth: "660px" }}>
              Get $75 off your first full-service window cleaning.
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
              <a href="#quote" style={{ ...buttonStyle, background: colors.ink, color: colors.white }}>Get Free Quote</a>
              <a href={phoneHref} style={{ ...buttonStyle, background: colors.white, color: colors.ink, borderColor: colors.lineDark }}>Call Now</a>
              <a href="/" style={{ ...buttonStyle, background: colors.white, color: colors.ink, borderColor: colors.lineDark }}>Check out our website</a>
            </div>
          </div>

          <div style={{ ...cardStyle, padding: "18px" }}>
            <div style={{ minHeight: "320px", borderRadius: "18px", background: `linear-gradient(135deg, ${colors.line}, ${colors.soft}, ${colors.white})`, border: `1px solid ${colors.line}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: "14px", right: "14px", bottom: "14px", background: "rgba(255,255,255,.88)", border: `1px solid ${colors.line}`, borderRadius: "16px", padding: "14px" }}>
                <div style={{ fontWeight: "900" }}>Photos coming next</div>
                <div style={{ marginTop: "6px", color: colors.muted, fontSize: "13px", lineHeight: 1.5 }}>
                  We’ll add real before/after photos here after the layout and message feel right.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...wrapStyle, paddingTop: "16px", paddingBottom: "54px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
          {addOns.slice(0, 4).map((item) => (
            <div key={item} style={{ ...cardStyle, padding: "16px", fontWeight: "800", color: colors.inkSoft }}>{item}</div>
          ))}
        </div>
      </section>

      <section style={{ background: colors.white, borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}`, padding: "54px 0" }}>
        <div style={wrapStyle}>
          <div style={{ maxWidth: "780px" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 4vw, 42px)", letterSpacing: "-0.03em" }}>How we’re different</h2>
            <p style={{ marginTop: "10px", color: colors.muted, fontSize: "15px", lineHeight: 1.7 }}>
              We want Magic Glove to feel different from companies that rush, overcharge, or treat every home like a quick transaction. We care about the final result and the relationship after the job.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px", marginTop: "18px" }}>
            {valueCards.map((card) => (
              <div key={card.title} style={{ ...cardStyle, padding: "20px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "14px", display: "grid", placeItems: "center", background: colors.ink, color: colors.white, fontWeight: "900", marginBottom: "14px" }}>✓</div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>{card.title}</h3>
                <p style={{ marginTop: "8px", color: colors.muted, fontSize: "14px", lineHeight: 1.65 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...wrapStyle, paddingTop: "54px", paddingBottom: "54px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", alignItems: "start" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 4vw, 40px)", letterSpacing: "-0.03em" }}>What’s included in a full-service clean?</h2>
            <p style={{ marginTop: "10px", color: colors.muted, fontSize: "15px", lineHeight: 1.7 }}>
              {localAngle} Dust, hard water spots, bug buildup, dirty tracks, and cloudy glass can make a home feel darker. We help bring back a cleaner, brighter look with detail-focused window cleaning.
            </p>
          </div>

          <div style={{ ...cardStyle, padding: "18px" }}>
            <div style={{ display: "grid", gap: "8px" }}>
              {addOns.map((item) => (
                <div key={item} style={{ display: "flex", gap: "10px", alignItems: "center", color: colors.inkSoft, fontSize: "14px", fontWeight: "700" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "9px", display: "grid", placeItems: "center", background: colors.soft, border: `1px solid ${colors.line}`, color: colors.ink, fontSize: "12px", fontWeight: "900" }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "14px", color: colors.muted, fontSize: "13px", lineHeight: 1.6 }}>
              Need something simpler? Ask about exterior-only cleaning options or bundle window cleaning with solar panel cleaning.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: colors.white, borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}`, padding: "54px 0" }}>
        <div style={wrapStyle}>
          <h2 style={{ margin: 0, fontSize: "clamp(30px, 4vw, 40px)", letterSpacing: "-0.03em" }}>A simple quote process</h2>
          <p style={{ marginTop: "10px", color: colors.muted, fontSize: "15px", lineHeight: 1.7, maxWidth: "720px" }}>
            We keep the process easy and clear. No pressure, no confusing upsells, and no surprise expectations after you book.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginTop: "18px" }}>
            {processCards.map((card) => (
              <div key={card.title} style={{ ...cardStyle, padding: "18px" }}>
                <h3 style={{ margin: 0, fontSize: "18px" }}>{card.title}</h3>
                <p style={{ marginTop: "8px", color: colors.muted, fontSize: "14px", lineHeight: 1.65 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...wrapStyle, paddingTop: "54px", paddingBottom: "54px" }}>
        <div style={{ ...cardStyle, padding: "22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "-0.03em" }}>Serving {city} and nearby areas</h2>
            <p style={{ marginTop: "10px", color: colors.muted, fontSize: "15px", lineHeight: 1.7 }}>
              Magic Glove Window Cleaning serves {city} and nearby areas including {nearbyAreas}.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "flex-start" }}>
            <a href="#quote" style={{ ...buttonStyle, background: colors.ink, color: colors.white }}>Get Free Quote</a>
            <a href={phoneHref} style={{ ...buttonStyle, background: colors.white, color: colors.ink, borderColor: colors.lineDark }}>Call {phoneDisplay}</a>
          </div>
        </div>
      </section>

      <section id="quote" style={{ background: colors.ink, color: colors.white, padding: "64px 0" }}>
        <div style={wrapStyle}>
          <div style={{ textAlign: "center", maxWidth: "850px", margin: "0 auto 24px" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 46px)", letterSpacing: "-0.04em" }}>Get your free window cleaning quote</h2>
            <p style={{ marginTop: "10px", fontSize: "16px", color: "#cbd5e1", lineHeight: 1.7 }}>
              Fill this out and we’ll reach out shortly. For fastest pricing, mention photos in the comments.
            </p>
          </div>

          <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "start" }}>
            <form onSubmit={submit} style={{ background: colors.white, color: colors.ink, borderRadius: "24px", padding: "22px", boxShadow: "0 20px 60px rgba(0,0,0,.22)" }}>
              <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <div><label style={labelStyle}>Full Name</label><input style={inputStyle} name="fullName" value={form.fullName} onChange={onChange} required placeholder="Your name" /></div>
                <div><label style={labelStyle}>Phone</label><input style={inputStyle} name="phone" value={form.phone} onChange={onChange} required placeholder="(818) 555-1234" /></div>
                <div><label style={labelStyle}>Email (optional)</label><input style={inputStyle} name="email" value={form.email} onChange={onChange} placeholder="name@email.com" /></div>
                <div><label style={labelStyle}>City</label><input style={inputStyle} name="city" value={form.city} onChange={onChange} required placeholder={city} /></div>
                <div><label style={labelStyle}>Service</label><select style={inputStyle} name="service" value={form.service} onChange={onChange}><option>Residential Window Cleaning</option><option>Commercial & Storefront Cleaning</option><option>Solar Panel Cleaning</option><option>Tint Removal</option><option>Other / Not sure</option></select></div>
                <div><label style={labelStyle}>How did you hear about us?</label><select style={inputStyle} name="referralSource" value={form.referralSource} onChange={onChange}><option>Landing Page</option><option>Business Card/Door Hanger</option><option>Referred</option><option>Google</option><option>Instagram/Facebook</option><option>Other</option></select></div>
                <div><label style={labelStyle}>Property Type</label><select style={inputStyle} name="propertyType" value={form.propertyType} onChange={onChange}><option>Residential</option><option>Commercial</option></select></div>
                <div><label style={labelStyle}>Best Time</label><select style={inputStyle} name="bestTime" value={form.bestTime} onChange={onChange}><option>Morning (9–12)</option><option>Afternoon (12–4)</option><option>Evening (4–7)</option><option>Anytime</option></select></div>
                <div><label style={labelStyle}>Preferred Contact</label><select style={inputStyle} name="preferredContact" value={form.preferredContact} onChange={onChange}><option>Text</option><option>Call</option><option>Email</option></select></div>
                <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Comments</label><textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} name="comments" value={form.comments} onChange={onChange} placeholder="Example: 2-story home, heavy water spots, prefer Saturday..." /></div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                <button type="submit" disabled={status === "sending"} style={{ ...buttonStyle, background: colors.ink, color: colors.white, borderColor: colors.ink }}>{status === "sending" ? "Sending..." : "Send Estimate Request"}</button>
                <a href={emailHref} style={{ ...buttonStyle, background: colors.white, color: colors.ink, borderColor: colors.lineDark }}>Email Instead</a>
              </div>

              {message ? <p style={{ marginTop: "14px", fontWeight: "800", color: status === "error" ? "#b91c1c" : "#166534" }}>{message}</p> : null}
            </form>

            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{ background: colors.white, color: colors.ink, borderRadius: "24px", padding: "22px" }}>
                <h3 style={{ marginTop: 0 }}>Contact Magic Glove</h3>
                <p style={{ color: colors.inkSoft, lineHeight: 1.7 }}>Phone: <a href={phoneHref}>{phoneDisplay}</a><br />Email: <a href={emailHref}>{email}</a></p>
                <div style={{ display: "grid", gap: "10px" }}>
                  <a style={{ ...buttonStyle, background: colors.ink, color: colors.white, borderColor: colors.ink }} href={phoneHref}>Call</a>
                  <a style={{ ...buttonStyle, background: colors.white, color: colors.ink, borderColor: colors.lineDark }} href="sms:+18189424177">Text</a>
                </div>
              </div>

              <div style={{ background: colors.white, color: colors.ink, borderRadius: "24px", padding: "22px" }}>
                <h3 style={{ marginTop: 0 }}>Our promise</h3>
                <p style={{ color: colors.inkSoft, lineHeight: 1.7 }}>
                  We are here to build a real local business, not squeeze customers. We want the work to look good, the pricing to make sense, and the experience to feel easy.
                </p>
                <a style={{ ...buttonStyle, background: colors.white, color: colors.ink, borderColor: colors.lineDark }} href="/">Check out our website</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
