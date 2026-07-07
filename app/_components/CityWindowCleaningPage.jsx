"use client";

import { useState } from "react";

function BeforeAfterPhotoBox({ c, title, beforeImage = "", afterImage = "" }) {
  const [position, setPosition] = useState(52);

  const beforeStyle = beforeImage
    ? { backgroundImage: `url(${beforeImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(135deg, #dbe7ee, #8ca3b3)" };

  const afterStyle = afterImage
    ? { backgroundImage: `url(${afterImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: `linear-gradient(135deg, ${c.mintSoft}, ${c.skySoft})` };

  return (
    <div style={{ marginTop: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ fontSize: "12px", fontWeight: 1000, color: c.navy, textTransform: "uppercase", letterSpacing: ".08em" }}>{title}</div>
        <div style={{ fontSize: "12px", color: c.muted, fontWeight: 800 }}>Drag slider</div>
      </div>

      <div style={{ position: "relative", height: "210px", borderRadius: "22px", overflow: "hidden", border: `1px solid ${c.line}`, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.35)" }}>
        <div style={{ position: "absolute", inset: 0, ...afterStyle }}>
          {!afterImage ? (
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: c.navy, fontWeight: 1000, textAlign: "center", padding: "18px" }}>
              After photo here
            </div>
          ) : null}
        </div>

        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - position}% 0 0)`, ...beforeStyle }}>
          {!beforeImage ? (
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: c.white, fontWeight: 1000, textAlign: "center", padding: "18px", background: "rgba(7,23,40,.25)" }}>
              Before photo here
            </div>
          ) : null}
        </div>

        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 4, background: "rgba(7,23,40,.82)", color: c.white, borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 1000 }}>Before</div>
        <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 4, background: "rgba(255,255,255,.9)", color: c.navy, borderRadius: "999px", padding: "6px 10px", fontSize: "12px", fontWeight: 1000 }}>After</div>

        <div style={{ position: "absolute", left: `${position}%`, top: 0, bottom: 0, width: "3px", background: c.white, transform: "translateX(-50%)", zIndex: 5, boxShadow: "0 0 18px rgba(0,0,0,.3)" }} />
        <div style={{ position: "absolute", left: `${position}%`, top: "50%", transform: "translate(-50%, -50%)", zIndex: 6, width: "44px", height: "44px", borderRadius: "50%", background: c.white, color: c.navy, display: "grid", placeItems: "center", fontWeight: 1000, boxShadow: "0 10px 30px rgba(0,0,0,.22)", border: `3px solid ${c.mint}` }}>↔</div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Before and after slider for ${title}`}
          style={{ position: "absolute", inset: 0, zIndex: 10, opacity: 0, cursor: "ew-resize", width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

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

  const c = {
    navy: "#071728",
    navy2: "#12314a",
    ink: "#0f172a",
    slate: "#334155",
    muted: "#64748b",
    line: "#d7e3ea",
    soft: "#f6fbfc",
    white: "#ffffff",
    mint: "#7ddcca",
    mintSoft: "#aee6dc",
    mintDark: "#217b70",
    sky: "#72c8e8",
    skySoft: "#b7dff0",
    blue: "#2563eb",
    lime: "#d7ec91",
    limeSoft: "#eef7c9",
    cream: "#fff7d6",
  };

  const wrap = { maxWidth: "1120px", margin: "0 auto", padding: "0 18px" };

  const btn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "13px 17px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: 900,
    fontSize: "14px",
    border: "1px solid transparent",
    cursor: "pointer",
    lineHeight: 1.1,
    boxShadow: "0 10px 24px rgba(7,23,40,.12)",
  };

  const card = {
    background: c.white,
    border: `1px solid ${c.line}`,
    borderRadius: "24px",
    boxShadow: "0 18px 45px rgba(15, 43, 70, .07)",
  };

  const pill = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid rgba(255,255,255,.24)",
    background: "rgba(255,255,255,.11)",
    color: c.white,
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 900,
    backdropFilter: "blur(8px)",
  };

  const darkPill = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: `1px solid ${c.line}`,
    background: c.white,
    color: c.navy,
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 900,
  };

  const input = {
    width: "100%",
    padding: "12px 13px",
    borderRadius: "15px",
    border: `1px solid ${c.line}`,
    fontSize: "14px",
    marginTop: "6px",
    boxSizing: "border-box",
    outline: "none",
    background: c.white,
  };

  const label = { fontWeight: 900, fontSize: "13px", color: c.slate };

  const qualityCards = [
    {
      title: "We take our time on the tough spots.",
      text: "Hard water, edges, tracks, screens, and corners are the parts people notice. We don’t just swipe the glass and leave.",
      color: c.mint,
      sliderTitle: "Hard water",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "Straight quotes, no weird upsells.",
      text: "We explain what is included, what is optional, and what is actually worth doing for your home or storefront.",
      color: c.sky,
      sliderTitle: "Dirt and grime",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "We want it to look right when we leave.",
      text: "We’re local, so our name matters. The goal is simple: clean work, fair pricing, and customers who call us again.",
      color: c.lime,
      sliderTitle: "Solar cleaning",
      beforeImage: "",
      afterImage: "",
    },
  ];

  const included = [
    "Interior & exterior glass",
    "Screens, tracks & sills",
    "Hard water spot inspection",
    "Paint or overspray removal",
    "Bug buildup removal",
    "Solar panel add-ons",
    "Storefront maintenance",
    "Exterior-only options",
  ];

  const process = [
    ["1", "Send the request", "Tell us the city, service, and any problem areas."],
    ["2", "Share photos", "Photos help us price tall windows, screens, tracks, and hard water."],
    ["3", "Get a clear quote", "We explain the price and what is included before booking."],
    ["4", "Clean with care", "We focus on quality instead of racing to the next job."],
  ];

  return (
    <main style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", color: c.ink, background: `linear-gradient(180deg, ${c.soft} 0%, #ffffff 46%, #f7fbff 100%)` }}>
      <div style={{ background: `linear-gradient(90deg, ${c.navy} 0%, ${c.navy2} 58%, ${c.mintDark} 100%)`, color: c.white }}>
        <div style={{ ...wrap, paddingTop: "10px", paddingBottom: "10px", display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span style={pill}>$75 off first full-service clean</span>
            <span style={pill}>Quality over rushing</span>
            <span style={pill}>Free quotes</span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", fontWeight: 900, fontSize: "13px" }}>
            <a href={phoneHref}>{phoneDisplay}</a>
            <span style={{ opacity: .45 }}>•</span>
            <a href="/">Main website</a>
          </div>
        </div>
      </div>

      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.line}` }}>
        <div style={{ ...wrap, paddingTop: "12px", paddingBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ width: "64px", height: "64px", borderRadius: "20px", background: `linear-gradient(135deg, ${c.mint}, ${c.sky})`, padding: "4px", display: "grid", placeItems: "center", boxShadow: "0 12px 28px rgba(57,198,255,.18)", flexShrink: 0 }}>
              <span style={{ width: "100%", height: "100%", borderRadius: "17px", background: c.white, display: "grid", placeItems: "center", overflow: "hidden" }}>
                <img src="/magic-glove-logo.jpg" alt="Magic Glove Window Cleaning" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </span>
            </span>
            <span>
              <span style={{ display: "block", fontWeight: 1000, letterSpacing: "-.02em", fontSize: "18px" }}>Magic Glove</span>
              <span style={{ display: "block", fontSize: "13px", color: c.muted, fontWeight: 900 }}>Window Cleaning</span>
            </span>
          </a>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href={phoneHref} style={{ ...btn, background: c.white, color: c.navy, borderColor: c.line, boxShadow: "none" }}>Call</a>
            <a href="#quote" style={{ ...btn, background: `linear-gradient(135deg, ${c.mint}, ${c.sky})`, color: c.navy }}>Get Quote</a>
          </div>
        </div>
      </nav>

      <section style={{ background: `radial-gradient(circle at 15% 20%, rgba(125,220,202,.22), transparent 28%), radial-gradient(circle at 90% 15%, rgba(114,200,232,.20), transparent 28%), linear-gradient(135deg, ${c.navy} 0%, ${c.navy2} 62%, #113f4d 100%)`, color: c.white, overflow: "hidden" }}>
        <div style={{ ...wrap, paddingTop: "64px", paddingBottom: "72px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "18px", padding: "10px 12px", borderRadius: "22px", background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.20)" }}>
                <img src="/magic-glove-logo.jpg" alt="Magic Glove Window Cleaning logo" style={{ width: "46px", height: "46px", objectFit: "contain", borderRadius: "14px", background: c.white }} />
                <div>
                  <div style={{ fontWeight: 1000 }}>Magic Glove Window Cleaning</div>
                  <div style={{ fontSize: "12px", color: "#d0f2ec", fontWeight: 800 }}>Local, detail-focused service</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
                <span style={pill}>Window Cleaning in {city}</span>
                <span style={pill}>Residential • Commercial • Solar</span>
              </div>

              <h1 style={{ margin: 0, fontSize: "clamp(44px, 7vw, 72px)", lineHeight: ".96", letterSpacing: "-.055em" }}>
                Local window cleaning that doesn’t feel rushed.
              </h1>

              <p style={{ marginTop: "20px", fontSize: "18px", lineHeight: 1.75, color: "#dbeff4", maxWidth: "680px" }}>
                We help homes around {areaDescription} look cleaner and brighter with detailed glass, screens, tracks, sills, hard water help, and solar panel add-ons.
              </p>

              <div style={{ marginTop: "22px", padding: "16px 18px", borderRadius: "22px", background: "rgba(125,220,202,.12)", border: "1px solid rgba(125,220,202,.28)", maxWidth: "620px" }}>
                <div style={{ fontSize: "22px", fontWeight: 1000, color: c.white }}>Get $75 off your first full-service window cleaning.</div>
                <div style={{ marginTop: "6px", color: "#d0f2ec", fontWeight: 800 }}>Fair pricing. Careful work. No pushy upsells.</div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
                <a href="#quote" style={{ ...btn, background: `linear-gradient(135deg, ${c.mint}, ${c.sky})`, color: c.navy }}>Get Free Quote</a>
                <a href={phoneHref} style={{ ...btn, background: "rgba(255,255,255,.10)", color: c.white, borderColor: "rgba(255,255,255,.28)" }}>Call Now</a>
                <a href="/" style={{ ...btn, background: c.white, color: c.navy }}>Check out our website</a>
              </div>
            </div>

            <div style={{ ...card, padding: "16px", background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.20)", boxShadow: "0 30px 80px rgba(0,0,0,.22)", backdropFilter: "blur(10px)" }}>
              <div style={{ minHeight: "360px", borderRadius: "22px", background: `linear-gradient(145deg, rgba(125,220,202,.24), rgba(114,200,232,.16)), linear-gradient(135deg, #ffffff, #eef8fb)`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: "26px", borderRadius: "28px", border: "2px dashed rgba(7,23,40,.18)" }} />
                <div style={{ position: "absolute", top: "26px", left: "26px", right: "26px", background: c.white, color: c.navy, borderRadius: "20px", padding: "16px", boxShadow: "0 18px 40px rgba(7,23,40,.10)" }}>
                  <div style={{ fontSize: "13px", fontWeight: 1000, color: c.mintDark, textTransform: "uppercase", letterSpacing: ".08em" }}>Photos coming next</div>
                  <div style={{ marginTop: "6px", fontSize: "24px", fontWeight: 1000, letterSpacing: "-.03em" }}>Before / after section</div>
                  <div style={{ marginTop: "8px", color: c.muted, lineHeight: 1.6, fontSize: "14px" }}>We’ll add real job photos here after the layout is set.</div>
                </div>
                <div style={{ position: "absolute", bottom: "26px", left: "26px", right: "26px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ borderRadius: "18px", padding: "18px", background: "rgba(7,23,40,.80)", color: c.white, fontWeight: 900 }}>Before</div>
                  <div style={{ borderRadius: "18px", padding: "18px", background: `linear-gradient(135deg, ${c.mintSoft}, ${c.skySoft})`, color: c.navy, fontWeight: 1000 }}>After</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: c.white, borderBottom: `1px solid ${c.line}` }}>
        <div style={{ ...wrap, paddingTop: "18px", paddingBottom: "18px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
          {["Free Quotes", "Screens, Tracks & Sills", "Interior & Exterior", "Hard Water Add-Ons", "Solar Panel Add-Ons"].map((item, index) => (
            <div key={item} style={{ borderRadius: "18px", padding: "14px", textAlign: "center", fontWeight: 1000, color: c.navy, background: index % 2 === 0 ? "#f0fbf8" : "#eff8fc", border: `1px solid ${c.line}` }}>{item}</div>
          ))}
        </div>
      </section>

      <section style={{ ...wrap, paddingTop: "64px", paddingBottom: "64px" }}>
        <div style={{ maxWidth: "780px" }}>
          <span style={darkPill}>How Magic Glove is different</span>
          <h2 style={{ margin: "14px 0 0", fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1, letterSpacing: "-.045em" }}>Local service, careful work, fair prices.</h2>
          <p style={{ marginTop: "14px", color: c.muted, fontSize: "16px", lineHeight: 1.75 }}>
            We’re trying to build a real local name, not just get in and out. The job should look good, the price should make sense, and you should feel comfortable calling us again.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px", marginTop: "22px" }}>
          {qualityCards.map((item) => (
            <div key={item.title} style={{ ...card, padding: "22px", borderTop: `8px solid ${item.color}` }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "16px", background: item.color, color: c.navy, display: "grid", placeItems: "center", fontWeight: 1000, marginBottom: "16px" }}>✓</div>
              <h3 style={{ margin: 0, fontSize: "21px", lineHeight: 1.2, letterSpacing: "-.02em" }}>{item.title}</h3>
              <p style={{ color: c.muted, lineHeight: 1.7, marginTop: "10px", fontSize: "14px" }}>{item.text}</p>
              <BeforeAfterPhotoBox c={c} title={item.sliderTitle} beforeImage={item.beforeImage} afterImage={item.afterImage} />
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: `linear-gradient(135deg, #f0fbf8, #eff8fc)`, borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, padding: "64px 0" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px", alignItems: "start" }}>
          <div>
            <span style={darkPill}>Detailed service</span>
            <h2 style={{ margin: "14px 0 0", fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.03, letterSpacing: "-.04em" }}>What is included in a full-service clean?</h2>
            <p style={{ marginTop: "14px", color: c.slate, fontSize: "16px", lineHeight: 1.75 }}>
              {localAngle} Dust, hard water spots, bug buildup, dirty tracks, and cloudy glass can make a home feel darker. We focus on the details that make the finished job feel brighter and cleaner.
            </p>
          </div>

          <div style={{ ...card, padding: "22px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "10px" }}>
              {included.map((item, index) => (
                <div key={item} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "11px", borderRadius: "16px", background: index % 2 === 0 ? "#f4fbf8" : "#f3f9fc", border: `1px solid ${c.line}`, color: c.slate, fontSize: "14px", fontWeight: 900 }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "10px", background: index % 2 === 0 ? c.mintSoft : c.skySoft, color: c.navy, display: "grid", placeItems: "center", fontSize: "12px", fontWeight: 1000 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...wrap, paddingTop: "64px", paddingBottom: "64px" }}>
        <span style={darkPill}>Simple quote process</span>
        <h2 style={{ margin: "14px 0 0", fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.03, letterSpacing: "-.04em" }}>Clear, easy, no pressure.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginTop: "22px" }}>
          {process.map(([num, title, text]) => (
            <div key={title} style={{ ...card, padding: "20px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: `linear-gradient(135deg, ${c.mintSoft}, ${c.skySoft})`, color: c.navy, display: "grid", placeItems: "center", fontWeight: 1000, marginBottom: "14px" }}>{num}</div>
              <h3 style={{ margin: 0, fontSize: "19px" }}>{title}</h3>
              <p style={{ marginTop: "8px", color: c.muted, lineHeight: 1.65, fontSize: "14px" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...wrap, paddingBottom: "64px" }}>
        <div style={{ borderRadius: "30px", padding: "26px", background: `linear-gradient(135deg, ${c.navy}, ${c.navy2})`, color: c.white, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", alignItems: "center", boxShadow: "0 24px 70px rgba(7,23,40,.16)" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-.04em" }}>Serving {city} and nearby areas</h2>
            <p style={{ marginTop: "10px", color: "#dbeff4", lineHeight: 1.7 }}>Magic Glove Window Cleaning serves {city} and nearby areas including {nearbyAreas}.</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="#quote" style={{ ...btn, background: `linear-gradient(135deg, ${c.mint}, ${c.sky})`, color: c.navy }}>Get Free Quote</a>
            <a href={phoneHref} style={{ ...btn, background: c.white, color: c.navy }}>Call {phoneDisplay}</a>
          </div>
        </div>
      </section>

      <section id="quote" style={{ background: `radial-gradient(circle at 8% 10%, rgba(125,220,202,.18), transparent 30%), radial-gradient(circle at 95% 5%, rgba(114,200,232,.16), transparent 28%), ${c.navy}`, color: c.white, padding: "72px 0" }}>
        <div style={wrap}>
          <div style={{ textAlign: "center", maxWidth: "850px", margin: "0 auto 26px" }}>
            <span style={pill}>Free quote</span>
            <h2 style={{ margin: "14px 0 0", fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1, letterSpacing: "-.045em" }}>Get your window cleaning quote</h2>
            <p style={{ marginTop: "12px", fontSize: "16px", color: "#dbeff4", lineHeight: 1.7 }}>Fill this out and we’ll reach out shortly. For fastest pricing, mention photos in the comments.</p>
          </div>

          <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "start" }}>
            <form onSubmit={submit} style={{ background: c.white, color: c.ink, borderRadius: "28px", padding: "24px", boxShadow: "0 25px 80px rgba(0,0,0,.23)", borderTop: `8px solid ${c.mint}` }}>
              <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <div><label style={label}>Full Name</label><input style={input} name="fullName" value={form.fullName} onChange={onChange} required placeholder="Your name" /></div>
                <div><label style={label}>Phone</label><input style={input} name="phone" value={form.phone} onChange={onChange} required placeholder="(818) 555-1234" /></div>
                <div><label style={label}>Email (optional)</label><input style={input} name="email" value={form.email} onChange={onChange} placeholder="name@email.com" /></div>
                <div><label style={label}>City</label><input style={input} name="city" value={form.city} onChange={onChange} required placeholder={city} /></div>
                <div><label style={label}>Service</label><select style={input} name="service" value={form.service} onChange={onChange}><option>Residential Window Cleaning</option><option>Commercial & Storefront Cleaning</option><option>Solar Panel Cleaning</option><option>Tint Removal</option><option>Other / Not sure</option></select></div>
                <div><label style={label}>How did you hear about us?</label><select style={input} name="referralSource" value={form.referralSource} onChange={onChange}><option>Landing Page</option><option>Business Card/Door Hanger</option><option>Referred</option><option>Google</option><option>Instagram/Facebook</option><option>Other</option></select></div>
                <div><label style={label}>Property Type</label><select style={input} name="propertyType" value={form.propertyType} onChange={onChange}><option>Residential</option><option>Commercial</option></select></div>
                <div><label style={label}>Best Time</label><select style={input} name="bestTime" value={form.bestTime} onChange={onChange}><option>Morning (9–12)</option><option>Afternoon (12–4)</option><option>Evening (4–7)</option><option>Anytime</option></select></div>
                <div><label style={label}>Preferred Contact</label><select style={input} name="preferredContact" value={form.preferredContact} onChange={onChange}><option>Text</option><option>Call</option><option>Email</option></select></div>
                <div style={{ gridColumn: "1 / -1" }}><label style={label}>Comments</label><textarea style={{ ...input, minHeight: "120px", resize: "vertical" }} name="comments" value={form.comments} onChange={onChange} placeholder="Example: 2-story home, heavy water spots, prefer Saturday..." /></div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
                <button type="submit" disabled={status === "sending"} style={{ ...btn, background: `linear-gradient(135deg, ${c.mint}, ${c.sky})`, color: c.navy }}>{status === "sending" ? "Sending..." : "Send Estimate Request"}</button>
                <a href={emailHref} style={{ ...btn, background: c.white, color: c.navy, borderColor: c.line, boxShadow: "none" }}>Email Instead</a>
              </div>

              {message ? <p style={{ marginTop: "14px", fontWeight: 900, color: status === "error" ? "#b91c1c" : "#0f7a5a" }}>{message}</p> : null}
            </form>

            <div style={{ display: "grid", gap: "14px" }}>
              <div style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.20)", color: c.white, borderRadius: "28px", padding: "24px", backdropFilter: "blur(10px)" }}>
                <h3 style={{ marginTop: 0, fontSize: "24px" }}>Contact Magic Glove</h3>
                <p style={{ color: "#dbeff4", lineHeight: 1.7 }}>Phone: <a href={phoneHref}>{phoneDisplay}</a><br />Email: <a href={emailHref}>{email}</a></p>
                <div style={{ display: "grid", gap: "10px" }}>
                  <a style={{ ...btn, background: `linear-gradient(135deg, ${c.mint}, ${c.sky})`, color: c.navy }} href={phoneHref}>Call</a>
                  <a style={{ ...btn, background: c.white, color: c.navy }} href="sms:+18189424177">Text</a>
                </div>
              </div>

              <div style={{ background: c.cream, color: c.navy, borderRadius: "28px", padding: "24px", border: "1px solid rgba(255,255,255,.3)" }}>
                <h3 style={{ marginTop: 0, fontSize: "24px" }}>Our promise</h3>
                <p style={{ color: c.slate, lineHeight: 1.7 }}>We’re here to build a real local business, not squeeze customers. We want the work to look good, the pricing to make sense, and the experience to feel easy.</p>
                <a style={{ ...btn, background: c.navy, color: c.white }} href="/">Check out our website</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
