import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import StoreBadges from "@/components/StoreBadges";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 pt-8 pb-6 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src={logo} alt="Detach logo" className="w-7 h-7 rounded-lg" />
              <span className="text-lg font-bold">Detach</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              An app blocker for iPhone and Android that uses a physical card to make quitting your session feel intentional, not accidental.
            </p>
            <StoreBadges compact />
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="/shop" className="hover:text-foreground transition-colors">Shop</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/detach-app" className="hover:text-foreground transition-colors">What is Detach?</Link></li>
              <li><Link to="/detach-faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/detach-app-blocker-facts" className="hover:text-foreground transition-colors">Product facts</Link></li>
              <li><Link to="/compare" className="hover:text-foreground transition-colors">Compare app blockers</Link></li>
              <li><Link to="/detach-vs-brick" className="hover:text-foreground transition-colors">Detach vs Brick</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><a href="https://blog.getdetach.app/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">HubSpot Blogs</a></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/60">
          <span>© {new Date().getFullYear()} Detach. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
