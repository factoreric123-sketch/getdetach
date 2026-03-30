import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  useEffect(() => {
    document.title = "Detach Blog – App Blocker Tips & Screen Time Advice";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Read the Detach blog for tips on blocking social media, reducing screen time, and staying focused with the Detach app blocker.");
    }
    return () => {
      document.title = "Detach App Blocker – Block Social Media & Reduce Screen Time";
      if (meta) {
        meta.setAttribute("content", "Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Free for iOS 17+. No account required.");
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">
            Detach <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Tips and insights on reducing screen time, blocking social media, and staying focused with the Detach app blocker.
          </p>

          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="glass-card p-6 block hover:border-primary/30 transition-colors group"
              >
                <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm">
                  Read more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
