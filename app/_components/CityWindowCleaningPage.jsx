"use client";

import { useState } from "react";

function BeforeAfterSlider({ title, beforeImage, afterImage, colors }) {
  const [position, setPosition] = useState(52);

  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 1000, color: colors.navy, textTransform: "uppercase", letterSpacing: ".08em" }}>{title}</div>
        <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Drag slider</div>
      </div>
      <div style={{ position: "relative", height: 230, borderRadius: 22, overflow: "hidden", border: `1px solid ${colors.line}`, background: colors.soft }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${afterImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - position}% 0 0)`, backgroundImage: `url(${beforeImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 4, background: "rgba(7,23,40,.82)", color: colors.white, borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 1000 }}>Before</div>
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 4, background: "rgba(255,255,255,.92)", color: colors.navy, borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 1000 }}>After</div>
        <div style={{ position: "absolute", left: `${position}%`, top: 0, bottom: 0, width: 3, background: colors.white, transform: "translateX(-50%)", zIndex: 5, boxShadow: "0 0 18px rgba(0,0,0,.3)" }} />
        <div style={{ position: "absolute", left: `${position}%`, top: "50%", transform: "translate(-50%, -50%)", zIndex: 6, width: 44, height: 44, borderRadius: "50%", background: colors.white, color: colors.navy, display: "grid", placeItems: "center", fontWeight: 1000, boxShadow: "0 10px 30px rgba(0,0,0,.22)", border: `3px solid ${colors.mint}` }}>↔</div>
        <input type="range" min="0" max="100" value={position} onChange={(e) => setPosition(Number(e.target.value))} aria-label={`Before and after slider for ${title}`} style={{ position: "absolute", inset: 0, zIndex: 10, opacity: 0, cursor: "ew-resize", width: "100%", height: "100%" }} />
      </div>
    </div>
  );
}

export default function CityWindowCleaningPage({ city, areaDescription, nearbyAreas, localAngle }) {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", city, service: "Residential Window Cleaning", propertyType: "Residential", bestTime: "Morning (9–12)", preferredContact: "Text", referralSource: "Landing Page", comments: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const colors = { navy: "#071728", navy2: "#12314a", ink: "#0f172a", slate: "#334155", muted: "#64748b", line: "#d7e3ea", soft: "#f6fbfc", white: "#fff", mint: "#7ddcca", mintSoft: "#aee6dc", mintDark: "#217b70", sky: "#72c8e8", skySoft: "#b7dff0", lime: "#d7ec91", cream: "#fff7d6" };
  const phoneHref = "tel:+18189424177";
  const phoneDisplay = "(818) 942-4177";
  const email = "info@magicglovecleaning.com";
  const emailHref = `mailto:${email}`;
  const wrap = { maxWidth: 1120, margin: "0 auto", padding: "0 18px" };
  const btn = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 17px", borderRadius: 999, textDecoration: "none", fontWeight: 900, fontSize: 14, border: "1px solid transparent", cursor: "pointer", lineHeight: 1.1, boxShadow: "0 10px 24px rgba(7,23,40,.12)" };
  const card = { background: colors.white, border: `1px solid ${colors.line}`, borderRadius: 24, boxShadow: "0 18px 45px rgba(15,43,70,.07)" };
  const pill = { display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid rgba(255,255,255,.24)", background: "rgba(255,255,255,.11)", color: colors.white, padding: "8px 12px", borderRadius: 999, fontSize: 12, fontWeight: 900, backdropFilter: "blur(8px)" };
  const darkPill = { display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${colors.line}`, background: colors.white, color: colors.navy, padding: "8px 12px", borderRadius: 999, fontSize: 12, fontWeight: 900 };
  const input = { width: "100%", padding: "12px 13px", borderRadius: 15, border: `1px solid ${colors.line}`, fontSize: 14, marginTop: 6, boxSizing: "border-box", outline: "none", background: colors.white };
  const label = { fontWeight: 900, fontSize: 13, color: colors.slate };

  const proofCards = [
    { title: "We take our time on the tough spots.", text: "Hard water, edges, tracks, screens, and corners are the parts people notice. We don’t just swipe the glass and leave.", color: colors.mint, sliderTitle: "Hard water", beforeImage: "/landing/hard-water-before.jpg", afterImage: "/landing/hard-water-after.jpg" },
    { title: "Straight quotes, no weird upsells.", text: "We explain what is included, what is optional, and what is actually worth doing for your home or storefront.", color: colors.sky, sliderTitle: "Dirt and grime", beforeImage: "/landing/dirt-grime-before.jpg", afterImage: "/landing/dirt-grime-after.jpg" },
    { title: "We want it to look right when we leave.", text: "We’re local, so our name matters. The goal is simple: clean work, fair pricing, and customers who call us again.", color: colors.lime, sliderTitle: "Solar cleaning", beforeImage: "/landing/solar-cleaning-before.jpg", afterImage: "/landing/solar-cleaning-after.jpg" },
  ];
  const services = ["Free Quotes", "Screens, Tracks & Sills", "Interior & Exterior", "Hard Water Add-Ons", "Solar Panel Add-Ons"];
  const included = ["Interior & exterior glass", "Screens, tracks & sills", "Hard water spot inspection", "Paint or overspray removal", "Bug buildup removal", "Solar panel add-ons", "Storefront maintenance", "Exterior-only options"];

  function change(e) {
    setForm((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, leadSource: "Website Landing Page", pageTitle: `Window Cleaning in ${city}`, hp: "" }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || "Failed to send request.");
      setStatus("sent");
      setMessage("Request sent — we’ll call or text you shortly.");
      setForm((previous) => ({ ...previous, fullName: "", phone: "", email: "", comments: "" }));
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please call or text us instead.");
    }
  }

  return (
    <main style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", color: colors.ink, background: `linear-gradient(180deg, ${colors.soft} 0%, #fff 46%, #f7fbff 100%)` }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${colors.line}` }}>
        <div style={{ ...wrap, paddingTop: 12, paddingBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <span style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(135deg, ${colors.mint}, ${colors.sky})`, padding: 4, display: "grid", placeItems: "center", boxShadow: "0 12px 28px rgba(57,198,255,.18)", flexShrink: 0 }}>
              <span style={{ width: "100%", height: "100%", borderRadius: 17, background: colors.white, display: "grid", placeItems: "center", overflow: "hidden" }}><img src="/magic-glove-logo.jpg" alt="Magic Glove Window Cleaning" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></span>
            </span>
            <span><span style={{ display: "block", fontWeight: 1000, letterSpacing: "-.02em", fontSize: 18 }}>Magic Glove</span><span style={{ display: "block", fontSize: 13, color: colors.muted, fontWeight: 900 }}>Window Cleaning</span></span>
          </a>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}><a href={phoneHref} style={{ ...btn, background: colors.white, color: colors.navy, borderColor: colors.line, boxShadow: "none" }}>Call</a><a href="#quote" style={{ ...btn, background: `linear-gradient(135deg, ${colors.mint}, ${colors.sky})`, color: colors.navy }}>Get Quote</a></div>
        </div>
      </nav>

      <section style={{ position: "relative", color: colors.white, overflow: "hidden", background: colors.navy }}>
        <video autoPlay muted loop playsInline poster="/landing/hero-poster.jpg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .72, pointerEvents: "none" }}><source src="/landing/hero-video.mp4" type="video/mp4" /></video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(7,23,40,.78) 0%, rgba(7,23,40,.58) 45%, rgba(18,49,74,.36) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 18% 20%, rgba(125,220,202,.14), transparent 30%)" }} />
        <div style={{ ...wrap, position: "relative", zIndex: 2, paddingTop: 64, paddingBottom: 72 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18, padding: "10px 12px", borderRadius: 22, background: "rgba(7,23,40,.24)", border: "1px solid rgba(255,255,255,.20)", backdropFilter: "blur(6px)" }}><img src="/magic-glove-logo.jpg" alt="Magic Glove Window Cleaning logo" style={{ width: 46, height: 46, objectFit: "contain", borderRadius: 14, background: colors.white }} /><div><div style={{ fontWeight: 1000 }}>Magic Glove Window Cleaning</div><div style={{ fontSize: 12, color: "#d0f2ec", fontWeight: 800 }}>Local, detail-focused service</div></div></div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}><span style={pill}>Window Cleaning in {city}</span><span style={pill}>Residential • Commercial • Solar</span></div>
              <h1 style={{ margin: 0, fontSize: "clamp(44px, 7vw, 72px)", lineHeight: ".96", letterSpacing: "-.055em", textShadow: "0 8px 30px rgba(0,0,0,.42)" }}>Local window cleaning that doesn’t feel rushed.</h1>
              <p style={{ marginTop: 20, fontSize: 18, lineHeight: 1.75, color: "#eaf7fa", maxWidth: 680, textShadow: "0 4px 18px rgba(0,0,0,.32)" }}>We help homes around {areaDescription} look cleaner and brighter with detailed glass, screens, tracks, sills, hard water help, and solar panel add-ons.</p>
              <div style={{ marginTop: 22, padding: "16px 18px", borderRadius: 22, background: "rgba(7,23,40,.34)", border: "1px solid rgba(125,220,202,.30)", maxWidth: 620, backdropFilter: "blur(6px)" }}><div style={{ fontSize: 22, fontWeight: 1000 }}>Get $75 off your first full-service window cleaning.</div><div style={{ marginTop: 6, color: "#d0f2ec", fontWeight: 800 }}>Fair pricing. Careful work. No pushy upsells.</div></div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}><a href="#quote" style={{ ...btn, background: `linear-gradient(135deg, ${colors.mint}, ${colors.sky})`, color: colors.navy }}>Get Free Quote</a><a href={phoneHref} style={{ ...btn, background: "rgba(255,255,255,.14)", color: colors.white, borderColor: "rgba(255,255,255,.30)" }}>Call Now</a><a href="/" style={{ ...btn, background: colors.white, color: colors.navy }}>Check out our website</a></div>
            </div>
            <div style={{ ...card, padding: 16, background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.25)", backdropFilter: "blur(10px)" }}><div style={{ minHeight: 360, borderRadius: 22, background: `linear-gradient(145deg, rgba(125,220,202,.24), rgba(114,200,232,.16)), linear-gradient(135deg, #fff, #eef8fb)`, position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", inset: 26, borderRadius: 28, border: "2px dashed rgba(7,23,40,.18)" }} /><div style={{ position: "absolute", top: 26, left: 26, right: 26, background: colors.white, color: colors.navy, borderRadius: 20, padding: 16, boxShadow: "0 18px 40px rgba(7,23,40,.10)" }}><div style={{ fontSize: 13, fontWeight: 1000, color: colors.mintDark, textTransform: "uppercase", letterSpacing: ".08em" }}>Real job photos below</div><div style={{ marginTop: 6, fontSize: 24, fontWeight: 1000, letterSpacing: "-.03em" }}>Before / after results</div><div style={{ marginTop: 8, color: colors.muted, lineHeight: 1.6, fontSize: 14 }}>Hard water, dirt and grime, and solar panel cleaning examples.</div></div><div style={{ position: "absolute", bottom: 26, left: 26, right: 26, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><div style={{ borderRadius: 18, padding: 18, background: "rgba(7,23,40,.80)", color: colors.white, fontWeight: 900 }}>Before</div><div style={{ borderRadius: 18, padding: 18, background: `linear-gradient(135deg, ${colors.mintSoft}, ${colors.skySoft})`, color: colors.navy, fontWeight: 1000 }}>After</div></div></div></div>
          </div>
        </div>
      </section>

      <section style={{ background: colors.white, borderBottom: `1px solid ${colors.line}` }}><div style={{ ...wrap, paddingTop: 18, paddingBottom: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>{services.map((item, index) => <div key={item} style={{ borderRadius: 18, padding: 14, textAlign: "center", fontWeight: 1000, color: colors.navy, background: index % 2 === 0 ? "#f0fbf8" : "#eff8fc", border: `1px solid ${colors.line}` }}>{item}</div>)}</div></section>

      <section style={{ ...wrap, paddingTop: 64, paddingBottom: 64 }}><div style={{ maxWidth: 780 }}><span style={darkPill}>How Magic Glove is different</span><h2 style={{ margin: "14px 0 0", fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1, letterSpacing: "-.045em" }}>Local service, careful work, fair prices.</h2><p style={{ marginTop: 14, color: colors.muted, fontSize: 16, lineHeight: 1.75 }}>We’re trying to build a real local name, not just get in and out. The job should look good, the price should make sense, and you should feel comfortable calling us again.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18, marginTop: 22 }}>{proofCards.map((item) => <div key={item.title} style={{ ...card, padding: 22, borderTop: `8px solid ${item.color}` }}><div style={{ width: 42, height: 42, borderRadius: 16, background: item.color, color: colors.navy, display: "grid", placeItems: "center", fontWeight: 1000, marginBottom: 16 }}>✓</div><h3 style={{ margin: 0, fontSize: 21, lineHeight: 1.2, letterSpacing: "-.02em" }}>{item.title}</h3><p style={{ color: colors.muted, lineHeight: 1.7, marginTop: 10, fontSize: 14 }}>{item.text}</p><BeforeAfterSlider colors={colors} title={item.sliderTitle} beforeImage={item.beforeImage} afterImage={item.afterImage} /></div>)}</div></section>

      <section style={{ background: "linear-gradient(135deg, #f0fbf8, #eff8fc)", borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}`, padding: "64px 0" }}><div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22, alignItems: "start" }}><div><span style={darkPill}>Detailed service</span><h2 style={{ margin: "14px 0 0", fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.03, letterSpacing: "-.04em" }}>What is included in a full-service clean?</h2><p style={{ marginTop: 14, color: colors.slate, fontSize: 16, lineHeight: 1.75 }}>{localAngle} Dust, hard water spots, bug buildup, dirty tracks, and cloudy glass can make a home feel darker. We focus on the details that make the finished job feel brighter and cleaner.</p></div><div style={{ ...card, padding: 22 }}><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>{included.map((item, index) => <div key={item} style={{ display: "flex", gap: 10, alignItems: "center", padding: 11, borderRadius: 16, background: index % 2 === 0 ? "#f4fbf8" : "#f3f9fc", border: `1px solid ${colors.line}`, color: colors.slate, fontSize: 14, fontWeight: 900 }}><span style={{ width: 24, height: 24, borderRadius: 10, background: index % 2 === 0 ? colors.mintSoft : colors.skySoft, color: colors.navy, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 1000 }}>✓</span><span>{item}</span></div>)}</div></div></div></section>

      <section id="quote" style={{ background: colors.navy, color: colors.white, padding: "72px 0" }}><div style={wrap}><div style={{ textAlign: "center", maxWidth: 850, margin: "0 auto 26px" }}><span style={pill}>Free quote</span><h2 style={{ margin: "14px 0 0", fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1, letterSpacing: "-.045em" }}>Get your window cleaning quote</h2><p style={{ marginTop: 12, fontSize: 16, color: "#dbeff4", lineHeight: 1.7 }}>Fill this out and we’ll reach out shortly. For fastest pricing, mention photos in the comments.</p></div><div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "start" }}><form onSubmit={submit} style={{ background: colors.white, color: colors.ink, borderRadius: 28, padding: 24, boxShadow: "0 25px 80px rgba(0,0,0,.23)", borderTop: `8px solid ${colors.mint}` }}><div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}><div><label style={label}>Full Name</label><input style={input} name="fullName" value={form.fullName} onChange={change} required placeholder="Your name" /></div><div><label style={label}>Phone</label><input style={input} name="phone" value={form.phone} onChange={change} required placeholder="(818) 555-1234" /></div><div><label style={label}>Email (optional)</label><input style={input} name="email" value={form.email} onChange={change} placeholder="name@email.com" /></div><div><label style={label}>City</label><input style={input} name="city" value={form.city} onChange={change} required placeholder={city} /></div><div><label style={label}>Service</label><select style={input} name="service" value={form.service} onChange={change}><option>Residential Window Cleaning</option><option>Commercial & Storefront Cleaning</option><option>Solar Panel Cleaning</option><option>Tint Removal</option><option>Other / Not sure</option></select></div><div><label style={label}>How did you hear about us?</label><select style={input} name="referralSource" value={form.referralSource} onChange={change}><option>Landing Page</option><option>Business Card/Door Hanger</option><option>Referred</option><option>Google</option><option>Instagram/Facebook</option><option>Other</option></select></div><div><label style={label}>Property Type</label><select style={input} name="propertyType" value={form.propertyType} onChange={change}><option>Residential</option><option>Commercial</option></select></div><div><label style={label}>Best Time</label><select style={input} name="bestTime" value={form.bestTime} onChange={change}><option>Morning (9–12)</option><option>Afternoon (12–4)</option><option>Evening (4–7)</option><option>Anytime</option></select></div><div><label style={label}>Preferred Contact</label><select style={input} name="preferredContact" value={form.preferredContact} onChange={change}><option>Text</option><option>Call</option><option>Email</option></select></div><div style={{ gridColumn: "1 / -1" }}><label style={label}>Comments</label><textarea style={{ ...input, minHeight: 120, resize: "vertical" }} name="comments" value={form.comments} onChange={change} placeholder="Example: 2-story home, heavy water spots, prefer Saturday..." /></div></div><div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}><button type="submit" disabled={status === "sending"} style={{ ...btn, background: `linear-gradient(135deg, ${colors.mint}, ${colors.sky})`, color: colors.navy }}>{status === "sending" ? "Sending..." : "Send Estimate Request"}</button><a href={emailHref} style={{ ...btn, background: colors.white, color: colors.navy, borderColor: colors.line, boxShadow: "none" }}>Email Instead</a></div>{message ? <p style={{ marginTop: 14, fontWeight: 900, color: status === "error" ? "#b91c1c" : "#0f7a5a" }}>{message}</p> : null}</form><div style={{ display: "grid", gap: 14 }}><div style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.20)", color: colors.white, borderRadius: 28, padding: 24 }}><h3 style={{ marginTop: 0, fontSize: 24 }}>Contact Magic Glove</h3><p style={{ color: "#dbeff4", lineHeight: 1.7 }}>Phone: <a href={phoneHref}>{phoneDisplay}</a><br />Email: <a href={emailHref}>{email}</a></p><div style={{ display: "grid", gap: 10 }}><a style={{ ...btn, background: `linear-gradient(135deg, ${colors.mint}, ${colors.sky})`, color: colors.navy }} href={phoneHref}>Call</a><a style={{ ...btn, background: colors.white, color: colors.navy }} href="sms:+18189424177">Text</a></div></div><div style={{ background: colors.cream, color: colors.navy, borderRadius: 28, padding: 24 }}><h3 style={{ marginTop: 0, fontSize: 24 }}>Our promise</h3><p style={{ color: colors.slate, lineHeight: 1.7 }}>We’re here to build a real local business. We want the work to look good, the pricing to make sense, and the experience to feel easy.</p><a style={{ ...btn, background: colors.navy, color: colors.white }} href="/">Check out our website</a></div></div></div></div></section>
    </main>
  );
}
