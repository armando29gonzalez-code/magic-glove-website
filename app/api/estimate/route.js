export async function POST(req) {
  try {
    const body = await req.json();

    // Basic validation
    const fullName = (body.fullName || "").trim();
    const phone = (body.phone || "").trim();
    const city = (body.city || "").trim();

    if (!fullName || !phone || !city) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Honeypot anti-spam (frontend should send hp="")
    if (body.hp && String(body.hp).trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, error: "Missing RESEND_API_KEY." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const toEmail = process.env.ESTIMATE_TO_EMAIL || "info@magicglovecleaning.com";
    const fromEmail = process.env.ESTIMATE_FROM_EMAIL || "onboarding@resend.dev";

    const preferredContact = body.preferredContact || "";
    const bestTime = body.bestTime || "";
    const service = body.service || "";
    const propertyType = body.propertyType || "";
    const referralSource = body.referralSource || "";
    const email = (body.email || "").trim();
    const comments = body.comments || "";

    const subject = `New Estimate Request — ${fullName} (${city})`;

    const text = `
New Estimate Request

Name: ${fullName}
Phone: ${phone}
Email: ${email || "(not provided)"}
City: ${city}

Service: ${service}
Property Type: ${propertyType}
Preferred Contact: ${preferredContact}
Best Time: ${bestTime}
How they heard about you: ${referralSource || "(not selected)"}

Comments:
${comments || "(none)"}
`.trim();

    const payload = {
      from: `Magic Glove Estimates <${fromEmail}>`,
      to: [toEmail],
      subject,
      text,
      ...(email ? { reply_to: email } : {}),
    };

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      console.error("Resend API error:", resp.status, errText);
      return new Response(JSON.stringify({ ok: false, error: "Email failed to send." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
