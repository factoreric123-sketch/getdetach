import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List recent Detach blog posts (title, slug, excerpt, url, published date). Sorted newest first.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Max number of posts to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase
      .from("blog_posts_cms")
      .select("slug,title,excerpt,meta_description,published_at,hero_image_url")
      .order("published_at", { ascending: false })
      .limit(limit ?? 20);
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    const posts = (data ?? []).map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? p.meta_description ?? "",
      hero_image_url: p.hero_image_url ?? null,
      published_at: p.published_at,
      url: `https://getdetach.app/blog/${p.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(posts, null, 2) }],
      structuredContent: { posts },
    };
  },
});
