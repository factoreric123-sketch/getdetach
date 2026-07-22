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

function toAbsolute(input: string): string {
  if (/^https?:\/\//i.test(input)) return input;
  const path = input.startsWith("/") ? input : `/${input}`;
  return `https://${HOST}${path}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let urls: string[] = [];
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

  const urlList = Array.from(new Set(urls.map(toAbsolute))).filter(Boolean);
  if (!urlList.length) {
    return json({ error: "No URLs provided" }, 400);
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
