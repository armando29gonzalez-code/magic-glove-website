"use client";

import { useState } from "react";

const colors = {
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
  lime: "#d7ec91",
  cream: "#fff7d6",
};

function BeforeAfterSlider({ title, beforeImage, afterImage }) {
  const [position, setPosition] = useState(52);

  return (
    <div className="sliderWrap">
      <div className="sliderTop">
        <div className="sliderTitle">{title}</div>
        <div className="sliderHint">Drag slider</div>
      </div>

      <div className="sliderBox">
        <div className="sliderImage" style={{ backgroundImage: `url(${afterImage})` }} />
        <div className="sliderImage before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, backgroundImage: `url(${beforeImage})` }} />
        <div className="beforeBadge">Before</div>
        <div className="afterBadge">After</div>
        <div className="divider" style={{ left: `${position}%` }} />
        <div className="handle" style={{ left: `${position}%` }}>↔</div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Before and after slider for ${title}`}
          className="sliderInput"
        />
      </div>
    </div>
  );
}

export default function CityWindowCleaningPage({ city, areaDescription, nearbyAreas, localAngle }) {
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

  const phoneHref = "tel:+18189424177";
  const phoneDisplay = "(818) 942-4177";
  const email = "info@magicglovecleaning.com";
  const emailHref = `mailto:${email}`;

  const proofCards = [
    {
      title: "We take our time on the tough spots.",
      text: "Hard water, edges, tracks, screens, and corners are the parts people notice. We don’t just swipe the glass and leave.",
      color: colors.mint,
      sliderTitle: "Hard water",
      beforeImage: "/landing/hard-water-before.jpg",
      afterImage: "/landing/hard-water-after.jpg",
    },
    {
      title: "Straight quotes, no weird upsells.",
      text: "We explain what is included, what is optional, and what is actually worth doing for your home or storefront.",
      color: colors.sky,
      sliderTitle: "Dirt and grime",
      beforeImage: "/landing/dirt-grime-before.jpg",
      afterImage: "/landing/dirt-grime-after.jpg",
    },
    {
      title: "We want it to look right when we leave.",
      text: "We’re local, so our name matters. The goal is simple: clean work, fair pricing, and customers who call us again.",
      color: colors.lime,
      sliderTitle: "Solar cleaning",
      beforeImage: "/landing/solar-cleaning-before.jpg",
      afterImage: "/landing/solar-cleaning-after.jpg",
    },
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
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, leadSource: "Website Landing Page", pageTitle: `Window Cleaning in ${city}`, hp: "" }),
      });
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
    <main className="landingPage">
      <nav className="topNav">
        <div className="wrap navInner">
          <a href="/" className="brandLink">
            <span className="logoFrame"><img src="/magic-glove-logo.jpg" alt="Magic Glove Window Cleaning" /></span>
            <span className="brandText"><strong>Magic Glove</strong><span>Window Cleaning</span></span>
          </a>
          <div className="navActions">
            <a href={phoneHref} className="navButton secondary">Call</a>
            <a href="#quote" className="navButton primary">Get Quote</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <video autoPlay muted loop playsInline poster="/landing/hero-poster.jpg" className="heroVideo">
          <source src="/landing/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="heroOverlay" />

        <div className="wrap heroInner">
          <div className="heroContent">
            <div className="heroPills">
              <span>Window Cleaning in {city}</span>
              <span className="hideMobile">Residential • Commercial • Solar</span>
            </div>
            <h1>Local window cleaning that doesn’t feel rushed.</h1>
            <p>We help homes around {areaDescription} look cleaner and brighter with detailed glass, screens, tracks, sills, hard water help, and solar panel add-ons.</p>
            <div className="offerBox">
              <strong>Get $75 off your first full-service window cleaning.</strong>
              <span>Fair pricing. Careful work. No pushy upsells.</span>
            </div>
            <div className="heroButtons">
              <a href="#quote" className="heroBtn main">Get Free Quote</a>
              <a href={phoneHref} className="heroBtn outline">Call Now</a>
              <a href="/" className="heroBtn light">Main Website</a>
            </div>
          </div>
        </div>
      </section>

      <section className="serviceStrip">
        <div className="wrap serviceGrid">
          {services.map((item) => <div key={item} className="serviceChip">{item}</div>)}
        </div>
      </section>

      <section className="wrap proofSection">
        <div className="sectionIntro">
          <span className="smallPill">How Magic Glove is different</span>
          <h2>Local service, careful work, fair prices.</h2>
          <p>We’re trying to build a real local name, not just get in and out. The job should look good, the price should make sense, and you should feel comfortable calling us again.</p>
        </div>
        <div className="proofGrid">
          {proofCards.map((item) => (
            <div key={item.title} className="proofCard" style={{ borderTopColor: item.color }}>
              <div className="check" style={{ background: item.color }}>✓</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <BeforeAfterSlider title={item.sliderTitle} beforeImage={item.beforeImage} afterImage={item.afterImage} />
            </div>
          ))}
        </div>
      </section>

      <section className="detailsBand">
        <div className="wrap detailsGrid">
          <div>
            <span className="smallPill">Detailed service</span>
            <h2>What is included in a full-service clean?</h2>
            <p>{localAngle} Dust, hard water spots, bug buildup, dirty tracks, and cloudy glass can make a home feel darker. We focus on the details that make the finished job feel brighter and cleaner.</p>
          </div>
          <div className="includedCard">
            {included.map((item) => <div key={item} className="includedItem"><span>✓</span>{item}</div>)}
          </div>
        </div>
      </section>

      <section id="quote" className="quoteSection">
        <div className="wrap">
          <div className="quoteIntro">
            <span className="quotePill">Free quote</span>
            <h2>Get your window cleaning quote</h2>
            <p>Fill this out and we’ll reach out shortly. For fastest pricing, mention photos in the comments.</p>
          </div>
          <div className="quoteGrid">
            <form onSubmit={submit} className="quoteForm">
              <div className="formGrid">
                <label>Full Name<input name="fullName" value={form.fullName} onChange={change} required placeholder="Your name" /></label>
                <label>Phone<input name="phone" value={form.phone} onChange={change} required placeholder="(818) 555-1234" /></label>
                <label>Email (optional)<input name="email" value={form.email} onChange={change} placeholder="name@email.com" /></label>
                <label>City<input name="city" value={form.city} onChange={change} required placeholder={city} /></label>
                <label>Service<select name="service" value={form.service} onChange={change}><option>Residential Window Cleaning</option><option>Commercial & Storefront Cleaning</option><option>Solar Panel Cleaning</option><option>Tint Removal</option><option>Other / Not sure</option></select></label>
                <label>How did you hear about us?<select name="referralSource" value={form.referralSource} onChange={change}><option>Landing Page</option><option>Business Card/Door Hanger</option><option>Referred</option><option>Google</option><option>Instagram/Facebook</option><option>Other</option></select></label>
                <label>Property Type<select name="propertyType" value={form.propertyType} onChange={change}><option>Residential</option><option>Commercial</option></select></label>
                <label>Best Time<select name="bestTime" value={form.bestTime} onChange={change}><option>Morning (9–12)</option><option>Afternoon (12–4)</option><option>Evening (4–7)</option><option>Anytime</option></select></label>
                <label>Preferred Contact<select name="preferredContact" value={form.preferredContact} onChange={change}><option>Text</option><option>Call</option><option>Email</option></select></label>
                <label className="wide">Comments<textarea name="comments" value={form.comments} onChange={change} placeholder="Example: 2-story home, heavy water spots, prefer Saturday..." /></label>
              </div>
              <div className="formActions">
                <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send Estimate Request"}</button>
                <a href={emailHref}>Email Instead</a>
              </div>
              {message ? <p className={status === "error" ? "formMessage error" : "formMessage"}>{message}</p> : null}
            </form>
            <aside className="contactCards">
              <div className="contactCard dark"><h3>Contact Magic Glove</h3><p>Phone: <a href={phoneHref}>{phoneDisplay}</a><br />Email: <a href={emailHref}>{email}</a></p><a href={phoneHref}>Call</a><a href="sms:+18189424177">Text</a></div>
              <div className="contactCard cream"><h3>Our promise</h3><p>We’re here to build a real local business. We want the work to look good, the pricing to make sense, and the experience to feel easy.</p><a href="/">Check out our website</a></div>
            </aside>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landingPage { --navy: ${colors.navy}; --line: ${colors.line}; --mint: ${colors.mint}; --sky: ${colors.sky}; --muted: ${colors.muted}; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: ${colors.ink}; background: linear-gradient(180deg, ${colors.soft} 0%, #fff 46%, #f7fbff 100%); }
        .wrap { max-width: 1120px; margin: 0 auto; padding: 0 18px; }
        a { color: inherit; }
        .topNav { position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,.94); backdrop-filter: blur(12px); border-bottom: 1px solid ${colors.line}; }
        .navInner { padding-top: 12px; padding-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .brandLink { display: flex; align-items: center; gap: 14px; text-decoration: none; color: ${colors.ink}; min-width: 0; }
        .logoFrame { width: 64px; height: 64px; border-radius: 20px; background: linear-gradient(135deg, ${colors.mint}, ${colors.sky}); padding: 4px; display: grid; place-items: center; box-shadow: 0 12px 28px rgba(57,198,255,.18); flex-shrink: 0; }
        .logoFrame img { width: 100%; height: 100%; object-fit: contain; border-radius: 17px; background: white; }
        .brandText strong { display: block; font-size: 18px; line-height: 1.05; letter-spacing: -.02em; }
        .brandText span { display: block; font-size: 13px; color: ${colors.muted}; font-weight: 900; margin-top: 3px; }
        .navActions { display: flex; gap: 10px; align-items: center; flex-shrink: 0; }
        .navButton, .heroBtn, .formActions button, .formActions a, .contactCard a { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 12px 18px; border-radius: 999px; text-decoration: none; font-weight: 900; font-size: 15px; border: 1px solid transparent; }
        .navButton.secondary { color: ${colors.navy}; background: white; border-color: ${colors.line}; }
        .navButton.primary, .heroBtn.main, .formActions button, .contactCard.dark a:first-of-type { color: ${colors.navy}; background: linear-gradient(135deg, ${colors.mint}, ${colors.sky}); box-shadow: 0 10px 24px rgba(7,23,40,.12); }
        .hero { position: relative; color: white; overflow: hidden; background: ${colors.navy}; }
        .heroVideo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .72; pointer-events: none; }
        .heroOverlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7,23,40,.78) 0%, rgba(7,23,40,.58) 45%, rgba(18,49,74,.36) 100%); }
        .heroInner { position: relative; z-index: 2; padding-top: 74px; padding-bottom: 80px; }
        .heroContent { max-width: 770px; }
        .heroPills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
        .heroPills span, .smallPill, .quotePill { display: inline-flex; align-items: center; width: fit-content; border-radius: 999px; font-size: 13px; font-weight: 900; }
        .heroPills span { color: white; padding: 9px 14px; border: 1px solid rgba(255,255,255,.25); background: rgba(7,23,40,.24); backdrop-filter: blur(6px); }
        .hero h1 { margin: 0; font-size: clamp(52px, 7vw, 82px); line-height: .92; letter-spacing: -.06em; max-width: 780px; text-shadow: 0 8px 30px rgba(0,0,0,.42); }
        .hero p { margin: 22px 0 0; max-width: 720px; color: #eaf7fa; font-size: 19px; line-height: 1.72; text-shadow: 0 4px 18px rgba(0,0,0,.32); }
        .offerBox { margin-top: 26px; max-width: 620px; padding: 18px 20px; border-radius: 24px; background: rgba(7,23,40,.34); border: 1px solid rgba(125,220,202,.30); backdrop-filter: blur(6px); }
        .offerBox strong { display: block; font-size: 24px; line-height: 1.15; letter-spacing: -.03em; }
        .offerBox span { display: block; margin-top: 7px; color: #d0f2ec; font-weight: 900; font-size: 17px; }
        .heroButtons { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
        .heroBtn.outline { color: white; background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.30); }
        .heroBtn.light { color: ${colors.navy}; background: white; }
        .serviceStrip { background: white; border-bottom: 1px solid ${colors.line}; }
        .serviceGrid { padding-top: 18px; padding-bottom: 18px; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
        .serviceChip { border-radius: 18px; padding: 14px; text-align: center; font-weight: 1000; color: ${colors.navy}; background: #f0fbf8; border: 1px solid ${colors.line}; }
        .proofSection { padding-top: 64px; padding-bottom: 64px; }
        .sectionIntro { max-width: 780px; }
        .smallPill { padding: 8px 12px; border: 1px solid ${colors.line}; background: white; color: ${colors.navy}; }
        .sectionIntro h2, .detailsGrid h2, .quoteIntro h2 { margin: 14px 0 0; font-size: clamp(34px, 5vw, 52px); line-height: 1; letter-spacing: -.045em; }
        .sectionIntro p, .detailsGrid p { color: ${colors.muted}; font-size: 16px; line-height: 1.75; }
        .proofGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; margin-top: 22px; }
        .proofCard { background: white; border: 1px solid ${colors.line}; border-top: 8px solid ${colors.mint}; border-radius: 24px; padding: 22px; box-shadow: 0 18px 45px rgba(15,43,70,.07); }
        .check { width: 42px; height: 42px; border-radius: 16px; display: grid; place-items: center; color: ${colors.navy}; font-weight: 1000; margin-bottom: 16px; }
        .proofCard h3 { margin: 0; font-size: 21px; line-height: 1.2; letter-spacing: -.02em; }
        .proofCard p { color: ${colors.muted}; line-height: 1.7; margin-top: 10px; font-size: 14px; }
        .sliderWrap { margin-top: 18px; }
        .sliderTop { display: flex; justify-content: space-between; gap: 10px; align-items: center; margin-bottom: 8px; }
        .sliderTitle { font-size: 12px; font-weight: 1000; color: ${colors.navy}; text-transform: uppercase; letter-spacing: .08em; }
        .sliderHint { font-size: 12px; color: ${colors.muted}; font-weight: 800; }
        .sliderBox { position: relative; height: 230px; border-radius: 22px; overflow: hidden; border: 1px solid ${colors.line}; background: ${colors.soft}; }
        .sliderImage { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .beforeBadge, .afterBadge { position: absolute; top: 10px; z-index: 4; border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 1000; }
        .beforeBadge { left: 10px; background: rgba(7,23,40,.82); color: white; }
        .afterBadge { right: 10px; background: rgba(255,255,255,.92); color: ${colors.navy}; }
        .divider { position: absolute; top: 0; bottom: 0; width: 3px; background: white; transform: translateX(-50%); z-index: 5; box-shadow: 0 0 18px rgba(0,0,0,.3); }
        .handle { position: absolute; top: 50%; transform: translate(-50%, -50%); z-index: 6; width: 44px; height: 44px; border-radius: 50%; background: white; color: ${colors.navy}; display: grid; place-items: center; font-weight: 1000; box-shadow: 0 10px 30px rgba(0,0,0,.22); border: 3px solid ${colors.mint}; }
        .sliderInput { position: absolute; inset: 0; z-index: 10; opacity: 0; cursor: ew-resize; width: 100%; height: 100%; }
        .detailsBand { background: linear-gradient(135deg, #f0fbf8, #eff8fc); border-top: 1px solid ${colors.line}; border-bottom: 1px solid ${colors.line}; padding: 64px 0; }
        .detailsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; align-items: start; }
        .includedCard { background: white; border: 1px solid ${colors.line}; border-radius: 24px; padding: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; box-shadow: 0 18px 45px rgba(15,43,70,.07); }
        .includedItem { display: flex; gap: 10px; align-items: center; padding: 11px; border-radius: 16px; background: #f4fbf8; border: 1px solid ${colors.line}; color: ${colors.slate}; font-size: 14px; font-weight: 900; }
        .includedItem span { width: 24px; height: 24px; border-radius: 10px; background: ${colors.mintSoft}; color: ${colors.navy}; display: grid; place-items: center; font-size: 12px; font-weight: 1000; flex-shrink: 0; }
        .quoteSection { background: ${colors.navy}; color: white; padding: 72px 0; }
        .quoteIntro { text-align: center; max-width: 850px; margin: 0 auto 26px; }
        .quotePill { padding: 8px 12px; border: 1px solid rgba(255,255,255,.24); background: rgba(255,255,255,.11); color: white; }
        .quoteIntro p { color: #dbeff4; line-height: 1.7; }
        .quoteGrid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr); gap: 18px; align-items: start; }
        .quoteForm { background: white; color: ${colors.ink}; border-radius: 28px; padding: 24px; box-shadow: 0 25px 80px rgba(0,0,0,.23); border-top: 8px solid ${colors.mint}; }
        .formGrid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        label { font-weight: 900; font-size: 13px; color: ${colors.slate}; }
        input, select, textarea { width: 100%; padding: 12px 13px; border-radius: 15px; border: 1px solid ${colors.line}; font-size: 14px; margin-top: 6px; box-sizing: border-box; outline: none; background: white; font: inherit; }
        textarea { min-height: 120px; resize: vertical; }
        .wide { grid-column: 1 / -1; }
        .formActions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
        .formActions button { border: 0; }
        .formActions a { color: ${colors.navy}; background: white; border-color: ${colors.line}; }
        .formMessage { color: #0f7a5a; font-weight: 900; }
        .formMessage.error { color: #b91c1c; }
        .contactCards { display: grid; gap: 14px; }
        .contactCard { border-radius: 28px; padding: 24px; }
        .contactCard h3 { margin-top: 0; font-size: 24px; }
        .contactCard p { line-height: 1.7; }
        .contactCard.dark { background: rgba(255,255,255,.10); border: 1px solid rgba(255,255,255,.20); color: white; }
        .contactCard.dark p { color: #dbeff4; }
        .contactCard.dark a { margin: 6px 6px 0 0; }
        .contactCard.cream { background: ${colors.cream}; color: ${colors.navy}; }
        .contactCard.cream p { color: ${colors.slate}; }
        .contactCard.cream a { background: ${colors.navy}; color: white; }
        @media (max-width: 760px) {
          .wrap { padding-left: 19px; padding-right: 19px; }
          .navInner { padding-top: 14px; padding-bottom: 14px; align-items: center; }
          .logoFrame { width: 54px; height: 54px; border-radius: 17px; }
          .logoFrame img { border-radius: 14px; }
          .brandText strong { font-size: 19px; line-height: 1; }
          .brandText span { font-size: 13px; line-height: 1.1; }
          .navActions { display: grid; gap: 8px; }
          .navButton { min-height: 42px; padding: 10px 16px; font-size: 14px; }
          .heroVideo { opacity: .78; }
          .heroOverlay { background: linear-gradient(180deg, rgba(7,23,40,.66) 0%, rgba(7,23,40,.54) 52%, rgba(7,23,40,.67) 100%); }
          .heroInner { padding-top: 38px; padding-bottom: 48px; }
          .heroContent { max-width: 100%; }
          .heroPills { gap: 8px; margin-bottom: 16px; }
          .heroPills span { font-size: 12px; padding: 8px 11px; }
          .hideMobile { display: none !important; }
          .hero h1 { font-size: clamp(42px, 12vw, 56px); line-height: .94; max-width: 100%; }
          .hero p { font-size: 17px; line-height: 1.62; margin-top: 18px; }
          .offerBox { margin-top: 22px; padding: 16px; border-radius: 22px; }
          .offerBox strong { font-size: 24px; }
          .offerBox span { font-size: 16px; }
          .heroButtons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .heroBtn { min-height: 48px; padding: 12px 14px; font-size: 15px; }
          .heroBtn.light { grid-column: 1 / -1; }
          .serviceGrid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .serviceChip { font-size: 13px; padding: 12px 10px; border-radius: 16px; }
          .proofSection { padding-top: 44px; padding-bottom: 44px; }
          .sectionIntro h2, .detailsGrid h2, .quoteIntro h2 { font-size: 34px; line-height: 1.03; }
          .proofGrid { grid-template-columns: 1fr; }
          .proofCard { padding: 18px; }
          .sliderBox { height: 220px; }
          .detailsBand { padding: 44px 0; }
          .includedCard { grid-template-columns: 1fr; padding: 18px; }
          .quoteSection { padding: 52px 0; }
          .quoteGrid { grid-template-columns: 1fr; }
          .quoteForm { padding: 18px; border-radius: 24px; }
          .formGrid { grid-template-columns: 1fr; }
          .formActions { display: grid; grid-template-columns: 1fr; }
          .contactCards { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
