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
        body: JSON.stringify({ ...form, hp: "" }),
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

  const buttonStyle = {
    padding: "14px 24px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "700",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #111827",
    cursor: "pointer",
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    marginTop: "6px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontWeight: "700",
    fontSize: "14px",
    color: "#111827",
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", color: "#111827", background: "#ffffff" }}>
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: "#6b7280" }}>
          Magic Glove Window Cleaning
        </p>

        <h1 style={{ fontSize: "48px", lineHeight: "1.05", marginTop: "16px", marginBottom: "24px" }}>
          Window Cleaning in {city}
        </h1>

        <p style={{ fontSize: "20px", lineHeight: "1.6", maxWidth: "760px", color: "#374151" }}>
          Detailed residential window cleaning for homes in {areaDescription}. We clean glass,
          screens, tracks, sills, and can also help with hard water spots and solar panel add-ons.
        </p>

        <p style={{ fontSize: "26px", fontWeight: "700", marginTop: "24px" }}>
          Get $75 off your first full-service window cleaning.
        </p>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "32px" }}>
          <a href={phoneHref} style={{ ...buttonStyle, background: "#111827", color: "#ffffff" }}>
            Call Now
          </a>

          <a href="#quote" style={{ ...buttonStyle, background: "#ffffff", color: "#111827" }}>
            Get Free Quote
          </a>

          <a href="/" style={{ ...buttonStyle, background: "#ffffff", color: "#111827", borderColor: "#d1d5db" }}>
            Check out our website
          </a>
        </div>
      </section>

      <section style={{ background: "#f3f4f6", padding: "28px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", textAlign: "center", fontWeight: "700" }}>
          <div>Free Quotes</div>
          <div>Screens, Tracks & Sills</div>
          <div>Interior & Exterior</div>
          <div>Hard Water Add-Ons</div>
          <div>Solar Panel Add-Ons</div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "34px", marginBottom: "16px" }}>See the difference a detailed window cleaning makes</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "800px", color: "#374151" }}>
          {localAngle} Dust, hard water spots, bug buildup, dirty tracks, and cloudy glass can make a home feel darker. Magic Glove helps bring back a cleaner, brighter look with detailed glass, screen, track, and sill cleaning.
        </p>

        <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: "32px" }}>
          <div style={{ background: "#f3f4f6", borderRadius: "18px", padding: "40px", textAlign: "center" }}>Before/after photo here</div>
          <div style={{ background: "#f3f4f6", borderRadius: "18px", padding: "40px", textAlign: "center" }}>Track cleaning photo here</div>
          <div style={{ background: "#f3f4f6", borderRadius: "18px", padding: "40px", textAlign: "center" }}>Finished result photo here</div>
        </div>
      </section>

      <section style={{ background: "#f9fafb", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "34px", marginBottom: "24px" }}>What’s included in a full-service window cleaning?</h2>
          <ul style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
            <li>Exterior glass cleaning</li>
            <li>Interior glass cleaning</li>
            <li>Screen cleaning or wipe-down</li>
            <li>Track and sill cleaning</li>
            <li>Detail work around edges and corners</li>
            <li>Hard water spot inspection</li>
            <li>Final walkthrough/check</li>
          </ul>
          <p style={{ fontSize: "18px", fontWeight: "700", marginTop: "24px" }}>Need something simpler? Ask about exterior-only cleaning options.</p>
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "34px", marginBottom: "24px" }}>Popular add-ons</h2>
        <ul style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
          <li>Solar panel cleaning</li>
          <li>Hard water stain removal</li>
          <li>Paint or overspray removal</li>
          <li>Bug buildup removal</li>
          <li>Deep track cleaning</li>
          <li>Storefront maintenance</li>
        </ul>
        <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "800px", color: "#374151", marginTop: "20px" }}>
          Many customers bundle window cleaning with solar panel cleaning, hard water removal, or track detailing for a better overall result.
        </p>
      </section>

      <section style={{ background: "#f9fafb", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "34px", marginBottom: "32px" }}>How to get a quote</h2>
          <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div><h3>1. Fill out the quote form</h3><p>Tell us your service, city, preferred contact method, and any important details.</p></div>
            <div><h3>2. Send a few photos</h3><p>Photos of the front, back, tracks, screens, or problem windows help us quote accurately.</p></div>
            <div><h3>3. Get a clear quote</h3><p>We’ll price it based on size, condition, stories, screens, tracks, and add-ons.</p></div>
            <div><h3>4. Book your clean</h3><p>Pick a day and time that works, then enjoy cleaner, brighter windows.</p></div>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "34px", marginBottom: "16px" }}>Window cleaning service areas near {city}</h2>
        <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "850px", color: "#374151" }}>
          Magic Glove Window Cleaning serves {city} and nearby areas including {nearbyAreas}.
        </p>
      </section>

      <section id="quote" style={{ background: "#111827", color: "#ffffff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "850px", margin: "0 auto 32px" }}>
            <h2 style={{ fontSize: "40px", marginBottom: "16px" }}>Get your free window cleaning quote</h2>
            <p style={{ fontSize: "20px", color: "#e5e7eb" }}>Fill this out and we’ll reach out shortly. For fastest pricing, mention photos in the comments.</p>
          </div>

          <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "start" }}>
            <form onSubmit={submit} style={{ background: "#ffffff", color: "#111827", borderRadius: "24px", padding: "24px", boxShadow: "0 20px 60px rgba(0,0,0,.25)" }}>
              <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
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

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
                <button type="submit" disabled={status === "sending"} style={{ ...buttonStyle, background: "#111827", color: "#ffffff", borderColor: "#111827" }}>{status === "sending" ? "Sending..." : "Send Estimate Request"}</button>
                <a href={emailHref} style={{ ...buttonStyle, background: "#ffffff", color: "#111827", borderColor: "#d1d5db" }}>Email Instead</a>
              </div>

              {message ? <p style={{ marginTop: "16px", fontWeight: "700", color: status === "error" ? "#b91c1c" : "#166534" }}>{message}</p> : null}
            </form>

            <div style={{ display: "grid", gap: "16px" }}>
              <div style={{ background: "#ffffff", color: "#111827", borderRadius: "24px", padding: "24px" }}>
                <h3 style={{ marginTop: 0 }}>Contact Magic Glove</h3>
                <p style={{ color: "#374151", lineHeight: "1.6" }}>Phone: <a href={phoneHref}>{phoneDisplay}</a><br />Email: <a href={emailHref}>{email}</a></p>
                <div style={{ display: "grid", gap: "12px" }}>
                  <a style={{ ...buttonStyle, background: "#111827", color: "#ffffff", borderColor: "#111827" }} href={phoneHref}>Call</a>
                  <a style={{ ...buttonStyle, background: "#ffffff", color: "#111827" }} href="sms:+18189424177">Text</a>
                </div>
              </div>

              <div style={{ background: "#ffffff", color: "#111827", borderRadius: "24px", padding: "24px" }}>
                <h3 style={{ marginTop: 0 }}>Want to see more?</h3>
                <p style={{ color: "#374151", lineHeight: "1.6" }}>View our main website to see our services, specialty cleaning, reviews, and community commitment.</p>
                <a style={{ ...buttonStyle, background: "#ffffff", color: "#111827" }} href="/">Check out our website</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
