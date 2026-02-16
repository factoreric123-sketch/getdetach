import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Detach</Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Download
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-4">
          <a href="#features" onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-foreground">Features</a>
          <a href="#how-it-works" onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-foreground">How It Works</a>
          <a href="#privacy" onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-foreground">Privacy</a>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-primary text-primary-foreground text-center px-5 py-2 rounded-xl font-semibold"
          >
            Download
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
