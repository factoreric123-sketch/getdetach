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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-base tracking-tight">
          <img src={logo} alt="Detach" className="w-6 h-6 rounded-md" />
          Detach
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <Link to="/#features" className="hover:text-foreground transition-colors duration-150">Features</Link>
          <Link to="/#how-it-works" className="hover:text-foreground transition-colors duration-150">How it works</Link>
          <Link to="/shop" className="hover:text-foreground transition-colors duration-150">Shop</Link>
          <a
            href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors duration-150 cursor-pointer"
          >
            Download
          </a>
        </div>

        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
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
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-6 py-4 space-y-1">
              {[
                { label: "Features", to: "/#features" },
                { label: "How it works", to: "/#how-it-works" },
                { label: "Shop", to: "/shop" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <a
                  href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white text-black text-center px-4 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Download
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
