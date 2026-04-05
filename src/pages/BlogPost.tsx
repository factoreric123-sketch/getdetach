import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Apple } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.metaDescription);
    }
    return () => {
      document.title = "Detach App Blocker – Block Social Media & Reduce Screen Time";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", "Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Free for iOS 17+. No account required.");
      }
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  // Simple markdown-like rendering for headings, bold, links, lists, and tables
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Table detection
      if (line.includes("|") && i + 1 < lines.length && lines[i + 1]?.match(/^\|[\s-|]+\|$/)) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].includes("|")) {
          tableLines.push(lines[i]);
          i++;
        }
        const headers = tableLines[0].split("|").filter(Boolean).map((h) => h.trim());
        const rows = tableLines.slice(2).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {headers.map((h, hi) => (
                    <th key={hi} className="text-left py-2 px-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/50">
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-2 px-3 text-muted-foreground">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      if (line.startsWith("## ")) {
        elements.push(<h2 key={i} className="text-2xl font-bold mt-10 mb-4">{line.slice(3)}</h2>);
      } else if (line.startsWith("### ")) {
        elements.push(<h3 key={i} className="text-xl font-bold mt-8 mb-3">{line.slice(4)}</h3>);
      } else if (line.match(/^\d+\.\s\*\*/)) {
        const match = line.match(/^\d+\.\s\*\*(.+?)\*\*\s*[—–:,-]\s*(.+)/);
        if (match) {
          elements.push(
            <div key={i} className="flex gap-3 my-2">
              <span className="text-primary font-bold">{line.match(/^\d+/)?.[0]}.</span>
              <p className="text-muted-foreground"><strong className="text-foreground">{match[1]}</strong> — {renderInline(match[2])}</p>
            </div>
          );
        } else {
          elements.push(<p key={i} className="text-muted-foreground my-2">{renderInline(line)}</p>);
        }
      } else if (line.startsWith("- **")) {
        const match = line.match(/^-\s\*\*(.+?)\*\*\s*(.*)/);
        if (match) {
          elements.push(
            <li key={i} className="flex items-start gap-2 my-1 text-muted-foreground ml-4">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-foreground">{match[1]}</strong> {renderInline(match[2])}</span>
            </li>
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="flex items-start gap-2 my-1 text-muted-foreground ml-4">
            <span className="text-accent mt-1">•</span>
            <span>{renderInline(line.slice(2))}</span>
          </li>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(<p key={i} className="text-muted-foreground leading-relaxed my-2">{renderInline(line)}</p>);
      }
      i++;
    }

    return elements;
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\[.+?\]\(.+?\))/g);
    return parts.map((part, i) => {
      const boldMatch = part.match(/^\*\*(.+)\*\*$/);
      if (boldMatch) return <strong key={i} className="text-foreground">{boldMatch[1]}</strong>;
      const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
      if (linkMatch) {
        const isExternal = linkMatch[2].startsWith("http");
        if (isExternal) {
          return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{linkMatch[1]}</a>;
        }
        return <Link key={i} to={linkMatch[2]} className="text-primary hover:underline">{linkMatch[1]}</Link>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <article className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">{post.title}</h1>

          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Try Detach: The App Blocker That Works</h3>
            <p className="text-muted-foreground mb-6">
              Free to download. No account required. Start blocking social media and reducing screen time today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
              >
                <Apple className="w-5 h-5" />
                Download Detach
              </a>
              <Link to="/detach-app" className="text-primary font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
