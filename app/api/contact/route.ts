// app/api/contact/route.ts
// Next.js App Router API route — handles contact form submissions
// Sends email via Resend

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY); // Moved inside POST handler to avoid crash if key is missing

// ─── Helpers ─────────────────────────────────────────────────────────────────
function generateArchiveRef(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `RV-CORR-${year}-${rand}`;
}

// ─── POST — New submission ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact/route] Missing RESEND_API_KEY in environment.");
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY to .env.local." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { filedBy, returnAddress, statement } = body;

    // Validate
    if (!filedBy?.trim() || !returnAddress?.trim() || !statement?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(returnAddress.trim())) {
      return NextResponse.json(
        { error: "Return address must be a valid email." },
        { status: 400 }
      );
    }

    const archiveRef = generateArchiveRef();
    const timestamp = new Date().toISOString();

    // ── Send email notification via Resend ─────────────────────────────────
    // NOTE: In production, send from a verified domain (e.g., hello@yourdomain.com)
    const { data, error } = await resend.emails.send({
      from: "Reverie Portfolio <onboarding@resend.dev>",
      to: "greshakhambhaita@gmail.com",
      replyTo: returnAddress.trim(),
      subject: `New Correspondence — ${archiveRef}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #111; border-bottom: 2px solid #f4f4f4; padding-bottom: 10px; margin-top: 0;">New submission received</h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;"><strong>From:</strong></td>
              <td style="padding: 8px 0;">${filedBy.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${returnAddress.trim()}" style="color: #0070f3; text-decoration: none;">${returnAddress.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Archive Ref:</strong></td>
              <td style="padding: 8px 0;"><code style="background: #f4f4f4; padding: 2px 4px; border-radius: 4px;">${archiveRef}</code></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Timestamp:</strong></td>
              <td style="padding: 8px 0;">${timestamp}</td>
            </tr>
          </table>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #ddd;">
            <p style="margin: 0; white-space: pre-wrap; color: #444;">${statement.trim()}</p>
          </div>

          <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact/route] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Check server logs." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        archiveRef: archiveRef,
        message: "Correspondence sent successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact/route] POST error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Correspondence archive is handled via email." }, { status: 200 });
}