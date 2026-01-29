"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * MAGIC GLOVE V2 — Bright Premium + Video Hero + Specialty Sliders + Zip Checker + Testimonials
 * + Service Work Pages (hash routes)
 *
 * Routes:
 *  - Home:                 #/
 *  - Community Commitment: #/community
 *  - Estimate:             #/estimate    (auto scroll)
 *  - Service pages:
 *      #/work/windows
 *      #/work/storefront
 *      #/work/solar
 *      #/work/tint
 */

const LOGO_SRC = "/magic-glove-logo.jpg";

/* ===== Helpers ===== */

function formatPhoneForTel(phoneRaw) {
  const digits = (phoneRaw || "").replace(/\D/g, "");
  if (!digits) return "";
  return `+1${digits}`;
}

/**
 * Vercel/Next-safe hash routing:
 * - Never touches window during render
 * - Normalizes many hash formats to "/something"
 */
function useHashRoute() {
  const [route, setRoute] = useState("/"); // safe default

  useEffect(() => {
    const normalize = (hash) => {
      // hash examples: "#/work/solar", "#work/solar", "", "#/"
      let h = (hash || "").trim();
      if (!h) return "/";

      // remove leading '#'
      if (h.startsWith("#")) h = h.slice(1);

      // now h might be "/work/solar" or "work/solar" or "/"
      if (!h) return "/";
      if (!h.startsWith("/")) h = "/" + h;

      return h;
    };

    const apply = () => {
      const h = normalize(window.location.hash);
      setRoute(h);
    };

    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return route;
}

const cx = (...c) => c.filter(Boolean).join(" ");

const Pill = ({ children }) => <span className="pill">{children}</span>;

const Card = ({ className = "", children }) => (
  <div className={cx("card", className)}>{children}</div>
);

const Button = ({ variant = "primary", href, onClick, children }) => {
  const cls = cx("btn", variant === "primary" ? "btnPrimary" : "btnOutline");
  if (href)
    return (
      <a className={cls} href={href} onClick={onClick}>
        {children}
      </a>
    );
  return (
    <button className={cls} onClick={onClick} type="button">
      {children}
    </button>
  );
};

const SectionHead = ({ title, subtitle, center = false }) => (
  <div className={cx("sectionHead", center && "sectionHeadCenter")}>
    <h2 className="h2">{title}</h2>
    {subtitle ? <p className="sub">{subtitle}</p> : null}
  </div>
);

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Before/After slider with glove handle */
function BeforeAfterSlider({
  title,
  subtitle,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeStyle,
  afterStyle,
  height = 260,
}) {
  const [val, setVal] = useState(55);

  return (
    <Card className="baCard">
      <div className="baPad">
        <div className="baTop">
          <div>
            <div className="baTitle">{title}</div>
            {subtitle ? <div className="baSub">{subtitle}</div> : null}
          </div>
          <div className="baBadges">
            <span className="baBadge">{beforeLabel}</span>
            <span className="baBadge">{afterLabel}</span>
          </div>
        </div>

        <div className="baFrame" style={{ height }}>
          <div className="baLayer baAfter" style={afterStyle}>
            <div className="baCornerTag">{afterLabel}</div>
          </div>

          <div
            className="baLayer baBefore"
            style={{
              ...beforeStyle,
              clipPath: `inset(0 ${100 - val}% 0 0)`,
            }}
          >
            <div className="baCornerTag">{beforeLabel}</div>
          </div>

          <div className="baDivider" style={{ left: `${val}%` }}>
            <div className="gloveHandle" title="Drag slider">
              🧤
            </div>
          </div>

          <input
            className="baRange"
            type="range"
            min="0"
            max="100"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            aria-label={`Before/after slider for ${title}`}
          />
        </div>

        <div className="baHint">Drag the glove to reveal the “after.”</div>
      </div>
    </Card>
  );
}

/** Testimonials carousel */
function TestimonialsCarousel({ slides, intervalMs = 5000 }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!slides?.length) return;
    timerRef.current = setInterval(() => {
      setIdx((p) => (p + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [slides?.length, intervalMs]);

  const slide = slides[idx] || slides?.[0];

  if (!slide) return null;

  return (
    <div className="testWrap">
      <div className="testRail">
        <Card className="testCard">
          <div className="testInner">
            <div className="testSourceRow">
              <span className="testSource">{slide.source}</span>
              <span className="testStars">★★★★★</span>
            </div>

            <div className="testQuote">“{slide.quote}”</div>

            <div className="testMeta">
              <span className="testName">{slide.name}</span>
              <span className="testDot">•</span>
              <span className="testCity">{slide.city}</span>
            </div>

            {slide.cta ? (
              <div className="testCtaRow">
                <a className="btn btnPrimary" href={slide.cta.href}>
                  {slide.cta.label}
                </a>
              </div>
            ) : null}
          </div>
        </Card>
      </div>

      <div className="testDots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={cx("dotBtn", i === idx && "dotBtnOn")}
            onClick={() => setIdx(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

/** Zip checker */
function ZipChecker({ servicedZips }) {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState("idle"); // idle | ok | no | invalid

  useEffect(() => {
    if (!zip) return setStatus("idle");
    const digits = zip.replace(/\D/g, "");
    if (digits.length < 5) return setStatus("invalid");
    const z = digits.slice(0, 5);
    setZip(z);
    if (servicedZips.has(z)) setStatus("ok");
    else setStatus("no");
  }, [zip, servicedZips]);

  return (
    <div className="zipBox">
      <div className="zipLabel">Check your zip</div>
      <div className="zipRow">
        <input
          className="zipInput"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="e.g., 91344"
          inputMode="numeric"
        />
        <div
          className={cx(
            "zipStatus",
            status === "ok" && "zipOk",
            status === "no" && "zipNo"
          )}
        >
          {status === "idle"
            ? "—"
            : status === "invalid"
            ? "Enter 5 digits"
            : status === "ok"
            ? "We service this zip ✅"
            : "Ask us (maybe) ❓"}
        </div>
      </div>
      <div className="zipHint">
        (Demo coverage list — we’ll replace with your real coverage map/logic.)
      </div>
    </div>
  );
}

/** Placeholder image styles (swap later with real photos) */
function beforeGlass() {
  return {
    background:
      "linear-gradient(135deg, rgba(255,255,255,.14), rgba(0,0,0,0)), radial-gradient(900px 520px at 20% 20%, rgba(8,30,45,.18), transparent 60%), linear-gradient(180deg, rgba(7,19,31,.58), rgba(7,19,31,.34))",
  };
}
function afterGlass() {
  return {
    background:
      "radial-gradient(820px 520px at 25% 20%, rgba(147,182,164,.42), transparent 60%), linear-gradient(180deg, rgba(7,19,31,.44), rgba(7,19,31,.20))",
  };
}

/** Recent cleans cards (placeholder) */
function RecentCleans({ items }) {
  return (
    <div className="recentGrid">
      {items.map((it, idx) => (
        <Card key={idx} className="recentCard">
          <div className="recentTop">
            <div className="recentTitle">{it.title}</div>
            <div className="recentArea">{it.area}</div>
          </div>
          <div className="recentImgs">
            <div className="recentImg" style={beforeGlass()}>
              <span className="recentTag">Before</span>
            </div>
            <div className="recentImg" style={afterGlass()}>
              <span className="recentTag">After</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AppShell({ business, children }) {
  return (
    <div className="page">
      <style>{styles}</style>

      {/* Top strip */}
      <div className="topStrip">
        <div className="wrap topStripInner">
          <div className="pills">
            <Pill>Free Estimates</Pill>
            <Pill>{business.serviceArea}</Pill>
          </div>
          <div className="topStripRight">
            <a className="topLink" href={`tel:${business.phoneTel}`}>
              {business.phoneDisplay}
            </a>
            <span className="topDot">•</span>
            <a className="topLink" href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="nav">
        <div className="wrap navInner">
          <a className="brand" href="#/" aria-label="Back to home">
            <div className="logoBox" title="Back to home">
              <img
                src={LOGO_SRC}
                alt="Magic Glove logo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="logoFallback">MG</span>
            </div>
          </a>

          <nav className="navLinks">
            <a
              href="#/"
              onClick={() => setTimeout(() => scrollToId("specialty"), 0)}
            >
              Specialty
            </a>
            <a
              href="#/"
              onClick={() => setTimeout(() => scrollToId("services"), 0)}
            >
              Services
            </a>
            <a
              href="#/"
              onClick={() => setTimeout(() => scrollToId("testimonials"), 0)}
            >
              Reviews
            </a>
            <a href="#/community">Community</a>
            <a
              href="#/"
              onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
            >
              Estimate
            </a>
          </nav>

          <div className="navCtas">
            <Button
              variant="primary"
              href="#/"
              onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
            >
              Get Free Estimate
            </Button>
            <Button variant="outline" href={`tel:${business.phoneTel}`}>
              Call
            </Button>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="footer">
        <div className="wrap footerInner">
          <div>
            <div className="footBrand">{business.name}</div>
            <div className="footSub">
              Residential • Storefront • Solar • Tint Removal
            </div>
            <div className="footContact">
              Call/Text:{" "}
              <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
              <br />
              Email: <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>

          <div>
            <div className="footTitle">Quick Links</div>
            <div className="footLinks">
              <a
                href="#/"
                onClick={() => setTimeout(() => scrollToId("specialty"), 0)}
              >
                Specialty Cleaning
              </a>
              <a
                href="#/"
                onClick={() => setTimeout(() => scrollToId("services"), 0)}
              >
                Services
              </a>
              <a
                href="#/"
                onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
              >
                Estimate
              </a>
              <a href="#/community">Community Commitment</a>
            </div>
          </div>

          <div>
            <div className="footTitle">Our Magic Vision</div>
            <div className="footText">
              Honest work, fair pricing, and respect for every home and neighborhood we serve.
            </div>
            <div className="footBtnRow">
              <a className="btn btnOutline" href="#/community">
                Read more
              </a>
            </div>
          </div>
        </div>

        <div className="wrap footBottom">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="mobileCta">
        <a
          className="btn btnPrimary full"
          href="#/"
          onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
        >
          Free Estimate
        </a>
        <a className="btn btnOutline full" href={`tel:${business.phoneTel}`}>
          Call
        </a>
      </div>
      <div className="mobileSpacer" />
    </div>
  );
}

function HomePage({ business, servicedZips }) {
  const specialty = useMemo(
    () => [
      { title: "Hard Water Removal (Options)", subtitle: "Mineral spotting + haze (case-by-case)." },
      { title: "Stains & Buildup", subtitle: "Bug buildup, grime, and stubborn residue." },
      { title: "Paint on Windows", subtitle: "Careful options to improve paint marks." },
      { title: "Sills & Tracks", subtitle: "The finishing details that feel premium." },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        key: "windows",
        title: "Residential Window Cleaning",
        desc: "Interior + exterior options with a premium finish.",
        bullets: ["Streak-free glass", "Screens (optional)", "Track/sill detailing (optional)"],
        href: "#/work/windows",
      },
      {
        key: "storefront",
        title: "Commercial & Storefront Cleaning",
        desc: "Reliable routes that keep your business sharp.",
        bullets: ["Weekly/bi-weekly/monthly plans", "Early-morning options", "Professional invoicing"],
        href: "#/work/storefront",
      },
      {
        key: "solar",
        title: "Solar Panel Cleaning",
        desc: "Safe methods designed for panels.",
        bullets: ["Soft brush + purified water", "Seasonal maintenance", "Before/after photos (optional)"],
        href: "#/work/solar",
      },
      {
        key: "tint",
        title: "Tint Removal",
        desc: "Clean removal + adhesive cleanup.",
        bullets: ["Heat/steam method when appropriate", "Adhesive cleanup", "Glass-safe finish"],
        href: "#/work/tint",
      },
    ],
    []
  );

  const slides = useMemo(
    () => [
      {
        source: "Yelp",
        quote:
          "On time, clear communication, and the glass looked brand new. Super respectful team.",
        name: "A. Martinez",
        city: "Granada Hills",
      },
      {
        source: "Google",
        quote:
          "Professional, careful, and clean work. You can tell they actually care about the finish.",
        name: "J. Nguyen",
        city: "Northridge",
      },
      {
        source: "Social Media",
        quote:
          "Before/after was insane — booking was easy and they were very polite.",
        name: "M. Rivera",
        city: "Pasadena",
      },
      {
        source: "Magic Glove",
        quote:
          "See our Community Commitment — why we prioritize neighborhoods and long-term relationships.",
        name: "Learn More",
        city: "Our Magic Vision",
        cta: { label: "Learn more", href: "#/community" },
      },
    ],
    []
  );

  return (
    <AppShell business={business}>
      {/* HERO */}
      <section className="hero">
        <div className="heroVideoWrap" aria-hidden="true">
          <video className="heroVideo" autoPlay muted loop playsInline>
            {/*
              Later: add a real file to /public and uncomment:
              <source src="/magic-glove-hero.mp4" type="video/mp4" />
            */}
          </video>
          <div className="heroOverlay" />
        </div>

        <div className="wrap heroInner">
          <div className="heroTopRow">
            <div className="heroBrand">
              <div className="heroLogoBox">
                <img
                  src={LOGO_SRC}
                  alt="Magic Glove logo"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="logoFallback">MG</span>
              </div>
              <div className="heroBrandText">
                <div className="heroName">{business.name}</div>
                <div className="heroTag">
                  Window Cleaning • Solar • Storefront • Tint Removal
                </div>
              </div>
            </div>

            <div className="heroPills">
              <Pill>Premium Finish</Pill>
              <Pill>Fair Pricing</Pill>
              <Pill>Community First</Pill>
            </div>
          </div>

          <div className="heroContent">
            <h1 className="h1">
              We don’t just clean windows —
              <span className="accent"> we take pride in where we live.</span>
            </h1>

            <p className="heroLong">
              We don’t just clean windows — we show up for the neighborhoods we serve, because we live here too.
              We prioritize long-term relationships over one-time transactions. Clean windows are our foundation,
              and we’re not finished until you’re happy. While other companies chase shortcuts and pricing games,
              Magic Glove focuses on people. We treat your home like it’s our own — strengthening communities,
              one home at a time.
            </p>

            <div className="heroCtas">
              <Button
                variant="primary"
                href="#/"
                onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
              >
                Get Free Estimate
              </Button>
              <Button variant="outline" href={`tel:${business.phoneTel}`}>
                Call {business.phoneDisplay}
              </Button>
              <Button variant="outline" href="#/community">
                Community Commitment
              </Button>
            </div>
            {/* NOTE REMOVED (as requested) */}
          </div>
        </div>
      </section>

      {/* SPECIALTY CLEANING */}
      <section className="section" id="specialty">
        <div className="wrap">
          <SectionHead
            title="Specialty Cleaning"
            subtitle="Hard water, stains, paint, and detailed sills/tracks — premium options where it matters."
          />
          <div className="grid2">
            {specialty.map((s, i) => (
              <BeforeAfterSlider
                key={i}
                title={s.title}
                subtitle={s.subtitle}
                beforeStyle={beforeGlass()}
                afterStyle={afterGlass()}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES + ZIP CHECK */}
      <section className="section alt" id="services">
        <div className="wrap">
          <div className="servicesHeadRow">
            <div className="servicesHeadLeft">
              <SectionHead
                title="Services"
                subtitle="Choose what you need — confirm your zip — and request a free estimate."
              />
            </div>

            <div className="servicesHeadRight">
              <div className="ctaRow">
                <Button
                  variant="primary"
                  href="#/"
                  onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
                >
                  Get Estimate
                </Button>
                <Button variant="outline" href={`tel:${business.phoneTel}`}>
                  Call
                </Button>
                <Button variant="outline" href="#/work/windows">
                  See more of our work!
                </Button>
              </div>
              <ZipChecker servicedZips={servicedZips} />
            </div>
          </div>

          <div className="grid2">
            {services.map((s) => (
              <Card key={s.key} className="serviceCard">
                <div className="cardPad">
                  <div className="cardHeaderRow">
                    <div>
                      <h3 className="h3">{s.title}</h3>
                      <p className="mutedText">{s.desc}</p>
                    </div>
                    <div className="check">✓</div>
                  </div>

                  <ul className="bullets">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <div className="cardBtns">
                    <Button
                      variant="primary"
                      href="#/"
                      onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
                    >
                      Get Estimate
                    </Button>
                    <Button variant="outline" href={s.href}>
                      See our work!
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonials">
        <div className="wrap">
          <SectionHead
            title="Testimonials"
            subtitle="Auto-slides every 5 seconds: Yelp → Google → Social → Community Commitment."
            center
          />
          <TestimonialsCarousel slides={slides} intervalMs={5000} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section alt" id="how">
        <div className="wrap">
          <SectionHead
            title="How it works"
            subtitle="Simple, respectful, and consistent. Tap any step to jump to the estimate section."
          />

          <div className="howGrid">
            <button className="howStep" onClick={() => scrollToId("estimate")} type="button">
              <div className="howNum">1</div>
              <div className="howTitle">Request a free estimate</div>
              <div className="howText">
                Tell us what you need + where you’re located. Photos help for accuracy.
              </div>
            </button>

            <button className="howStep" onClick={() => scrollToId("estimate")} type="button">
              <div className="howNum">2</div>
              <div className="howTitle">Schedule a time</div>
              <div className="howText">We confirm details and set a clean, simple plan.</div>
            </button>

            <button className="howStep" onClick={() => scrollToId("estimate")} type="button">
              <div className="howNum">3</div>
              <div className="howTitle">Enjoy the Magic finish!</div>
              <div className="howText">
                We do careful work — and we’re not done until you’re happy.
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ESTIMATE */}
      <section className="section" id="estimate">
        <div className="wrap">
          <SectionHead
            title="Get a Free Estimate"
            subtitle="Demo form for now — after approval we’ll connect it to SMS/email/CRM."
          />
          <EstimateBlock business={business} />
        </div>
      </section>
    </AppShell>
  );
}

/** Service work page template */
function ServiceWorkPage({ business, title, subtitle, sliders, recent, seoTitle, seoBlocks }) {
  return (
    <AppShell business={business}>
      <section className="workHero">
        <div className="workHeroBg" />
        <div className="wrap workHeroInner">
          <div className="workCrumb">
            <a href="#/">Home</a> <span className="crumbDot">•</span>{" "}
            <span>See our work</span>
          </div>

          <h1 className="h1 workTitle">{title}</h1>
          <p className="workSub">{subtitle}</p>

          <div className="workBtns">
            <Button variant="primary" href="#/" onClick={() => setTimeout(() => scrollToId("estimate"), 0)}>
              Get Free Estimate
            </Button>
            <Button variant="outline" href={`tel:${business.phoneTel}`}>
              Call {business.phoneDisplay}
            </Button>
            <Button variant="outline" href="#/">Back to Home</Button>
          </div>
        </div>
      </section>

      <section className="section" id="work-sliders">
        <div className="wrap">
          <SectionHead
            title="Before & After"
            subtitle="Drag the glove to reveal the finish. (Placeholders for now — we’ll swap in your real photos.)"
          />
          <div className="grid2">
            {sliders.map((s, idx) => (
              <BeforeAfterSlider
                key={idx}
                title={s.title}
                subtitle={s.subtitle}
                beforeStyle={beforeGlass()}
                afterStyle={afterGlass()}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            title="Recent cleans"
            subtitle="A few recent jobs (placeholder examples). Each includes a service area to match local SEO structure."
          />
          <RecentCleans items={recent} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Card>
            <div className="cardPad seoPad">
              <div className="seoTitle">{seoTitle}</div>
              {seoBlocks.map((b, i) => (
                <div key={i} className="seoBlock">
                  {b.h ? <div className="seoH">{b.h}</div> : null}
                  <div className="seoP">{b.p}</div>
                </div>
              ))}

              <div className="seoCta">
                <div className="seoCtaLine">
                  Want a clean, premium finish with fair pricing and real care? Request a free quote anytime.
                </div>
                <div className="seoCtaBtns">
                  <Button variant="primary" href="#/" onClick={() => setTimeout(() => scrollToId("estimate"), 0)}>
                    Get Free Estimate
                  </Button>
                  <Button variant="outline" href={`tel:${business.phoneTel}`}>
                    Call {business.phoneDisplay}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Keep estimate at bottom too */}
      <section className="section alt" id="estimate">
        <div className="wrap">
          <SectionHead title="Get a Free Estimate" subtitle="Same quick form — no scrolling back required." />
          <EstimateBlock business={business} />
        </div>
      </section>
    </AppShell>
  );
}

function CommunityPage({ business }) {
  return (
    <AppShell business={business}>
      <section className="communityHero">
        <div className="wrap">
          <div className="communityTop">
            <h1 className="h1 communityTitle">Our Community Commitment</h1>
            <p className="communitySub">
              Magic Glove is about more than clean windows — it’s about strengthening communities, one home at a time.
            </p>

            <div className="communityBtns">
              <Button variant="primary" href="#/" onClick={() => setTimeout(() => scrollToId("estimate"), 0)}>
                Get Free Estimate
              </Button>
              <Button variant="outline" href="#/">Back to Home</Button>
            </div>
          </div>

          <Card>
            <div className="cardPad longForm">
              <div className="lfH">Magic Glove Window Cleaning</div>
              <div className="lfP">
                We don’t just clean windows—we take pride in caring for the neighborhoods we serve.
              </div>

              <div className="lfBlock">
                <div className="lfTitle">Who We Are</div>
                <div className="lfText">
                  Magic Glove Window Cleaning was created with the belief that great work and strong community go hand in hand.
                  We don’t just clean windows—we take pride in caring for the neighborhoods we serve.
                </div>
              </div>

              <div className="lfBlock">
                <div className="lfTitle">Founder</div>
                <div className="lfText">
                  Magic Glove Window Cleaning was founded on the belief that taking care of a home is really about taking care of the people who live there.
                  Armando, the founder of Magic Glove, was born and raised in Los Angeles, and his community has always meant everything to him.
                </div>
                <div className="lfText">
                  He comes from a background of successful work with larger corporate companies, where he learned discipline, professionalism, and what it takes to build
                  a reliable operation—but he always felt disconnected from the people he was meant to serve.
                </div>
                <div className="lfText">
                  What stayed with him most were the moments driving through the neighborhoods he grew up in—seeing children play in yards cluttered with broken fences,
                  hearing neighbors talk about struggling to keep up with bills or home repairs, and noticing elderly residents working tirelessly to maintain their homes
                  despite limited resources.
                </div>
                <div className="lfText">
                  Witnessing these everyday challenges made him realize he wanted to serve his community in a way that allowed him to give his fullest and most authentic self.
                  Although he didn’t initially know what business to start, he realized that the work he did in high school—cleaning windows, mowing lawns, and helping neighbors
                  maintain their homes—combined with the skills and professionalism he gained from his corporate career, gave him the perfect foundation to create something meaningful.
                </div>
                <div className="lfText">
                  That insight became the spark for Magic Glove Window Cleaning, a business built to serve his community with care, reliability, and pride in every job.
                  Window cleaning is only the first step—Magic Glove aims to grow into a one-stop, full-service exterior cleaning business.
                  Armando’s vision is simple: one trusted business, one family-like relationship, and one-stop care—so that when people look around their neighborhood,
                  they feel pride in living among great people who care for their homes and their community.
                </div>
              </div>

              <div className="lfBlock">
                <div className="lfTitle">Core Values</div>
                <ol className="lfList">
                  <li>
                    <strong>Community First</strong>
                    <br />
                    Every home and storefront is part of a larger community we respect and care for.
                  </li>
                  <li>
                    <strong>Relationships Matter</strong>
                    <br />
                    We prioritize long-term relationships over one-time transactions. Too often, businesses focus solely on sales, overlooking the meaningful connections that build strong, vibrant communities. At Magic Glove, we believe nurturing these relationships is just as important as the work we do.
                  </li>
                  <li>
                    <strong>Pride in Our Craft</strong>
                    <br />
                    Clean windows are our foundation, and every job is done with care and attention to detail. If the customer isn’t satisfied we are not satisfied.
                  </li>
                  <li>
                    <strong>Giving Back</strong>
                    <br />
                    As Magic Glove grows, so does our commitment to supporting the community that supports us.
                  </li>
                </ol>
              </div>

              <div className="lfBlock">
                <div className="lfTitle">What We Do</div>
                <div className="lfText">
                  <strong>Current Services</strong>
                </div>
                <ul className="lfBullets">
                  <li>Residential window cleaning</li>
                  <li>Storefront and small business window cleaning</li>
                </ul>
                <div className="lfText">
                  We proudly serve customers throughout Los Angeles with professional, reliable service.
                </div>
              </div>

              <div className="lfBlock">
                <div className="lfTitle">What Makes Magic Glove Different</div>
                <div className="lfText">
                  Many cleaning companies focus on speed or pricing. Magic Glove focuses on people.
                </div>
                <div className="lfText">
                  <strong>Customers choose us because we are:</strong>
                </div>
                <ul className="lfBullets">
                  <li>Reliable</li>
                  <li>Familiar</li>
                  <li>Respectful</li>
                  <li>Invested in their neighborhood</li>
                </ul>
              </div>

              <div className="lfBlock">
                <div className="lfTitle">Looking to the Future</div>
                <div className="lfText">
                  Magic Glove is growing into more than a window cleaning company. The long-term vision is a trusted full exterior home care service, including:
                </div>
                <ul className="lfBullets">
                  <li>Car washing and detailing</li>
                  <li>Yard work and outdoor maintenance</li>
                  <li>Other exterior home services</li>
                </ul>
                <div className="lfText">
                  <strong>One trusted relationship. One dependable company.</strong>
                </div>
              </div>

              <div className="lfBlock">
                <div className="lfTitle">Our Commitment to Los Angeles</div>
                <div className="lfText">Los Angeles isn’t just where we work—it’s home.</div>
                <div className="lfText">
                  <strong>We are committed to:</strong>
                </div>
                <ul className="lfBullets">
                  <li>Supporting local homes and businesses</li>
                  <li>Building lasting relationships</li>
                  <li>Remaining a trusted neighborhood presence</li>
                </ul>
              </div>

              <div className="lfBlock">
                <div className="lfTitle">Our Promise</div>
                <div className="lfText">
                  <strong>When you choose Magic Glove Window Cleaning, you can expect:</strong>
                </div>
                <ul className="lfBullets">
                  <li>Honest service</li>
                  <li>Consistent quality</li>
                  <li>Respect for your property</li>
                  <li>A company that genuinely cares</li>
                </ul>
              </div>

              <div className="lfCta">
                <div className="lfCtaLine">
                  Magic Glove Window Cleaning is about more than clean windows. It’s about strengthening communities—one home at a time.
                </div>
                <div className="lfCtaBtns">
                  <Button variant="primary" href="#/" onClick={() => setTimeout(() => scrollToId("estimate"), 0)}>
                    Get Free Estimate
                  </Button>
                  <Button variant="outline" href={`tel:${business.phoneTel}`}>
                    Call {business.phoneDisplay}
                  </Button>
                </div>
              </div>

              <div className="tiny">
                This is your full draft placed into the site. We can tighten sections later for SEO/readability if you want.
              </div>
            </div>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}

function EstimateBlock({ business }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    service: "Residential Window Cleaning",
    propertyType: "Residential",
    bestTime: "Morning (9–12)",
    preferredContact: "Text",
    comments: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    alert(
      `DEMO submission:\n\nName: ${form.fullName}\nPhone: ${form.phone}\nCity: ${form.city}\nService: ${form.service}\nPreferred: ${form.preferredContact} (${form.bestTime})\n\nNext step: connect to SMS/email/CRM.`
    );
  }

  return (
    <div className="gridForm">
      <Card className="formCard">
        <div className="cardPad">
          <form onSubmit={submit}>
            <div className="formGrid">
              <div>
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  required
                  placeholder="(818) 555-1234"
                />
              </div>
              <div>
                <label>Email (optional)</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="name@email.com"
                />
              </div>
              <div>
                <label>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  required
                  placeholder="Granada Hills"
                />
              </div>

              <div>
                <label>Service</label>
                <select name="service" value={form.service} onChange={onChange}>
                  <option>Residential Window Cleaning</option>
                  <option>Commercial & Storefront Cleaning</option>
                  <option>Solar Panel Cleaning</option>
                  <option>Tint Removal</option>
                  <option>Other / Not sure</option>
                </select>
              </div>

              <div>
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={onChange}
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div>
                <label>Best Time</label>
                <select name="bestTime" value={form.bestTime} onChange={onChange}>
                  <option>Morning (9–12)</option>
                  <option>Afternoon (12–4)</option>
                  <option>Evening (4–7)</option>
                  <option>Anytime</option>
                </select>
              </div>

              <div>
                <label>Preferred Contact</label>
                <select
                  name="preferredContact"
                  value={form.preferredContact}
                  onChange={onChange}
                >
                  <option>Text</option>
                  <option>Call</option>
                  <option>Email</option>
                </select>
              </div>

              <div className="span2">
                <label>Comments</label>
                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={onChange}
                  rows={5}
                  placeholder="Example: 2-story home, heavy water spots, prefer Saturday..."
                />
              </div>
            </div>

            <div className="formBtns">
              <button className="btn btnPrimary" type="submit">
                Send Estimate Request
              </button>
              <a className="btn btnOutline" href={`mailto:${business.email}`}>
                Email Instead
              </a>
            </div>

            <p className="tiny">Demo note: We’ll wire this to your tools after design approval.</p>
          </form>
        </div>
      </Card>

      <div className="sideCol">
        <Card>
          <div className="cardPad">
            <div className="cardTitle">Contact</div>
            <div className="mutedText" style={{ marginTop: 6 }}>
              Phone: <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
              <br />
              Email: <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
            <div className="twoBtns">
              <a className="btn btnPrimary full" href={`tel:${business.phoneTel}`}>
                Call
              </a>
              <a className="btn btnOutline full" href={`sms:${business.phoneTel}`}>
                Text
              </a>
            </div>
          </div>
        </Card>

        <Card>
          <div className="cardPad">
            <div className="cardTitle">Commercial storefronts</div>
            <div className="mutedText" style={{ marginTop: 6 }}>
              Recurring routes and maintenance plans available.
            </div>
            <a
              className="btn btnPrimary full"
              href="#/"
              onClick={() => setTimeout(() => scrollToId("estimate"), 0)}
            >
              Request a Route Quote
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ===== App Entry ===== */

export default function Page() {
  const route = useHashRoute();

  const business = useMemo(
    () => ({
      name: "Magic Glove Window Cleaning",
      phoneDisplay: "(818) 942-4177",
      phoneTel: formatPhoneForTel("8189424177"),
      email: "Armando29gonzalez@gmail.com",
      serviceArea: "Los Angeles & San Bernardino Counties",
    }),
    []
  );

  const servicedZips = useMemo(
    () =>
      new Set([
        "91344","91325","91326","91324","91306","91406","91402",
        "91505","91201","91103","91311","91331","91335",
        "91730","91739","91701","91762","91764","92335","92336","92324",
      ]),
    []
  );

  // Support #/estimate: flip back to home then scroll to estimate
  useEffect(() => {
    if (route === "/estimate") {
      window.location.hash = "#/";
      setTimeout(() => scrollToId("estimate"), 60);
    }
  }, [route]);

  // Service pages
  if (route === "/work/windows") {
    return (
      <ServiceWorkPage
        business={business}
        title="Window Cleaning — See Our Work"
        subtitle="Interior & exterior window cleaning with a premium finish, clear communication, and fair pricing across Los Angeles."
        sliders={[
          { title: "Exterior glass clarity", subtitle: "A clean view makes the whole home feel brighter." },
          { title: "Screens & detailing (optional)", subtitle: "A stronger finish when you want it dialed in." },
        ]}
        recent={[
          { title: "Full exterior wash + detail", area: "Granada Hills" },
          { title: "Interior + exterior (2-story)", area: "Northridge" },
          { title: "Water spot improvement (options)", area: "Porter Ranch" },
        ]}
        seoTitle="Interior & Exterior Window Washing Services"
        seoBlocks={[
          { p: "At Magic Glove Window Cleaning, we provide exterior and interior window cleaning across Los Angeles & surrounding areas. Homeowners choose us because we treat every home with care, communicate clearly, and aim for a finish you can feel proud of." },
          { h: "Why regular window cleaning matters", p: "Over time, dust, grime, and buildup can dull your view and make your home feel less clean overall. Keeping windows maintained helps protect your glass, supports a brighter interior, and can help prevent long-term issues that lead to costly repairs." },
          { h: "Our exterior window cleaning approach", p: "We use safe, professional methods designed for the home. Our goal is a consistent, streak-free finish—then we do a final check to make sure it looks right from the inside too. The difference is in the details." },
          { h: "Our interior window cleaning approach", p: "When we work inside your home, we treat your space with respect. We take care around floors and furniture, work clean, and inspect our results before we leave. If you’re not happy, we’re not done." },
          { h: "How often should windows be cleaned?", p: "Most LA homeowners benefit from cleaning twice a year—spring and fall. Some prefer quarterly for a consistently sharp look, especially in high-dust areas or near busy streets." },
        ]}
      />
    );
  }

  if (route === "/work/storefront") {
    return (
      <ServiceWorkPage
        business={business}
        title="Storefront Cleaning — See Our Work"
        subtitle="Reliable storefront maintenance plans that keep your business looking sharp week after week."
        sliders={[
          { title: "Entry glass & first impression", subtitle: "Customers notice clean glass immediately." },
          { title: "Weekly route finish", subtitle: "Consistency is what makes it feel premium." },
        ]}
        recent={[
          { title: "Weekly storefront maintenance", area: "Reseda" },
          { title: "Route cleanup + detail finish", area: "Van Nuys" },
          { title: "Morning clean before opening", area: "Burbank" },
        ]}
        seoTitle="Storefront Window Cleaning & Maintenance"
        seoBlocks={[
          { p: "For storefronts and small businesses, clean glass is part of your brand. Magic Glove provides dependable routes with clear communication, on-time service, and a finish that matches the quality of your business." },
          { h: "Why storefront cleaning is needed", p: "Foot traffic, dust, fingerprints, and weather can make glass look dull fast. Regular maintenance keeps your storefront inviting, professional, and consistent—especially during peak hours and high-visibility seasons." },
          { h: "Our route options", p: "We offer weekly, bi-weekly, and monthly maintenance schedules. We can plan early-morning service so your business is ready before customers arrive." },
          { h: "A smoother process", p: "Professional invoicing, reminders, and reliable service are the standard. Our goal is to make storefront maintenance easy—so you never have to chase it." },
        ]}
      />
    );
  }

  if (route === "/work/solar") {
    return (
      <ServiceWorkPage
        business={business}
        title="Solar Panel Cleaning — See Our Work"
        subtitle="Safe cleaning methods designed for panels. A clean surface can help panels perform closer to their best."
        sliders={[
          { title: "Dust & buildup removal", subtitle: "A cleaner surface looks better and can help output." },
          { title: "Premium finish check", subtitle: "We aim for a clean, consistent result." },
        ]}
        recent={[
          { title: "Seasonal solar cleaning", area: "Glendale" },
          { title: "Roof panel wash (soft methods)", area: "Pasadena" },
          { title: "Multi-array cleaning", area: "Ontario" },
        ]}
        seoTitle="Solar Panel Cleaning Services"
        seoBlocks={[
          { p: "Solar panels collect dust, pollen, and debris that can reduce how clean they look—and potentially how efficiently they operate. Magic Glove uses careful methods designed for solar surfaces, with attention to safety and detail." },
          { h: "Why solar cleaning matters", p: "Even a light film of dust can build up over time. Many homeowners choose seasonal cleanings—especially before high-sun months—to keep panels looking sharp and performing consistently." },
          { h: "Our approach", p: "We use safe, low-abrasion methods and avoid anything that could damage the surface. We focus on a clean finish and clear communication—so you know exactly what’s happening on your roof." },
          { h: "How often should panels be cleaned?", p: "Many homes benefit from 1–2 cleanings per year, depending on dust levels and surrounding conditions. We can recommend a schedule after your first cleaning." },
        ]}
      />
    );
  }

  if (route === "/work/tint") {
    return (
      <ServiceWorkPage
        business={business}
        title="Tint Removal — See Our Work"
        subtitle="Clean removal with careful adhesive cleanup—so your glass looks clear again."
        sliders={[
          { title: "Tint removal finish", subtitle: "A clear look without haze." },
          { title: "Adhesive cleanup", subtitle: "The detail step that changes everything." },
        ]}
        recent={[
          { title: "Office tint removal + cleanup", area: "San Fernando Valley" },
          { title: "Storefront tint removal", area: "Rialto" },
          { title: "Residential glass tint removal", area: "Rancho Cucamonga" },
        ]}
        seoTitle="Window Tint Removal Services"
        seoBlocks={[
          { p: "Old tint can peel, bubble, and leave glass looking messy. Magic Glove removes tint carefully and focuses on a clean finish—especially during the adhesive cleanup stage." },
          { h: "Why tint removal is needed", p: "Aging tint can become cloudy, cracked, or uneven. Removing it restores clarity and can improve the overall look of your home or storefront." },
          { h: "Our approach", p: "We use appropriate heat/steam methods when needed, remove film carefully, and then focus on adhesive cleanup so the glass looks clean and clear." },
          { h: "What to expect", p: "Every job is different depending on the tint age and adhesive type. We’ll explain options clearly and set expectations upfront—no surprises." },
        ]}
      />
    );
  }

  if (route === "/community") return <CommunityPage business={business} />;

  return <HomePage business={business} servicedZips={servicedZips} />;
}

/* ====== STYLES ====== */
const styles = `
:root{
  --navy:#183A53;
  --navy2:#0f2f45;
  --sage:#93B6A4;
  --sage2:#7FA592;
  --ink:#0b1c2a;
  --muted:#506172;
  --bg:#f7fafb;
  --card:#ffffff;
  --line: rgba(15,47,69,.10);
  --shadow: 0 18px 55px rgba(15,47,69,.10);
  --shadow2: 0 10px 30px rgba(15,47,69,.08);
  --radius: 22px;
  --wrap: 1120px;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  color: var(--ink);
  background:
    radial-gradient(1000px 700px at 10% 0%, rgba(147,182,164,.18), transparent 55%),
    radial-gradient(900px 650px at 85% 10%, rgba(24,58,83,.10), transparent 60%),
    linear-gradient(180deg, #ffffff, var(--bg));
}
a{color:inherit;text-decoration:none}
a:hover{text-decoration:underline}
.page{min-height:100vh}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 18px}

/* Top strip */
.topStrip{
  background: rgba(255,255,255,.78);
  border-bottom:1px solid var(--line);
  backdrop-filter: blur(10px);
}
.topStripInner{
  display:flex;gap:10px;justify-content:space-between;align-items:center;
  padding:10px 0;flex-wrap:wrap;
}
.pills{display:flex;gap:8px;flex-wrap:wrap}
.pill{
  border:1px solid rgba(147,182,164,.35);
  background: rgba(255,255,255,.72);
  padding:6px 10px;border-radius:999px;
  font-size:12px;font-weight:800;color: rgba(15,47,69,.78);
  box-shadow: 0 1px 0 rgba(15,47,69,.06);
}
.topStripRight{display:flex;gap:10px;align-items:center;font-size:13px;flex-wrap:wrap;color: rgba(15,47,69,.75)}
.topDot{color: rgba(15,47,69,.25)}
.topLink{font-weight:700}

/* Nav */
.nav{
  position:sticky;top:0;z-index:50;
  background: rgba(255,255,255,.90);
  border-bottom:1px solid var(--line);
  backdrop-filter: blur(12px);
}
.navInner{
  display:flex;align-items:center;justify-content:space-between;gap:14px;
  padding:14px 0;
}
.brand{display:flex;align-items:center}
.brand:hover{text-decoration:none}
.logoBox{
  width:44px;height:44px;border:1px solid rgba(147,182,164,.45);
  border-radius:16px;
  background:
    radial-gradient(22px 22px at 30% 30%, rgba(147,182,164,.22), transparent 60%),
    rgba(255,255,255,.90);
  overflow:hidden;display:grid;place-items:center;position:relative;
  box-shadow: var(--shadow2);
}
.logoBox img{width:100%;height:100%;object-fit:contain;display:block}
.logoFallback{position:absolute;font-size:12px;font-weight:950;color: rgba(24,58,83,.80)}
.navLinks{display:none;gap:18px;font-size:14px;font-weight:800;color: rgba(15,47,69,.70)}
.navLinks a:hover{text-decoration:none;color: rgba(15,47,69,.92)}
.navCtas{display:flex;gap:10px}

/* Buttons */
.btn{
  display:inline-flex;align-items:center;justify-content:center;
  padding:11px 14px;border-radius:16px;font-size:14px;font-weight:900;
  border:1px solid transparent;
  transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
  cursor:pointer;
}
.btnPrimary{
  background: linear-gradient(180deg, rgba(24,58,83,.98), rgba(15,47,69,.98));
  color: #fff;
  box-shadow: 0 12px 30px rgba(15,47,69,.16);
}
.btnPrimary:hover{transform:translateY(-1px);text-decoration:none}
.btnOutline{
  background: rgba(255,255,255,.85);
  color: rgba(15,47,69,.92);
  border-color: rgba(15,47,69,.16);
  box-shadow: var(--shadow2);
}
.btnOutline:hover{transform:translateY(-1px);text-decoration:none}
.full{width:100%}

/* Type */
.h1{
  margin:0;
  font-family: ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  font-size:48px;line-height:1.06;letter-spacing:-.03em;
  color: rgba(15,47,69,.98);
}
.h2{
  margin:0;
  font-family: ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  font-size:34px;letter-spacing:-.03em;
  color: rgba(15,47,69,.98);
}
.h3{margin:0;font-size:18px;letter-spacing:-.01em;color: rgba(15,47,69,.96)}
.sub{margin-top:6px;color: rgba(80,97,114,.92);font-size:14.5px;max-width:86ch}
.sectionHead{display:grid;gap:6px;margin-bottom:18px}
.sectionHeadCenter{text-align:center;align-items:center}
.mutedText{margin-top:6px;color: rgba(80,97,114,.92);font-size:13.5px}

/* Cards */
.card{
  border:1px solid var(--line);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow2);
}
.cardPad{padding:18px}
.cardTitle{font-weight:950;color: rgba(15,47,69,.96)}

/* Hero */
.hero{position:relative;padding: 34px 0 18px;overflow:hidden}
.heroVideoWrap{
  position:absolute;inset:0;
  background:
    radial-gradient(900px 600px at 15% 15%, rgba(147,182,164,.18), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,.70), rgba(255,255,255,.25));
}
.heroVideo{
  position:absolute;inset:0;
  width:100%;height:100%;
  object-fit:cover;
  opacity:.58;
  filter: saturate(1.10) contrast(1.08);
}
.heroOverlay{
  position:absolute;inset:0;
  background: linear-gradient(180deg, rgba(255,255,255,.64), rgba(255,255,255,.80));
}
.heroInner{position:relative;z-index:1}
.heroTopRow{display:flex;justify-content:space-between;align-items:center;gap:14px;padding-bottom:12px}
.heroBrand{display:flex;align-items:center;gap:12px}
.heroLogoBox{
  width:50px;height:50px;border-radius:18px;
  border:1px solid rgba(147,182,164,.55);
  background: rgba(255,255,255,.96);
  box-shadow: var(--shadow2);
  overflow:hidden;display:grid;place-items:center;position:relative;
}
.heroLogoBox img{width:100%;height:100%;object-fit:contain;display:block}
.heroBrandText{display:grid;gap:4px}
.heroName{font-weight:950;letter-spacing:-.02em;color: rgba(15,47,69,.98)}
.heroTag{font-size:12px;color: rgba(80,97,114,.92);font-weight:700}
.heroPills{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}

.heroContent{margin-top:10px;max-width: 920px;padding:8px 0 4px}
.accent{color: rgba(147,182,164,.95)}
.heroLong{margin-top:14px;font-size:15.8px;line-height:1.7;color: rgba(30,56,74,.88)}
.heroCtas{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}

/* Sections */
.section{padding:56px 0}
.section.alt{
  background: rgba(255,255,255,.72);
  border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);
}

/* Grids */
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.gridForm{margin-top:18px;display:grid;grid-template-columns:1.2fr .8fr;gap:12px}
.sideCol{display:grid;gap:12px}

/* Before/after */
.baCard{overflow:hidden}
.baPad{padding:18px}
.baTop{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}
.baTitle{font-weight:950;color: rgba(15,47,69,.96)}
.baSub{margin-top:6px;color: rgba(80,97,114,.92);font-size:13px}
.baBadges{display:flex;gap:8px}
.baBadge{
  border:1px solid rgba(15,47,69,.14);
  background: rgba(255,255,255,.92);
  padding:6px 10px;border-radius:999px;
  font-size:12px;font-weight:900;color: rgba(15,47,69,.78);
}
.baFrame{
  position:relative;border-radius: var(--radius);
  overflow:hidden;border:1px solid rgba(15,47,69,.12);
  background: rgba(24,58,83,.04);
}
.baLayer{position:absolute;inset:0}
.baCornerTag{
  position:absolute;top:12px;left:12px;
  border:1px solid rgba(15,47,69,.14);
  background: rgba(255,255,255,.92);
  padding:6px 10px;border-radius:999px;
  font-size:12px;font-weight:900;color: rgba(15,47,69,.78);
}
.baDivider{
  position:absolute;top:0;bottom:0;width:2px;
  background: rgba(147,182,164,.95);
  transform: translateX(-1px);
  box-shadow: 0 0 0 3px rgba(147,182,164,.18);
}
.gloveHandle{
  position:absolute;top:50%;left:50%;
  transform: translate(-50%, -50%);
  width:46px;height:46px;border-radius:999px;
  display:grid;place-items:center;
  background: rgba(255,255,255,.92);
  border:1px solid rgba(15,47,69,.18);
  box-shadow: var(--shadow2);
  font-size:18px;
}
.baRange{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor: ew-resize}
.baHint{margin-top:10px;color: rgba(80,97,114,.90);font-size:12.5px}

/* Services head + zip */
.servicesHeadRow{display:grid;grid-template-columns: 1fr 1fr;gap:14px;align-items:start}
.ctaRow{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.zipBox{
  margin-top:12px;border:1px solid rgba(15,47,69,.12);
  background: rgba(255,255,255,.90);
  border-radius:18px;padding:12px;box-shadow: var(--shadow2);
}
.zipLabel{font-size:12px;font-weight:900;color: rgba(15,47,69,.80)}
.zipRow{display:grid;grid-template-columns: 150px 1fr;gap:10px;align-items:center;margin-top:8px}
.zipInput{
  width:100%;padding:10px 12px;border-radius:14px;border:1px solid rgba(15,47,69,.16);
  outline:none;font-weight:800;
}
.zipInput:focus{box-shadow: 0 0 0 4px rgba(147,182,164,.25); border-color: rgba(147,182,164,.75)}
.zipStatus{
  font-size:12.5px;font-weight:900;padding:10px 12px;border-radius:14px;
  background: rgba(24,58,83,.04);border:1px solid rgba(15,47,69,.10);color: rgba(15,47,69,.76);
}
.zipOk{background: rgba(147,182,164,.20); border-color: rgba(147,182,164,.45)}
.zipNo{background: rgba(24,58,83,.05)}
.zipHint{margin-top:8px;font-size:12px;color: rgba(80,97,114,.90)}

/* Service card */
.cardHeaderRow{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.check{
  width:38px;height:38px;border-radius:16px;display:grid;place-items:center;
  background: linear-gradient(180deg, rgba(147,182,164,.95), rgba(127,165,146,.95));
  color: rgba(15,47,69,.92);font-weight:950;
  box-shadow: 0 12px 26px rgba(147,182,164,.18);
}
.bullets{margin:12px 0 0;padding-left:16px;color: rgba(80,97,114,.96);font-size:13.5px}
.cardBtns{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}

/* Testimonials */
.testWrap{display:grid;gap:12px;justify-items:center}
.testRail{width:min(920px, 100%)}
.testCard{border-radius: 22px}
.testInner{padding:22px}
.testSourceRow{display:flex;justify-content:space-between;align-items:center;gap:10px}
.testSource{
  font-weight:950;color: rgba(15,47,69,.92);
  border:1px solid rgba(147,182,164,.55);
  background: rgba(147,182,164,.12);
  padding:6px 10px;border-radius:999px;
}
.testStars{color: rgba(15,47,69,.80); letter-spacing:.10em; font-weight:950}
.testQuote{
  margin-top:14px;font-size:18px;line-height:1.5;color: rgba(15,47,69,.92);
  font-family: ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
}
.testMeta{margin-top:14px;color: rgba(80,97,114,.95);font-weight:850}
.testDot{margin:0 8px;color: rgba(15,47,69,.28)}
.testCtaRow{margin-top:16px}
.testDots{display:flex;gap:8px}
.dotBtn{width:10px;height:10px;border-radius:999px;border:none;background: rgba(15,47,69,.18); cursor:pointer}
.dotBtnOn{background: rgba(147,182,164,.95)}

/* How it works */
.howGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px}
.howStep{
  text-align:left;border:1px solid var(--line);background: var(--card);
  border-radius: var(--radius);padding:18px;box-shadow: var(--shadow2);
  cursor:pointer;transition: transform .12s ease, box-shadow .12s ease;
}
.howStep:hover{transform: translateY(-2px); box-shadow: var(--shadow)}
.howNum{
  width:34px;height:34px;border-radius:14px;display:grid;place-items:center;
  background: rgba(147,182,164,.18);border:1px solid rgba(147,182,164,.45);
  font-weight:950;color: rgba(15,47,69,.92);
}
.howTitle{margin-top:10px;font-weight:950;color: rgba(15,47,69,.95)}
.howText{margin-top:6px;color: rgba(80,97,114,.92);font-size:13.5px}

/* Forms */
.formGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.formGrid label{display:block;font-size:13px;font-weight:900;color: rgba(15,47,69,.88)}
.formGrid input,.formGrid select,.formGrid textarea{
  margin-top:6px;width:100%;
  border:1px solid rgba(15,47,69,.16);
  border-radius:16px;padding:11px 12px;font-size:14px;outline:none;
  background: rgba(255,255,255,.98);
}
.formGrid input:focus,.formGrid select:focus,.formGrid textarea:focus{
  border-color: rgba(147,182,164,.75);
  box-shadow: 0 0 0 4px rgba(147,182,164,.25);
}
.span2{grid-column:span 2}
.formBtns{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}
.twoBtns{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.tiny{margin-top:12px;color: rgba(80,97,114,.92);font-size:12px}

/* Recent cleans */
.recentGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.recentCard{overflow:hidden}
.recentTop{padding:14px 16px;border-bottom:1px solid var(--line)}
.recentTitle{font-weight:950;color: rgba(15,47,69,.95)}
.recentArea{margin-top:4px;color: rgba(80,97,114,.92);font-weight:800;font-size:12.5px}
.recentImgs{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px}
.recentImg{height:120px;border-radius:18px;border:1px solid rgba(15,47,69,.12);position:relative;overflow:hidden}
.recentTag{
  position:absolute;top:10px;left:10px;
  border:1px solid rgba(15,47,69,.14);
  background: rgba(255,255,255,.92);
  padding:6px 10px;border-radius:999px;
  font-size:12px;font-weight:900;color: rgba(15,47,69,.78);
}

/* Work pages */
.workHero{position:relative;padding: 44px 0 24px; overflow:hidden}
.workHeroBg{
  position:absolute; inset:0;
  background:
    radial-gradient(900px 560px at 20% 10%, rgba(147,182,164,.22), transparent 60%),
    radial-gradient(900px 560px at 85% 20%, rgba(24,58,83,.12), transparent 62%),
    linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.60));
}
.workHeroInner{position:relative}
.workCrumb{color: rgba(80,97,114,.92);font-weight:850;font-size:13px}
.crumbDot{margin:0 8px;color: rgba(15,47,69,.25)}
.workTitle{margin-top:10px}
.workSub{margin-top:12px;max-width: 80ch;color: rgba(30,56,74,.86);line-height:1.65}
.workBtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}

/* SEO pad */
.seoPad{padding: 22px}
.seoTitle{
  font-weight:950;
  font-family: ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  font-size: 22px;
  color: rgba(15,47,69,.98);
}
.seoBlock{margin-top:14px}
.seoH{font-weight:950;color: rgba(15,47,69,.96);margin-bottom:6px}
.seoP{color: rgba(80,97,114,.95);line-height:1.7}
.seoCta{margin-top:16px;padding-top:14px;border-top:1px solid var(--line)}
.seoCtaLine{font-weight:900;color: rgba(15,47,69,.92);line-height:1.5}
.seoCtaBtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}

/* Community page */
.communityHero{padding: 46px 0 56px}
.communityTop{max-width: 920px}
.communityTitle{margin-bottom: 10px}
.communitySub{color: rgba(80,97,114,.92);font-size:15.5px;line-height:1.6;margin-top:10px}
.communityBtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
.longForm .lfH{font-weight:950;font-size:18px;color: rgba(15,47,69,.98)}
.longForm .lfP{margin-top:8px;color: rgba(80,97,114,.92);line-height:1.6}
.longForm .lfBlock{margin-top:16px}
.longForm .lfTitle{font-weight:950;color: rgba(15,47,69,.98);margin-bottom:6px}
.longForm .lfText{color: rgba(80,97,114,.95);line-height:1.65;margin-top:8px}
.lfList{margin:10px 0 0;padding-left:18px;color: rgba(80,97,114,.95);line-height:1.65}
.lfBullets{margin:10px 0 0;padding-left:18px;color: rgba(80,97,114,.95);line-height:1.65}
.lfCta{margin-top:18px;padding-top:14px;border-top:1px solid var(--line)}
.lfCtaLine{font-weight:900;color: rgba(15,47,69,.92);line-height:1.5}
.lfCtaBtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}

/* Footer */
.footer{
  background: rgba(255,255,255,.85);
  border-top:1px solid var(--line);
  padding: 44px 0;
}
.footerInner{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:18px}
.footBrand{
  font-weight:950;
  font-family: ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  font-size: 18px;
  color: rgba(15,47,69,.98);
}
.footSub{margin-top:6px;color: rgba(80,97,114,.92);font-weight:800;font-size:13px}
.footContact{margin-top:12px;color: rgba(80,97,114,.92);font-size:13px;line-height:1.6}
.footContact a{font-weight:900}
.footTitle{font-weight:950;color: rgba(15,47,69,.98)}
.footLinks{display:grid;gap:8px;margin-top:10px;color: rgba(15,47,69,.78);font-weight:900}
.footText{margin-top:10px;color: rgba(80,97,114,.92);line-height:1.6;font-size:13px}
.footBtnRow{margin-top:12px}
.footBottom{margin-top:20px;color: rgba(80,97,114,.90);font-size:12px}

/* Mobile */
.mobileCta{
  display:none;
  position:fixed;bottom:12px;left:0;right:0;z-index:60;
  padding:0 14px;gap:10px;
}
.mobileSpacer{display:none;height:92px}

/* Responsive */
@media (min-width: 980px){ .navLinks{display:flex} }
@media (max-width: 1000px){
  .servicesHeadRow{grid-template-columns:1fr}
  .ctaRow{justify-content:flex-start}
  .recentGrid{grid-template-columns:1fr}
}
@media (max-width: 900px){
  .grid2,.gridForm,.howGrid,.footerInner{grid-template-columns:1fr}
  .heroTopRow{flex-direction:column;align-items:flex-start}
  .heroPills{justify-content:flex-start}
  .h1{font-size:40px}
}
@media (max-width: 600px){
  .mobileCta{display:grid;grid-template-columns:1fr 1fr}
  .mobileSpacer{display:block}
}
`;
