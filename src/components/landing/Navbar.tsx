import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/20"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-xl font-bold">
          <img src={logo} alt="Detach logo" className="w-8 h-8 rounded-lg" />
          <span>Detach</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <a
            href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200"
          >
            Download
          </a>
        </div>

        <button
          className="md:hidden text-foreground p-1 rounded-lg hover:bg-muted/40 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-6 py-5 space-y-1">
              {[
                { label: "Features", href: "#features", isAnchor: true },
                { label: "How It Works", href: "#how-it-works", isAnchor: true },
                { label: "Privacy", href: "#privacy", isAnchor: true },
                { label: "Blog", href: "/blog", isAnchor: false },
              ].map((link) =>
                link.isAnchor ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-2">
                <a
                  href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-primary text-primary-foreground text-center px-5 py-3 rounded-xl font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Download Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
