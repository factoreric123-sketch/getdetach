// Sends the internal "New Order Received" notification directly via Resend,
// bypassing the transactional queue so no unsubscribe footer is appended.
import * as React from "npm:react@18.3.1";
import { renderAsync } from "npm:@react-email/components@0.0.22";
import { template as internalTemplate } from "../_shared/transactional-email-templates/order-notification-internal.tsx";

interface Params {
  customerName: string;
  customerEmail: string;
  quantity: number;
  total: string;
  addressLines?: string;
}

export async function sendInternalOrderNotification(params: Params) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY missing — cannot send internal notification");
    return;
  }

  try {
    const html = await renderAsync(
      React.createElement(internalTemplate.component, params),
    );
    const text = await renderAsync(
      React.createElement(internalTemplate.component, params),
      { plainText: true },
    );

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Detach <noreply@notify.getdetach.app>",
        to: ["getdetach@gmail.com"],
        subject: "New Detach Order",
        html,
        text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Internal notification Resend error:", res.status, errBody);
    }
  } catch (err) {
    console.error("Internal notification send failed:", err);
  }
}
