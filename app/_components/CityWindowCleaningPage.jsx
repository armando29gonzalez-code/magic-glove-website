export default function CityWindowCleaningPage({
  city,
  areaDescription,
  nearbyAreas,
  localAngle,
}) {
  const phoneHref = "tel:+818-942-4177";
  const emailHref = "mailto:info@magicglovecleaning.com";

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
          <a
            href={phoneHref}
            style={{
              background: "#111827",
              color: "#ffffff",
              padding: "14px 24px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Call Now
          </a>

          <a
            href="#quote"
            style={{
              border: "2px solid #111827",
              color: "#111827",
              padding: "14px 24px",
              borderRadius: "999px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Get Free Quote
          </a>
        </div>
      </section>

      <section style={{ background: "#f3f4f6", padding: "28px 24px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          <div>Free Quotes</div>
          <div>Screens, Tracks & Sills</div>
          <div>Interior & Exterior</div>
          <div>Hard Water Add-Ons</div>
          <div>Solar Panel Add-Ons</div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "34px", marginBottom: "16px" }}>
          See the difference a detailed window cleaning makes
        </h2>

        <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "800px", color: "#374151" }}>
          {localAngle} Dust, hard water spots, bug buildup, dirty tracks, and cloudy glass
          can make a home feel darker. Magic Glove helps bring back a cleaner, brighter look
          with detailed glass, screen, track, and sill cleaning.
        </p>

        <div
          style={{
            display: "grid",
            gap: "18px",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginTop: "32px",
          }}
        >
          <div style={{ background: "#f3f4f6", borderRadius: "18px", padding: "40px", textAlign: "center" }}>
            Before/after photo here
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: "18px", padding: "40px", textAlign: "center" }}>
            Track cleaning photo here
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: "18px", padding: "40px", textAlign: "center" }}>
            Finished result photo here
          </div>
        </div>
      </section>

      <section style={{ background: "#f9fafb", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "34px", marginBottom: "24px" }}>
            What’s included in a full-service window cleaning?
          </h2>

          <ul style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
            <li>Exterior glass cleaning</li>
            <li>Interior glass cleaning</li>
            <li>Screen cleaning or wipe-down</li>
            <li>Track and sill cleaning</li>
            <li>Detail work around edges and corners</li>
            <li>Hard water spot inspection</li>
            <li>Final walkthrough/check</li>
          </ul>

          <p style={{ fontSize: "18px", fontWeight: "700", marginTop: "24px" }}>
            Need something simpler? Ask about exterior-only cleaning options.
          </p>
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
          Many customers bundle window cleaning with solar panel cleaning, hard water removal,
          or track detailing for a better overall result.
        </p>
      </section>

      <section style={{ background: "#f9fafb", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "34px", marginBottom: "32px" }}>How to get a quote</h2>

          <div
            style={{
              display: "grid",
              gap: "24px",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            <div>
              <h3>1. Send a few photos</h3>
              <p>Text us photos of the front, back, and any problem windows.</p>
            </div>

            <div>
              <h3>2. Get a clear quote</h3>
              <p>We’ll price it based on size, condition, stories, screens, tracks, and add-ons.</p>
            </div>

            <div>
              <h3>3. Book your clean</h3>
              <p>Pick a day and time that works.</p>
            </div>

            <div>
              <h3>4. Enjoy brighter windows</h3>
              <p>We clean, check the details, and make sure everything looks right.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "34px", marginBottom: "16px" }}>
          Window cleaning service areas near {city}
        </h2>

        <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "850px", color: "#374151" }}>
          Magic Glove Window Cleaning serves {city} and nearby areas including {nearbyAreas}.
        </p>
      </section>

      <section id="quote" style={{ background: "#111827", color: "#ffffff", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "40px", marginBottom: "16px" }}>
            Ready for cleaner, brighter windows?
          </h2>

          <p style={{ fontSize: "20px", color: "#e5e7eb" }}>
            Get $75 off your first full-service window cleaning in {city}.
          </p>

          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
            <a
              href={phoneHref}
              style={{
                background: "#ffffff",
                color: "#111827",
                padding: "14px 24px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Call Now
            </a>

            <a
              href={emailHref}
              style={{
                border: "2px solid #ffffff",
                color: "#ffffff",
                padding: "14px 24px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
