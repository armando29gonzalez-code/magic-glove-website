import { Resend } from "resend";

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

    // Optional: simple honeypot anti-spam (frontend will send hp="")
    if (body.hp && String(body.hp).trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const toEmail = process.env.ESTIMATE_TO_EMAIL || "info@magicglovecleaning.com";

    // IMPORTANT:
    // - If your domain isn't verified in Resend yet, use "onboarding@resend.dev" as FROM.
    // - Once verified, switch to something like "estimates@magicglovecleaning.com".
    const fromEmail =
      process.env.ESTIMATE_FROM_EMAIL || "onboarding@resend.dev";

    const subject = `New Estimate Request — ${fullName} (${city})`;

    const preferredContact = body.preferredContact || "";
    const bestTime = body.bestTime || "";
    const service = body.service || "";
    const propertyType = body.propertyType || "";
    const referralSource = body.referralSource || "";
    const email = (body.email || "").trim();
    const comments = body.comments || "";

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

    const { error } = await resend.emails.send({
      from: `Magic Glove Estimates <${fromEmail}>`,
      to: [toEmail],
      subject,
      text,
      // If customer typed an email, make Reply-To their email so you can reply fast
      replyTo: email ? email : undefined,
    });

    if (error) {
      console.error("Resend error:", error);
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
