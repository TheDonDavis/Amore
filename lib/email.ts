import type { OrderPayload } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

function formatTimestamp(): string {
  return new Date().toLocaleString("en-JM", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Jamaica",
  });
}

export function buildOrderEmailHtml(order: OrderPayload): string {
  const { customer, items, total } = order;
  const timestamp = formatTimestamp();

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333;">
          ${item.name} <span style="color: #888;">(${item.size} · ${item.concentration})</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: center; color: #666;">${item.quantity}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right; color: #333;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background: #f7f5f2; font-family: Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f7f5f2; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 2px;">
          <tr>
            <td style="padding: 40px 40px 24px; border-bottom: 1px solid #eee;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 400; color: #1a1a1a; letter-spacing: 0.05em;">Order Received</h1>
              <p style="margin: 8px 0 0; font-size: 13px; color: #888; font-family: -apple-system, sans-serif;">${timestamp}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 14px; font-weight: 400; color: #888; text-transform: uppercase; letter-spacing: 0.1em; font-family: -apple-system, sans-serif;">Customer</h2>
              <table width="100%" style="font-family: -apple-system, sans-serif; font-size: 14px; color: #333;">
                <tr><td style="padding: 4px 0; color: #888; width: 100px;">Name:</td><td>${customer.fullName}</td></tr>
                <tr><td style="padding: 4px 0; color: #888;">Email:</td><td>${customer.email}</td></tr>
                <tr><td style="padding: 4px 0; color: #888;">Phone:</td><td>${customer.phone}</td></tr>
                <tr><td style="padding: 4px 0; color: #888;">Address:</td><td>${customer.address}</td></tr>
                <tr><td style="padding: 4px 0; color: #888;">Parish:</td><td>${customer.parish}</td></tr>
                ${customer.notes ? `<tr><td style="padding: 4px 0; color: #888; vertical-align: top;">Notes:</td><td>${customer.notes}</td></tr>` : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 32px;">
              <h2 style="margin: 0 0 16px; font-size: 14px; font-weight: 400; color: #888; text-transform: uppercase; letter-spacing: 0.1em; font-family: -apple-system, sans-serif;">Order</h2>
              <table width="100%" style="font-family: -apple-system, sans-serif; font-size: 14px;">
                <thead>
                  <tr>
                    <th style="text-align: left; padding-bottom: 8px; color: #888; font-weight: 400; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Product</th>
                    <th style="text-align: center; padding-bottom: 8px; color: #888; font-weight: 400; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Qty</th>
                    <th style="text-align: right; padding-bottom: 8px; color: #888; font-weight: 400; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Price</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px; border-top: 1px solid #eee;">
              <table width="100%">
                <tr>
                  <td style="font-family: -apple-system, sans-serif; font-size: 16px; color: #1a1a1a; letter-spacing: 0.05em;">Total</td>
                  <td style="font-family: -apple-system, sans-serif; font-size: 16px; color: #1a1a1a; text-align: right; letter-spacing: 0.05em;">${formatPrice(total)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildOrderEmailText(order: OrderPayload): string {
  const { customer, items, total } = order;
  const timestamp = formatTimestamp();

  const itemLines = items
    .map(
      (item) =>
        `${item.name} (${item.size}) x ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n");

  return `Order Received
${timestamp}

Customer:
Name: ${customer.fullName}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}
Parish: ${customer.parish}
${customer.notes ? `Notes: ${customer.notes}\n` : ""}
Order:

${itemLines}

Total: ${formatPrice(total)}`;
}

export async function sendOrderEmail(order: OrderPayload): Promise<void> {
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "orders@elan-decants.com";

  if (!ownerEmail) {
    throw new Error("OWNER_EMAIL environment variable is not set");
  }

  const subject = `New Order — ${order.customer.fullName}`;
  const html = buildOrderEmailHtml(order);
  const text = buildOrderEmailText(order);

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject,
      html,
      text,
    });

    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }
    return;
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: fromEmail,
      to: ownerEmail,
      subject,
      html,
      text,
    });
    return;
  }

  throw new Error(
    "No email provider configured. Set RESEND_API_KEY or SMTP credentials."
  );
}
