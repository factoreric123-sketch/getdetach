import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const HOST = "getdetach.app";
const KEY = "7f3a8b2c94d6425e9a1f6d3b8e2c5a91";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const DEFAULT_URLS = [
  "/",
  "/shop",
  "/detach-app",
  "/detach-app-blocker-facts",
  "/reviews",
  "/blog",
  "/life-in-dots",
];

function parseJwtClaims(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1]
      .replaceAll("-", "+")
      .replaceAll("_", "/")
      .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
    return JSON.parse(atob(payload)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

// Only server-to-server callers holding the service_role key may submit URLs.
function isServiceRole(req: Request): boolean {
  const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!token) return false;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (serviceKey && token === serviceKey) return true;
  return parseJwtClaims(token)?.role === "service_role";
}

// Returns an absolute URL on this site, or null when the input points elsewhere.
function toSiteUrl(input: unknown): string | null {
  if (typeof input !== "string" || !input.trim()) return null;
  const raw = input.trim();
  try {
    const url = /^https?:\/\//i.test(raw)
      ? new URL(raw)
      : new URL(raw.startsWith("/") ? raw : `/${raw}`, `https://${HOST}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (url.hostname !== HOST) return null;
    return `https://${HOST}${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (!isServiceRole(req)) {
    return json({ error: "Forbidden" }, 403);
  }

  let urls: unknown[] = [];
  try {
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      if (Array.isArray(body?.urls)) urls = body.urls;
    }
    if (!urls.length) {
      const u = new URL(req.url);
      const q = u.searchParams.get("urls");
      if (q) urls = q.split(",");
      if (u.searchParams.get("seed") === "1" || !urls.length) urls = DEFAULT_URLS;
    }
  } catch (_) {
    urls = DEFAULT_URLS;
  }

  if (urls.length > 200) urls = urls.slice(0, 200);

  const urlList = Array.from(
    new Set(urls.map(toSiteUrl).filter((u): u is string => u !== null)),
  );
  if (!urlList.length) {
    return json({ error: "No valid getdetach.app URLs provided" }, 400);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  return json({ status: res.status, ok: res.ok, submitted: urlList.length, urls: urlList, response: text });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
