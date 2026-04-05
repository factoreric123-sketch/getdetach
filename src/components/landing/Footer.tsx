import { Link } from "react-router-dom";
import { Apple } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src={logo} alt="Detach logo" className="w-7 h-7 rounded-lg" />
              <span className="text-lg font-bold">Detach</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              An app blocker for iPhone that uses a physical card to make quitting your session feel intentional — not accidental.
            </p>
            <a
              href="https://apps.apple.com/us/app/detach-screen-break/id6759267252"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-secondary/80 transition-colors"
            >
              <Apple className="w-4 h-4" />
              Download on App Store
            </a>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="/shop" className="hover:text-foreground transition-colors">Shop</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/detach-app" className="hover:text-foreground transition-colors">What is Detach?</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/60">
          <span>© {new Date().getFullYear()} Detach. All rights reserved.</span>
          <span>iOS 17+ · No account required</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
