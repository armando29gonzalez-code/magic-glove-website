"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Magic Glove — Single-page + Hash Routes
 * Routes:
 *   #/                 (home)
 *   #/work/windows
 *   #/work/storefront
 *   #/work/solar
 *   #/work/tint
 *
 * IMPORTANT:
 * - We NEVER read `window` during render (only inside useEffect / event handlers)
 * - We normalize the hash so route comparisons always match
 */

const BUSINESS = {
  name: "Magic Glove Window Cleaning",
  area: "Los Angeles & San Bernardino Counties",
  phoneDisplay: "(818) 942-4177",
  phoneTel: "+18189424177",
  // change email if needed:
  email: "armando29gonzalez@gmail.com",
};

const LOGO_SRC = "/magic-glove-logo.jpg"; // put file in /public with this name

// ---------- utilities ----------
function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function normalizeHashToRoute(rawHash) {
  // rawHash could be: "#/work/solar", "#/work/solar/", "#work/solar", "/work/solar", ""
  let h = rawHash || "";

  // If we got a full URL by mistake, try to pull just the hash part
  const hashIndex = h.indexOf("#");
  if (hashIndex >= 0) h = h.slice(hashIndex + 1); // remove everything up to and including '#'

  // Ensure it starts with a slash
  h = (h || "").trim();
  if (h === "" || h === "/") return "/";

  // Remove any leading slashes then add exactly one
  h = "/" + h.replace(/^\/+/, "");

  // Remove trailing slashes (THIS fixes route mismatch like "/work/solar/" vs "/work/solar")
  h = h.replace(/\/+$/, "");

  // Final fallback
  return h === "" ? "/" : h;
}

function routeToHash(route) {
  const r = (route || "/").trim();
  return "#"+(r.startsWith("/") ? r : `/${r}`);
}

function safeScrollToId(id) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---------- hook ----------
function useHashRoute() {
  const [route, setRoute] = useState("/");

  useEffect(() => {
    const apply = () => {
      const next = normalizeHashToRoute(window.location.hash);
      setRoute(next);
    };

    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return route;
}

// ---------- page components ----------
function Topbar({ onNav, onEstimate, onCall }) {
  return (
    <header className="topbar">
      <div className="wrap topbarInner">
        <div className="brand">
          <img className="logo" src={LOGO_SRC} alt="Magic Glove logo" />
        </div>

        <nav className="nav">
          <button className="navLink" onClick={() => onNav("specialty")}>
            Specialty
          </button>
          <button className="navLink" onClick={() => onNav("services")}>
            Services
          </button>
          <button className="navLink" onClick={() => onNav("reviews")}>
            Reviews
          </button>
          <button className="navLink" onClick={() => onNav("community")}>
            Community
          </button>
          <button className="navLink" onClick={() => onNav("estimate")}>
            Estimate
          </button>
        </nav>

        <div className="topbarRight">
          <button className="btn btnPrimary" onClick={onEstimate}>
            Get Free Estimate
          </button>
          <button className="btn btnGhost" onClick={onCall}>
            Call
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onEstimate }) {
  return (
    <section className="hero">
      <div className="wrap heroInner">
        <div className="heroLeft">
          <div className="pillRow">
            <span className="pill">Free Estimates</span>
            <span className="pill">{BUSINESS.area}</span>
          </div>

          <h1 className="h1">
            Bright, streak-free windows — with a detail-first finish.
          </h1>

          <p className="lead">
            Premium residential & storefront cleaning, plus specialty work like solar panel cleaning,
            tint removal, and hard water stain removal.
          </p>

          <div className="heroCtas">
            <button className="btn btnPrimary" onClick={onEstimate}>
              Get Free Estimate
            </button>
            <a className="btn btnGhost" href={`tel:${BUSINESS.phoneTel}`}>
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>

          <div className="trustRow">
            <div className="trustCard">
              <div className="trustTitle">Careful, clean work</div>
              <div className="trustSub">Protected surfaces • Professional results</div>
            </div>
            <div className="trustCard">
              <div className="trustTitle">Fast scheduling</div>
              <div className="trustSub">We’ll confirm quickly after you request a quote</div>
            </div>
          </div>
        </div>

        <div className="heroRight">
          <div className="heroArt">
            <div className="heroArtTitle">Before / After</div>
            <div className="heroArtSub">Add your photos in /public later</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialtyGrid({ onEstimate }) {
  const cards = [
    {
      title: "Solar Panel Cleaning",
      desc: "Safe methods designed for panels.",
      bullets: ["Soft brush + purified water", "Seasonal maintenance", "Before/after photos (optional)"],
      workRoute: "/work/solar",
    },
    {
      title: "Tint Removal",
      desc: "Clean removal + adhesive cleanup.",
      bullets: ["Heat/steam method when appropriate", "Adhesive cleanup", "Glass-safe finish"],
      workRoute: "/work/tint",
    },
    {
      title: "Window Cleaning",
      desc: "Streak-free, detail-first.",
      bullets: ["Screens, tracks, frames", "Ladders & safety practices", "Protective covers as needed"],
      workRoute: "/work/windows",
    },
    {
      title: "Storefront Services",
      desc: "Weekly/biweekly routes available.",
      bullets: ["Professional presentation", "Reliable scheduling", "Quick touch-ups"],
      workRoute: "/work/storefront",
    },
  ];

  return (
    <section className="section" id="specialty">
      <div className="wrap">
        <h2 className="h2">Specialty</h2>
        <p className="sub">
          High-end cleaning for homeowners and businesses — with specialty services available on request.
        </p>

        <div className="grid">
          {cards.map((c) => (
            <div key={c.title} className="card">
              <div className="cardHead">
                <div>
                  <div className="cardTitle">{c.title}</div>
                  <div className="cardDesc">{c.desc}</div>
                </div>
                <div className="check">✓</div>
              </div>

              <ul className="bullets">
                {c.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <div className="cardCtas">
                <button className="btn btnPrimary" onClick={onEstimate}>
                  Get Estimate
                </button>

                {/* IMPORTANT: hash link */}
                <a className="btn btnGhost" href={routeToHash(c.workRoute)}>
                  See our work!
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services({ onEstimate }) {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <h2 className="h2">Services</h2>
        <div className="twoCol">
          <div className="card">
            <div className="cardTitle">What we clean</div>
            <ul className="bullets">
              <li>Interior & exterior window cleaning</li>
              <li>Screens, tracks, frames, and sills</li>
              <li>Storefront and commercial glass</li>
              <li>Hard water stain treatment (when possible)</li>
              <li>Solar panel cleaning</li>
              <li>Tint removal</li>
            </ul>
          </div>

          <div className="card">
            <div className="cardTitle">How it works</div>
            <ul className="bullets">
              <li>Request a quote (takes ~1 minute)</li>
              <li>We confirm pricing & schedule</li>
              <li>We show up on time, protected & prepared</li>
              <li>You get a bright, clean finish — done right</li>
            </ul>

            <div className="cardCtas">
              <button className="btn btnPrimary" onClick={onEstimate}>
                Get Free Estimate
              </button>
              <a className="btn btnGhost" href={`tel:${BUSINESS.phoneTel}`}>
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <h2 className="h2">Testimonials</h2>
        <p className="sub">Add your real reviews here anytime (Google / Yelp).</p>

        <div className="reviewCard">
          <div className="reviewTop">
            <span className="badge">Google</span>
            <div className="stars">★★★★★</div>
          </div>
          <div className="quote">
            “Professional, careful, and clean work. You can tell they actually care about the finish.”
          </div>
          <div className="reviewMeta">J. Nguyen • Northridge</div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="section" id="community">
      <div className="wrap">
        <h2 className="h2">Community</h2>
        <div className="card">
          <div className="cardTitle">Serving the areas we live in</div>
          <p className="sub" style={{ marginTop: 10 }}>
            We’re local, respectful, and we treat your home or storefront like it’s our own.
          </p>
        </div>
      </div>
    </section>
  );
}

function EstimateSection() {
  return (
    <section className="section" id="estimate">
      <div className="wrap">
        <h2 className="h2">Get a Free Estimate</h2>
        <p className="sub">
          Booking form can be connected here. For now, customers can call/text and you can swap this
          for your booking embed later.
        </p>

        <div className="card">
          <div className="cardTitle">Contact</div>
          <div className="contactGrid">
            <div>
              <div className="label">Phone</div>
              <a className="link" href={`tel:${BUSINESS.phoneTel}`}>
                {BUSINESS.phoneDisplay}
              </a>
            </div>
            <div>
              <div className="label">Email</div>
              <a className="link" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
            </div>
          </div>

          <div className="cardCtas" style={{ marginTop: 16 }}>
            <a className="btn btnPrimary" href={`tel:${BUSINESS.phoneTel}`}>
              Call Now
            </a>
            <a className="btn btnGhost" href={`sms:${BUSINESS.phoneTel}`}>
              Text Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkPage({ title, route, onBack, onEstimate }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="workTop">
          <button className="btn btnGhost" onClick={onBack}>
            ← Back
          </button>
          <button className="btn btnPrimary" onClick={onEstimate}>
            Get Free Estimate
          </button>
        </div>

        <h2 className="h2">{title}</h2>
        <p className="sub">
          Add your before/after photos here. (We’ll upload images into <code>/public</code> and map them.)
        </p>

        <div className="gallery">
          <div className="ph">Photo placeholder</div>
          <div className="ph">Photo placeholder</div>
          <div className="ph">Photo placeholder</div>
          <div className="ph">Photo placeholder</div>
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <div className="cardTitle">Want this done at your place?</div>
          <p className="sub" style={{ marginTop: 10 }}>
            Tap below and we’ll get you scheduled.
          </p>
          <div className="cardCtas">
            <button className="btn btnPrimary" onClick={onEstimate}>
              Get Free Estimate
            </button>
            <a className="btn btnGhost" href={routeToHash(route)}>
              Copy link
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- main ----------
export default function Page() {
  const route = useHashRoute();
  const isHome = route === "/";

  const workTitle = useMemo(() => {
    switch (route) {
      case "/work/windows":
        return "Window Cleaning — Our Work";
      case "/work/storefront":
        return "Storefront — Our Work";
      case "/work/solar":
        return "Solar Panel Cleaning — Our Work";
      case "/work/tint":
        return "Tint Removal — Our Work";
      default:
        return null;
    }
  }, [route]);

  const goToRoute = (r) => {
    if (typeof window === "undefined") return;
    window.location.hash = routeToHash(r);
  };

  const goHome = () => goToRoute("/");

  const goHomeAndScroll = (id) => {
    // go home first, then scroll once the home sections are in view
    goToRoute("/");

    // wait for route update + render, then scroll
    let tries = 0;
    const tick = () => {
      tries += 1;
      if (tries > 30) return; // safety
      // when home is mounted, the element exists
      const el = typeof document !== "undefined" ? document.getElementById(id) : null;
      if (el) {
        safeScrollToId(id);
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const onEstimate = () => goHomeAndScroll("estimate");
  const onNav = (id) => goHomeAndScroll(id);

  const onCall = () => {
    if (typeof window === "undefined") return;
    window.location.href = `tel:${BUSINESS.phoneTel}`;
  };

  return (
    <>
      <Topbar onNav={onNav} onEstimate={onEstimate} onCall={onCall} />

      {isHome ? (
        <>
          <Hero onEstimate={onEstimate} />
          <SpecialtyGrid onEstimate={onEstimate} />
          <Services onEstimate={onEstimate} />
          <Reviews />
          <Community />
          <EstimateSection />
          <Footer />
        </>
      ) : workTitle ? (
        <>
          <WorkPage
            title={workTitle}
            route={route}
            onBack={goHome}
            onEstimate={onEstimate}
          />
          <Footer />
        </>
      ) : (
        <>
          <section className="section">
            <div className="wrap">
              <div className="card">
                <div className="cardTitle">Page not found</div>
                <p className="sub" style={{ marginTop: 10 }}>
                  That link doesn’t exist. Go back home.
                </p>
                <div className="cardCtas">
                  <button className="btn btnPrimary" onClick={goHome}>
                    Back Home
                  </button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}

      <Styles />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footerInner">
        <div className="footerLeft">
          <div className="footerBrand">{BUSINESS.name}</div>
          <div className="footerSub">{BUSINESS.area}</div>
        </div>
        <div className="footerRight">
          <a className="link" href={`tel:${BUSINESS.phoneTel}`}>
            {BUSINESS.phoneDisplay}
          </a>
          <span className="dot">•</span>
          <a className="link" href={`mailto:${BUSINESS.email}`}>
            {BUSINESS.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

function Styles() {
  return (
    <style jsx global>{`
      :root {
        --bg: #f7fbff;
        --card: #ffffff;
        --ink: #0f1b2d;
        --muted: #5b6b7f;
        --line: rgba(15, 27, 45, 0.12);
        --primary: #0f3554;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        color: var(--ink);
        background: var(--bg);
      }
      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono";
        font-size: 0.95em;
      }
      .wrap {
        width: min(1100px, calc(100% - 32px));
        margin: 0 auto;
      }

      /* Topbar */
      .topbar {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--line);
      }
      .topbarInner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        gap: 14px;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .logo {
        width: 44px;
        height: 44px;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: #fff;
        object-fit: cover;
      }
      .nav {
        display: flex;
        gap: 14px;
        align-items: center;
      }
      .navLink {
        border: 0;
        background: transparent;
        color: var(--muted);
        font-weight: 600;
        cursor: pointer;
        padding: 8px 10px;
        border-radius: 12px;
      }
      .navLink:hover {
        background: rgba(15, 27, 45, 0.06);
        color: var(--ink);
      }
      .topbarRight {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      /* Buttons */
      .btn {
        border: 1px solid var(--line);
        background: #fff;
        padding: 10px 14px;
        border-radius: 999px;
        cursor: pointer;
        font-weight: 700;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--ink);
      }
      .btnPrimary {
        background: var(--primary);
        color: #fff;
        border-color: transparent;
      }
      .btnGhost:hover {
        background: rgba(15, 27, 45, 0.06);
      }
      .btnPrimary:hover {
        filter: brightness(1.05);
      }

      /* Hero */
      .hero {
        padding: 44px 0 24px;
      }
      .heroInner {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 22px;
        align-items: stretch;
      }
      .pillRow {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 14px;
      }
      .pill {
        border: 1px solid var(--line);
        background: #fff;
        padding: 8px 12px;
        border-radius: 999px;
        font-weight: 700;
        color: var(--muted);
      }
      .h1 {
        font-size: clamp(30px, 4vw, 44px);
        line-height: 1.05;
        margin: 0;
        letter-spacing: -0.02em;
      }
      .lead {
        margin: 14px 0 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.55;
      }
      .heroCtas {
        display: flex;
        gap: 12px;
        margin-top: 18px;
        flex-wrap: wrap;
      }
      .trustRow {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 18px;
      }
      .trustCard {
        border: 1px solid var(--line);
        background: #fff;
        border-radius: 18px;
        padding: 12px 14px;
      }
      .trustTitle {
        font-weight: 800;
      }
      .trustSub {
        margin-top: 4px;
        color: var(--muted);
        font-size: 13px;
      }
      .heroArt {
        height: 100%;
        min-height: 280px;
        border-radius: 26px;
        border: 1px dashed rgba(15, 27, 45, 0.28);
        background: rgba(255, 255, 255, 0.7);
        display: grid;
        place-items: center;
        text-align: center;
        padding: 22px;
      }
      .heroArtTitle {
        font-weight: 900;
        font-size: 20px;
      }
      .heroArtSub {
        color: var(--muted);
        margin-top: 8px;
      }

      /* Sections */
      .section {
        padding: 34px 0;
      }
      .h2 {
        margin: 0;
        font-size: 28px;
        letter-spacing: -0.01em;
      }
      .sub {
        margin: 10px 0 0;
        color: var(--muted);
        line-height: 1.6;
      }

      /* Cards / grids */
      .grid {
        margin-top: 18px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      .card {
        border: 1px solid var(--line);
        background: var(--card);
        border-radius: 22px;
        padding: 16px;
        box-shadow: 0 6px 24px rgba(15, 27, 45, 0.06);
      }
      .cardHead {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: flex-start;
      }
      .cardTitle {
        font-weight: 900;
        font-size: 18px;
      }
      .cardDesc {
        color: var(--muted);
        margin-top: 6px;
        font-size: 14px;
      }
      .check {
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: rgba(10, 112, 70, 0.14);
        display: grid;
        place-items: center;
        font-weight: 900;
        color: rgba(10, 112, 70, 1);
      }
      .bullets {
        margin: 12px 0 0;
        padding-left: 18px;
        color: var(--muted);
      }
      .bullets li {
        margin: 6px 0;
      }
      .cardCtas {
        display: flex;
        gap: 10px;
        margin-top: 14px;
        flex-wrap: wrap;
      }
      .twoCol {
        margin-top: 18px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }

      /* Reviews */
      .reviewCard {
        margin-top: 18px;
        border: 1px solid var(--line);
        background: #fff;
        border-radius: 22px;
        padding: 18px;
      }
      .reviewTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }
      .badge {
        border: 1px solid var(--line);
        padding: 6px 10px;
        border-radius: 999px;
        font-weight: 800;
        color: var(--muted);
      }
      .stars {
        letter-spacing: 1px;
      }
      .quote {
        margin-top: 14px;
        font-size: 18px;
        font-weight: 700;
      }
      .reviewMeta {
        margin-top: 10px;
        color: var(--muted);
        font-weight: 700;
      }

      /* Estimate */
      .contactGrid {
        margin-top: 12px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .label {
        color: var(--muted);
        font-weight: 800;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .link {
        color: var(--primary);
        text-decoration: none;
        font-weight: 900;
      }
      .link:hover {
        text-decoration: underline;
      }

      /* Work page */
      .workTop {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        align-items: center;
        margin-bottom: 16px;
      }
      .gallery {
        margin-top: 16px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      .ph {
        height: 220px;
        border-radius: 22px;
        border: 1px dashed rgba(15, 27, 45, 0.28);
        background: rgba(255, 255, 255, 0.7);
        display: grid;
        place-items: center;
        color: var(--muted);
        font-weight: 900;
      }

      /* Footer */
      .footer {
        border-top: 1px solid var(--line);
        padding: 18px 0;
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(10px);
      }
      .footerInner {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
      }
      .footerBrand {
        font-weight: 900;
      }
      .footerSub {
        margin-top: 4px;
        color: var(--muted);
        font-weight: 700;
        font-size: 13px;
      }
      .dot {
        color: var(--muted);
      }

      /* Mobile */
      @media (max-width: 900px) {
        .heroInner {
          grid-template-columns: 1fr;
        }
        .grid {
          grid-template-columns: 1fr;
        }
        .twoCol {
          grid-template-columns: 1fr;
        }
        .contactGrid {
          grid-template-columns: 1fr;
        }
        .gallery {
          grid-template-columns: 1fr;
        }
        .nav {
          display: none;
        }
      }
    `}</style>
  );
}
