import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const company = data.company && data.company.length > 0 ? data.company : null;

    const { error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        company,
        message: data.message,
      });

    if (dbError) {
      console.error("contact_submissions insert failed:", dbError);
      throw new Error("Could not save your message. Please try again.");
    }

    // Fire-and-log email notification. Failure should not block the user.
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const html = `
          <h2>New CognoSales contact submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company ?? "—")}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
        `;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: "CognoSales Contact <onboarding@resend.dev>",
            to: ["hello@cognosales.com"],
            reply_to: data.email,
            subject: `New CognoSales contact: ${data.name}`,
            html,
          }),
        });

        if (!res.ok) {
          const body = await res.text();
          console.error("Resend send failed:", res.status, body);
        }
      } catch (err) {
        console.error("Resend send threw:", err);
      }
    } else {
      console.warn("RESEND_API_KEY not set — skipping notification email.");
    }

    return { ok: true };
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
