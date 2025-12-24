import React from "react";

const LOGO_SRC = "/magic-glove-logo.jpg"; // put your logo in /public with this name

const business = {
  name: "Magic Glove Window Cleaning",
  phoneDisplay: "(818) 942-4177",
  phoneTel: "+18189424177",
  email: "Armando29gonzalez@gmail.com",
  area: "Los Angeles & San Bernardino Counties"
};

const Card = ({ children }) => (
  <div className="card">{children}</div>
);

export default function Page() {
  return (
    <main>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <div className="pills">
            <span className="pill">Free Estimates</span>
            <span className="pill">{business.area}</span>
          </div>
          <div className="topbar-right">
            <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
            <span className="dot">•</span>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="brand">
            <div className="logoBox">
              {/* logo falls back to MG if image missing */}
              <img
                src={LOGO_SRC}
                alt="Magic Glove logo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="logoFallback">MG</span>
            </div>
            <div>
              <div className="brandName">{business.name}</div>
              <div className="brandSub">
                Window Cleaning • Solar • Tint Removal • Commercial
              </div>
            </div>
          </div>

          <div className="navLinks">
            <a href="#services">Services</a>
            <a href="#booking">Book Online</a>
            <a href="#estimate">Free Estimate</a>
            <a href="#areas">Service Area</a>
          </div>

          <div className="navCtas">
            <a className="btnPrimary" href="#estimate">Get Free Estimate</a>
            <a className="btnOutline" href="#booking">Book Online</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="wrap heroGrid">
          <div>
            <div className="pills heroPills">
              <span className="pill">Residential + Commercial</span>
              <span className="pill">Bold • Humble • Professional</span>
            </div>
            <h1>
              Crystal-clear glass for homes and storefronts—
              <span className="muted"> without the hassle.</span>
            </h1>
            <p className="lead">
              Window cleaning, tint removal, and solar panel cleaning with careful work and clean results.
              Get a fast quote, choose the best time to contact, and we’ll take it from there.
            </p>
            <div className="heroBtns">
              <a className="btnPrimary" href="#estimate">Start a Free Estimate</a>
              <a className="btnOutline" href={`tel:${business.phoneTel}`}>
                Call Now: {business.phoneDisplay}
              </a>
            </div>

            <div className="heroCards">
              <Card>
                <div className="cardTitle">Reliable & Respectful</div>
                <div className="cardText">On time, clear communication, clean work.</div>
              </Card>
              <Card>
                <div className="cardTitle">Quality First</div>
                <div className="cardText">Detail-focused results you’ll notice.</div>
              </Card>
              <Card>
                <div className="cardTitle">Recurring Plans</div>
                <div className="cardText">Storefront maintenance made easy.</div>
              </Card>
            </div>
          </div>

          <Card>
            <div className="heroImage">
              <div className="heroImageNote">
                Demo placeholder image<br />
                Replace with before/after, crew photo, or storefront shot.
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="services" className="section">
        <div className="wrap">
          <h2>Services</h2>
          <p className="sub">
            Residential and commercial options. Clear communication, clean results, and a process that respects your time.
          </p>

          <div className="grid2">
            {[
              {
                title: "Residential Window Cleaning",
                desc: "Streak-free glass, frames, and screens (as needed).",
                bullets: ["Interior & exterior options", "Screen detailing (optional)", "Hard-water spot options"]
              },
              {
                title: "Solar Panel Cleaning",
                desc: "Safe methods designed for panels.",
                bullets: ["Soft-brush + purified water", "Seasonal maintenance", "Before/after photos (optional)"]
              },
              {
                title: "Tint Removal",
                desc: "Clean removal for homes, storefronts, and office glass.",
                bullets: ["Heat/steam method when appropriate", "Adhesive cleanup", "Glass-safe finishing"]
              },
              {
                title: "Commercial Storefront & Maintenance",
                desc: "Recurring storefront cleanings that keep your business looking sharp.",
                bullets: ["Weekly/bi-weekly/monthly plans", "Early-morning scheduling", "Professional invoice + reminders"]
              }
            ].map((s) => (
              <Card key={s.title}>
                <div className="cardPad">
                  <div className="cardHeaderRow">
                    <div>
                      <h3>{s.title}</h3>
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
                    <a className="btnPrimary" href="#estimate">Get Estimate</a>
                    <a className="btnOutline" href="#booking">Book Online</a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="section alt">
        <div className="wrap">
          <h2>Book Online</h2>
          <p className="sub">
            Demo booking area. We can embed Calendly, Jobber, Housecall Pro, or another scheduler.
          </p>

          <div className="grid3">
            <Card>
              <div className="cardPad">
                <div className="cardTitle">Booking Widget (Placeholder)</div>
                <div className="mutedText">
                  Replace with your scheduler embed or link.
                </div>
                <div className="dashedBox">
                  Calendly/Acuity/Jobber/Housecall Pro embed goes here.
                </div>
              </div>
            </Card>

            <Card>
              <div className="cardPad">
                <div className="cardTitle">Prefer a quick quote first?</div>
                <div className="mutedText">
                  Use the estimate form and tell us the best time to call/text.
                </div>
                <a className="btnPrimary full" href="#estimate">Start Estimate</a>
                <div className="smallMuted">
                  Or call/text: <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
                </div>
              </div>
            </Card>

            <Card>
              <div className="cardPad">
                <div className="cardTitle">Fast response (recommended)</div>
                <ul className="bullets">
                  <li>Auto-text confirmations</li>
                  <li>Photo request for accurate quote</li>
                  <li>Lead saved into a simple pipeline</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="estimate" className="section">
        <div className="wrap">
          <h2>Get a Free Estimate</h2>
          <p className="sub">
            Tell us what you need, add details, and choose your best time to call/text.
          </p>

          <div className="gridForm">
            <Card>
              <div className="cardPad">
                <form onSubmit={(e) => { e.preventDefault(); alert("Demo form submitted! Next step: connect to email/SMS/CRM."); }}>
                  <div className="formGrid">
                    <div>
                      <label>Full Name</label>
                      <input required placeholder="Your name" />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input required placeholder="(818) 555-1234" />
                    </div>
                    <div>
                      <label>Email (optional)</label>
                      <input type="email" placeholder="name@email.com" />
                    </div>
                    <div>
                      <label>City</label>
                      <input required placeholder="Granada Hills" />
                    </div>
                    <div className="span2">
                      <label>Address (optional)</label>
                      <input placeholder="Street address (optional)" />
                    </div>

                    <div>
                      <label>Service</label>
                      <select defaultValue="Window Cleaning">
                        <option>Window Cleaning</option>
                        <option>Solar Panel Cleaning</option>
                        <option>Tint Removal</option>
                        <option>Commercial Storefront</option>
                        <option>Other / Not sure</option>
                      </select>
                    </div>

                    <div>
                      <label>Property Type</label>
                      <select defaultValue="Residential">
                        <option>Residential</option>
                        <option>Commercial</option>
                      </select>
                    </div>

                    <div>
                      <label>Best Time to Call/Text</label>
                      <select defaultValue="Morning (9–12)">
                        <option>Morning (9–12)</option>
                        <option>Afternoon (12–4)</option>
                        <option>Evening (4–7)</option>
                        <option>Anytime</option>
                      </select>
                    </div>

                    <div>
                      <label>Preferred Contact</label>
                      <select defaultValue="Text">
                        <option>Text</option>
                        <option>Call</option>
                        <option>Email</option>
                      </select>
                    </div>

                    <div className="span2">
                      <label>Comments / Extra Details</label>
                      <textarea
                        rows={5}
                        placeholder="Example: 2-story home, dog in backyard, heavy water spots, need tint removed on 3 panels..."
                      />
                    </div>
                  </div>

                  <div className="formBtns">
                    <button className="btnPrimary" type="submit">Send My Estimate Request</button>
                    <a className="btnOutline" href={`mailto:${business.email}`}>Email Instead</a>
                  </div>

                  <p className="tiny">
                    Demo note: This form needs a real connection (email + SMS + CRM). We can wire it up after launch.
                  </p>
                </form>
              </div>
            </Card>

            <div className="sideCol">
              <Card>
                <div className="cardPad">
                  <div className="cardTitle">Contact</div>
                  <div className="mutedText">
                    Phone: <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a><br />
                    Email: <a href={`mailto:${business.email}`}>{business.email}</a>
                  </div>
                  <div className="twoBtns">
                    <a className="btnPrimary full" href={`tel:${business.phoneTel}`}>Call</a>
                    <a className="btnOutline full" href={`sms:${business.phoneTel}`}>Text</a>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="cardPad">
                  <div className="cardTitle">Commercial storefronts</div>
                  <div className="mutedText">
                    Recurring routes and maintenance plans available.
                  </div>
                  <a className="btnPrimary full" href="#estimate">Request a Route Quote</a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="areas" className="section alt">
        <div className="wrap">
          <h2>Service Area</h2>
          <p className="sub">
            We serve Los Angeles & San Bernardino Counties. (We can add city-specific pages later for SEO.)
          </p>

          <Card>
            <div className="cardPad">
              <div className="chips">
                {[
                  "Granada Hills","Northridge","Porter Ranch","Chatsworth","Reseda","Van Nuys",
                  "Burbank","Glendale","Pasadena","San Fernando Valley",
                  "San Bernardino","Rancho Cucamonga","Ontario","Fontana","Rialto","Redlands"
                ].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footGrid">
          <div>
            <div className="footTitle">{business.name}</div>
            <div className="mutedText">
              Window Cleaning • Solar Panel Cleaning • Tint Removal • Commercial Storefront
            </div>
            <div className="mutedText" style={{ marginTop: 10 }}>
              Call/Text: <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a><br />
              Email: <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>

          <div>
            <div className="footTitle">Quick Links</div>
            <div className="footLinks">
              <a href="#services">Services</a>
              <a href="#booking">Book Online</a>
              <a href="#estimate">Free Estimate</a>
              <a href="#areas">Service Area</a>
            </div>
          </div>

          <div>
            <div className="footTitle">Next upgrades</div>
            <div className="mutedText">
              • Connect form to email + SMS + CRM<br />
              • Google Reviews + Local SEO pages<br />
              • Before/after gallery + tracking
            </div>
          </div>
        </div>
        <div className="wrap tiny" style={{ marginTop: 24 }}>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>
      </footer>

      <div className="mobileCta">
        <a className="btnPrimary full" href="#estimate">Free Estimate</a>
        <a className="btnOutline full" href={`tel:${business.phoneTel}`}>Call</a>
      </div>
    </main>
  );
}
