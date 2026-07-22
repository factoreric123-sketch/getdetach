import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Fetch a single Detach blog post's full content by slug.",
  inputSchema: {
    slug: z.string().min(1).describe("The post slug, e.g. 'brick-vs-one-sec'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase
      .from("blog_posts_cms")
      .select(
        "slug,title,excerpt,meta_description,content_html,content_markdown,hero_image_url,published_at,keywords",
      )
      .eq("slug", slug)
      .maybeSingle();
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    if (!data) {
      return {
        content: [{ type: "text", text: `No blog post found for slug: ${slug}` }],
        isError: true,
      };
    }
    const post = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? data.meta_description ?? "",
      content_markdown: data.content_markdown ?? null,
      content_html: data.content_html ?? null,
      hero_image_url: data.hero_image_url ?? null,
      published_at: data.published_at,
      keywords: data.keywords ?? [],
      url: `https://getdetach.app/blog/${data.slug}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(post, null, 2) }],
      structuredContent: { post },
    };
  },
});
