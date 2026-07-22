import { defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import getProductInfo from "./tools/get-product-info";
import getSiteLinks from "./tools/get-site-links";

export default defineMcp({
  name: "detach-mcp",
  title: "Detach",
  version: "0.1.0",
  instructions:
    "Public tools for getdetach.app. Use `get_product_info` for pricing, shipping, and iOS requirements; `list_blog_posts` and `get_blog_post` to browse Detach's blog; `get_site_links` for canonical page URLs.",
  tools: [listBlogPosts, getBlogPost, getProductInfo, getSiteLinks],
});
