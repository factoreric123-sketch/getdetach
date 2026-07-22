import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_product_info",
  title: "Get product info",
  description:
    "Return details about the Detach card and companion iOS app: price, shipping, requirements, and purchase / App Store links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Detach",
      tagline: "A physical card that helps you take breaks from your phone.",
      price_usd: 9.99,
      shipping: "Free worldwide shipping.",
      requirements: "Requires iOS 17 or later. iPhone only.",
      shop_url: "https://getdetach.app/shop",
      app_store_url:
        "https://apps.apple.com/us/app/detach-screen-break/id6759267252",
      website: "https://getdetach.app",
      support_email: "getdetach@gmail.com",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
